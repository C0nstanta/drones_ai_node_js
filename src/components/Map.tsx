/* File: src/components/Map.tsx
   Purpose: Render Google Map for the office location using an env-driven address,
            with safe geocode + fallback to Houston coords and address.
   Requires: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, NEXT_PUBLIC_OFFICE_ADDRESS
*/

'use client';

import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const DEFAULT_ADDRESS = '430 Highway 6 South, Suite 206, Houston, TX 77079';
const DEFAULT_COORDS = { lat: 29.782116975600278, lng: -95.64553397632886 }; // Houston

function getOfficeAddress(): string {
  const a = (process.env.NEXT_PUBLIC_OFFICE_ADDRESS || '').trim();
  return a.length > 0 ? a : DEFAULT_ADDRESS;
}

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // If Google Maps already loaded, init immediately
    if (typeof window !== 'undefined' && window.google?.maps) {
      initializeMap();
      return;
    }

    // Load Google Maps script
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY';
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`;
    script.async = true;
    script.defer = true;

    window.initMap = initializeMap;

    // Handle load failures
    script.onerror = handleMapError;

    document.head.appendChild(script);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      try {
        delete window.initMap;
      } catch {
        window.initMap = () => {};
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || mapInstanceRef.current || !window.google?.maps) return;

    const address = getOfficeAddress();

    // Dark theme map styles (kept from your original)
    const mapStyles = [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
      { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
      { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
      { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
      { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
      { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
      { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
      { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
      { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
      { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
      { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
      { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
      { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
      { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
      { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] }
    ];

    const makeMap = (coords: { lat: number; lng: number }) => {
      // Create map
      mapInstanceRef.current = new window.google.maps.Map(mapRef.current!, {
        zoom: 15,
        center: coords,
        styles: mapStyles,
        disableDefaultUI: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true
      });

      // Marker
      const marker = new window.google.maps.Marker({
        position: coords,
        map: mapInstanceRef.current,
        title: 'Deep Sky Solutions Headquarters',
        animation: window.google.maps.Animation.DROP,
        icon: {
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 12,
          fillColor: '#10b981',
          fillOpacity: 1,
          strokeColor: '#ffffff',
          strokeWeight: 2
        }
      });

      // Info window (uses the env-driven address)
      const q = encodeURIComponent(address);
      const infoHtml = `
        <div style="color: #000; padding: 10px;">
          <h3 style="margin: 0 0 5px 0; font-weight: bold;">Deep Sky Solutions</h3>
          <p style="margin: 0 0 5px 0;">${address}</p>
          <p style="margin: 0 0 5px 0;">Phone: <a href="tel:+18015553766">+1 (801) 555-DRONE</a></p>
          <a href="https://maps.google.com/?q=${q}" target="_blank" style="color: #10b981;">
            Get Directions
          </a>
        </div>
      `;
      const infoWindow = new window.google.maps.InfoWindow({ content: infoHtml });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });

      // Pulsing circle overlay
      const circle = new window.google.maps.Circle({
        strokeColor: '#10b981',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#10b981',
        fillOpacity: 0.1,
        map: mapInstanceRef.current,
        center: coords,
        radius: 200
      });

      // Animate the circle
      let direction = 1;
      let radius = 200;
      setInterval(() => {
        radius += direction * 2;
        if (radius > 250 || radius < 150) direction *= -1;
        circle.setRadius(radius);
      }, 50);
    };

    // If we have an address, geocode to get coords; otherwise use default Houston coords
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results: any, status: string) => {
      if (status === 'OK' && results?.[0]?.geometry?.location) {
        const loc = results[0].geometry.location;
        makeMap({ lat: loc.lat(), lng: loc.lng() });
      } else {
        console.warn('Geocoding failed or no results; using default coords. Status:', status);
        makeMap(DEFAULT_COORDS);
      }
    });
  };

  const handleMapError = () => {
    const address = getOfficeAddress();
    const q = encodeURIComponent(address);
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <div style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #1a1a1a; color: #888; padding: 16px; text-align: center;">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <p style="margin-top: 16px; font-size: 18px;">Deep Sky Solutions</p>
          <p style="margin-top: 8px; font-size: 14px;">${address}</p>
          <a href="https://maps.google.com/?q=${q}"
             target="_blank"
             rel="noopener noreferrer"
             style="margin-top: 16px; padding: 8px 16px; background: #10b981; color: white; text-decoration: none; border-radius: 4px;">
            View on Google Maps
          </a>
        </div>
      `;
    }
  };

  return (
    <div
      ref={mapRef}
      className="w-full h-full min-h-[400px]"
      style={{ background: '#1a1a1a' }}
    >
      {/* Loading state */}
      <div className="h-full flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Loading map...</p>
        </div>
      </div>
    </div>
  );
}
