import React from 'react';
import styles from './RoutePlanner.module.css';

type RoutePlannerUIProps = {
  startPoint: string;
  destination: string;
  routeType: string;
  isCalculating: boolean;
  onCalculate: () => void;
};

export const RoutePlannerUI: React.FC<RoutePlannerUIProps> = ({ 
  startPoint, 
  destination, 
  routeType, 
  isCalculating,
  onCalculate 
}) => (
  <section id="planner" className={styles.plannerSection}>
    <div className="container">
      <div className={styles.header}>
        <h2 className={`font-display ${styles.title}`}>INTELLIGENT <span className={styles.titleHighlight}>PLANNING</span></h2>
        <p className={styles.subtitle}>Experience the future of motorcycle navigation with our AI-powered route engine.</p>
      </div>
      
      <div className={styles.card}>
        <div className={styles.controlsPanel}>
          <h3 className={`font-display ${styles.panelTitle}`}>
            <svg style={{width: '20px', height: '20px', color: '#f97316'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
            </svg>
            Route Preferences
          </h3>
          
          <div className={styles.formGroup}>
            <div style={{marginBottom: '1rem'}}>
              <label className={styles.label}>Start Point</label>
              <input type="text" value={startPoint} readOnly className={styles.input} />
            </div>
            <div>
              <label className={styles.label}>Destination</label>
              <input type="text" value={destination} readOnly className={styles.input} />
            </div>
          </div>
          
          <div className={styles.routeBtnGroup}>
            <label className={styles.label}>Route Type</label>
            <button className={`${styles.routeBtn} ${routeType === 'Scenic & Curvy' ? styles.routeBtnActive : ''}`}>Scenic & Curvy</button>
            <button className={`${styles.routeBtn} ${routeType === 'Fastest' ? styles.routeBtnActive : ''}`}>Fastest Route</button>
            <button className={`${styles.routeBtn} ${routeType === 'Avoid Highways' ? styles.routeBtnActive : ''}`}>Avoid Highways</button>
          </div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Stops & Amenities</label>
            <div className={styles.stopTags}>
              <span className={`${styles.tag} ${styles.tagActive}`}>Gas Stations</span>
              <span className={`${styles.tag} ${styles.tagInactive}`}>Viewpoints</span>
              <span className={`${styles.tag} ${styles.tagInactive}`}>Food</span>
            </div>
          </div>
          
          <button style={{marginTop: '2rem', width: '100%', padding: '1rem', borderRadius: '0.75rem'}} className="btn-primary" onClick={onCalculate}>
            {isCalculating ? 'CALCULATING...' : 'CALCULATE ROUTE'}
          </button>
        </div>
        
        <div className={styles.mapArea}>
          <div className={styles.scannerLine}></div>
          <svg className="absolute inset-0 w-full h-full" style={{position: 'absolute', width: '100%', height: '100%'}} viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" style={{stopColor: '#ff6b35', stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: '#ff8c42', stopOpacity: 1}} />
                  </linearGradient>
              </defs>
              <path d="M0,300 Q200,250 400,350 T800,300" fill="none" stroke="#1a1a2e" strokeWidth="100" opacity="0.5"/>
              <path d="M 100,500 C 200,400 150,300 300,250 S 500,200 600,150 S 700,100 700,100" 
                    fill="none" stroke="url(#routeGradient)" strokeWidth="4" strokeLinecap="round" opacity="1"/>
          </svg>
          
          <div className={styles.routeOverlay}>
            <div style={{color: 'white'}}>
              <div className={styles.label}>Total Distance</div>
              <div className="font-display" style={{fontSize: '1.5rem', fontWeight: 700}}>186 <span style={{fontSize: '0.875rem', color: '#9ca3af'}}>miles</span></div>
            </div>
            <div style={{color: 'white'}}>
              <div className={styles.label}>Est. Time</div>
              <div className="font-display" style={{fontSize: '1.5rem', fontWeight: 700}}>3h 42<span style={{fontSize: '0.875rem', color: '#9ca3af'}}>m</span></div>
            </div>
            <button style={{padding: '0.5rem 1.5rem', backgroundColor: '#f97316', color: 'white', borderRadius: '0.5rem', fontWeight: 'bold', border: 'none', cursor: 'pointer'}}>GO</button>
          </div>
        </div>
      </div>
    </div>
  </section>
);
