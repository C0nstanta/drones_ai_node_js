// /src/components/organisms/InteractiveMap.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import styles from './InteractiveMap.module.css';
import { FiMaximize2, FiMinimize2, FiNavigation } from 'react-icons/fi';

// Initialize Mapbox
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '';

const OFFICE_LOCATION = {
  lng: -111.8910,
  lat: 40.7608,
  address: '123 Innovation Drive, Salt Lake City, UT 84101',
  name: 'AI Drone Solutions HQ',
};

const InteractiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [OFFICE_LOCATION.lng, OFFICE_LOCATION.lat],
      zoom: 15,
      pitch: 45,
      bearing: -17.6,
    });

    map.current.on('load', () => {
      setMapLoaded(true);

      // Add 3D buildings
      const layers = map.current?.getStyle().layers;
      const labelLayerId = layers?.find(
        (layer) => layer.type === 'symbol' && layer.layout?.['text-field']
      )?.id;

      map.current?.addLayer(
        {
          id: 'add-3d-buildings',
          source: 'composite',
          'source-layer': 'building',
          filter: ['==', 'extrude', 'true'],
          type: 'fill-extrusion',
          minzoom: 15,
          paint: {
            'fill-extrusion-color': '#00ff88',
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height'],
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height'],
            ],
            'fill-extrusion-opacity': 0.6,
          },
        },
        labelLayerId
      );

      // Add custom marker
      const el = document.createElement('div');
      el.className = styles.marker;
      el.innerHTML = `
        <div class="${styles.markerPulse}"></div>
        <div class="${styles.markerIcon}">📍</div>
      `;

      new mapboxgl.Marker(el)
        .setLngLat([OFFICE_LOCATION.lng, OFFICE_LOCATION.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="${styles.popup}">
                <h3>${OFFICE_LOCATION.name}</h3>
                <p>${OFFICE_LOCATION.address}</p>
              </div>
            `)
        )
        .addTo(map.current);

      // Add drone flight path animation
      map.current?.addSource('drone-route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [OFFICE_LOCATION.lng - 0.01, OFFICE_LOCATION.lat - 0.01],
              [OFFICE_LOCATION.lng - 0.005, OFFICE_LOCATION.lat + 0.005],
              [OFFICE_LOCATION.lng + 0.005, OFFICE_LOCATION.lat + 0.01],
              [OFFICE_LOCATION.lng + 0.01, OFFICE_LOCATION.lat - 0.005],
              [OFFICE_LOCATION.lng, OFFICE_LOCATION.lat],
            ],
          },
        },
      });

      map.current?.addLayer({
        id: 'drone-route',
        type: 'line',
        source: 'drone-route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#00ff88',
          'line-width': 3,
          'line-opacity': 0.8,
          'line-dasharray': [0, 4, 3],
        },
      });

      // Animate the drone path
      const dashArraySequence = [
        [0, 4, 3],
        [0.5, 4, 2.5],
        [1, 4, 2],
        [1.5, 4, 1.5],
        [2, 4, 1],
        [2.5, 4, 0.5],
        [3, 4, 0],
        [0, 0.5, 3, 3.5],
        [0, 1, 3, 3],
        [0, 1.5, 3, 2.5],
        [0, 2, 3, 2],
        [0, 2.5, 3, 1.5],
        [0, 3, 3, 1],
        [0, 3.5, 3, 0.5],
      ];

      let step = 0;
      const animateDashArray = () => {
        const newStep = (step + 1) % dashArraySequence.length;
        map.current?.setPaintProperty(
          'drone-route',
          'line-dasharray',
          dashArraySequence[step]
        );
        step = newStep;
      };

      setInterval(animateDashArray, 200);
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Clean up on unmount
    return () => map.current?.remove();
  }, []);

  const handleFullscreen = () => {
    if (!mapContainer.current) return;

    if (!isFullscreen) {
      mapContainer.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const flyToOffice = () => {
    map.current?.flyTo({
      center: [OFFICE_LOCATION.lng, OFFICE_LOCATION.lat],
      zoom: 17,
      pitch: 60,
      bearing: -17.6,
      duration: 2000,
    });
  };

  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapHeader}>
        <h3 className={styles.mapTitle}>Find Us</h3>
        <p className={styles.mapSubtitle}>Visit our Salt Lake City headquarters</p>
      </div>

      <div ref={mapContainer} className={styles.map}>
        {!mapLoaded && (
          <div className={styles.mapLoader}>
            <div className={styles.loaderSpinner} />
            <p>Loading map...</p>
          </div>
        )}
      </div>

      <div className={styles.mapControls}>
        <button
          onClick={flyToOffice}
          className={styles.controlButton}
          title="Center on office"
        >
          <FiNavigation />
        </button>
        <button
          onClick={handleFullscreen}
          className={styles.controlButton}
          title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
        >
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>

      <div className={styles.mapInfo}>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>📍</span>
          <span>{OFFICE_LOCATION.address}</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>🚗</span>
          <span>Free parking available</span>
        </div>
        <div className={styles.infoItem}>
          <span className={styles.infoIcon}>🚊</span>
          <span>5 min walk from TRAX station</span>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
