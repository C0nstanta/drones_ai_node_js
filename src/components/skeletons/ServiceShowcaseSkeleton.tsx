// File: /src/components/skeletons/ServiceShowcaseSkeleton.tsx
import React from 'react';
import styles from './ServiceShowcaseSkeleton.module.css';

export default function ServiceShowcaseSkeleton() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.titleSkeleton} />
          <div className={styles.subtitleSkeleton} />
        </div>
        
        <div className={styles.grid}>
          {[1, 2, 3].map((i) => (
            <div key={i} className={styles.card}>
              <div className={styles.iconSkeleton} />
              <div className={styles.titleCardSkeleton} />
              <div className={styles.descriptionSkeleton} />
              
              <div className={styles.metrics}>
                {[1, 2, 3].map((j) => (
                  <div key={j} className={styles.metric}>
                    <div className={styles.metricValueSkeleton} />
                    <div className={styles.metricLabelSkeleton} />
                  </div>
                ))}
              </div>
              
              <div className={styles.features}>
                {[1, 2, 3, 4].map((k) => (
                  <div key={k} className={styles.featureSkeleton} />
                ))}
              </div>
              
              <div className={styles.ctaSkeleton} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
