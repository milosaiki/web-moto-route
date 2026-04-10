import React from 'react';
import styles from './Hero.module.css';

type HeroUIProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
};

export const HeroUI: React.FC<HeroUIProps> = ({ canvasRef }) => (
  <section className={styles.heroSection}>
    <canvas ref={canvasRef as any} className={styles.heroCanvas}></canvas>
    
    <div className={styles.heroGradient}></div>
    
    <div className={`container ${styles.heroContent}`}>
      <div className={styles.heroTextCenter}>
        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          <span className={styles.badgeText}>AI-POWERED NAVIGATION</span>
        </div>
        
        <h1 className={`font-display ${styles.heroTitle}`}>
          <span className={styles.glitch} data-text="RIDE BEYOND">RIDE BEYOND</span>
          <span className={styles.gradientText}>LIMITS</span>
        </h1>
        
        <p className={styles.heroSubtitle}>
          The first navigation system built exclusively for motorcyclists. 
          AI-driven routes, real-time weather intelligence, and seamless group tracking.
        </p>
        
        <div className={styles.buttonGroup}>
          <button className={`btn-primary ${styles.btnPrimaryLarge}`}>
            <svg style={{width: '20px', height: '20px'}} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
            </svg>
            START RIDING FREE
          </button>
          <button className={styles.btnOutline} onClick={() => {
            document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' });
          }}>
            <svg style={{width: '20px', height: '20px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            WATCH DEMO
          </button>
        </div>
        
        <div className={styles.statsGrid}>
          <div className={styles.statItem}>
            <div className={`font-display ${styles.statNumber}`}>500</div>
            <div className={styles.statLabel}>K ROUTES PLANNED</div>
          </div>
          <div className={styles.statItem}>
            <div className={`font-display ${styles.statNumber}`}>98</div>
            <div className={styles.statLabel}>% ACCURACY</div>
          </div>
          <div className={styles.statItem}>
            <div className={`font-display ${styles.statNumber}`}>50</div>
            <div className={styles.statLabel}>K RIDERS</div>
          </div>
          <div className={styles.statItem}>
            <div className={`font-display ${styles.statNumber}`}>24</div>
            <div className={styles.statLabel}>/7 SUPPORT</div>
          </div>
        </div>
      </div>
    </div>
    
    <div className={styles.scrollIndicator}>
      <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
    </div>
  </section>
);
