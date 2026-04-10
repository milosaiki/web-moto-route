import React from 'react';
import styles from './Features.module.css';

const features = [
  {
    title: 'AI Route Intelligence',
    description: 'Machine learning algorithms analyze road quality, elevation changes, and rider preferences to generate the perfect path.',
    iconColor: '#f97316',
    iconBg: 'rgba(249, 115, 22, 0.2)'
  },
  {
    title: 'Weather Intelligence',
    description: 'Real-time weather overlays and predictive alerts keep you safe from sudden storms and hazardous conditions.',
    iconColor: '#60a5fa',
    iconBg: 'rgba(59, 130, 246, 0.2)'
  },
  {
    title: 'Live Group Tracking',
    description: 'Ride together seamlessly. Share routes instantly and track your group\'s location and ETAs in real-time.',
    iconColor: '#34d399',
    iconBg: 'rgba(16, 185, 129, 0.2)'
  },
  {
    title: 'Offline Maps',
    description: 'Download detailed map tiles for remote areas. Never lose your way when you lose cell service.',
    iconColor: '#a78bfa',
    iconBg: 'rgba(139, 92, 246, 0.2)'
  },
  {
    title: 'Universal Export',
    description: 'Export routes to GPX format compatible with Garmin, TomTom, and all major GPS devices.',
    iconColor: '#fbbf24',
    iconBg: 'rgba(245, 158, 11, 0.2)'
  },
  {
    title: 'Emergency Response',
    description: 'One-tap emergency contact and automatic incident detection with GPS coordinates.',
    iconColor: '#f87171',
    iconBg: 'rgba(239, 68, 68, 0.2)'
  }
];

export const FeaturesUI: React.FC = () => (
  <section id="features" className={styles.featuresSection}>
    <div className={styles.gradientBg}></div>
    
    <div className={`container ${styles.header}`}>
      <h2 className={`font-display ${styles.title}`}>ENGINEERED FOR <span className={styles.titleHighlight}>RIDERS</span></h2>
      <div className={styles.titleUnderline}></div>
    </div>
    
    <div className={`container ${styles.grid}`}>
      {features.map((feature, i) => (
        <div key={i} className={styles.featureCard}>
          <div className={styles.iconWrapper} style={{ backgroundColor: feature.iconBg }}>
            <div style={{ width: '28px', height: '28px', backgroundColor: feature.iconColor, borderRadius: '50%' }}></div>
          </div>
          <h3 className={`font-display ${styles.featureTitle}`}>{feature.title}</h3>
          <p className={styles.featureDesc}>{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);
