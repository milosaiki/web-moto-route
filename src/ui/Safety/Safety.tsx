import React from 'react';
import styles from './Safety.module.css';

export const SafetyUI: React.FC = () => (
  <>
  <section id="safety" className={styles.safetySection}>
    <div className="container">
      <div className={styles.header}>
        <h2 className={`font-display ${styles.title}`}>SAFETY <span className={styles.titleHighlight}>FIRST</span></h2>
        <p className={styles.subtitle}>
          Advanced safety features designed to protect you when it matters most.
        </p>
      </div>
      
      <div className={styles.grid}>
        <div className={`${styles.card} ${styles.cardWeather}`}>
          <div className={`${styles.iconWrapper} ${styles.iconWeather}`}>
            <svg style={{width:'40px',height:'40px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <h3 className={`font-display ${styles.cardTitle}`}>Severe Weather Alerts</h3>
          <p className={styles.cardDesc}>Automatic warnings when storms, high winds, or ice intersect your route.</p>
          <div className={styles.alertBox}>
            <div className={styles.alertHeader}>
                <svg style={{width:'16px',height:'16px'}} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                ALERT EXAMPLE
            </div>
            <div className={styles.alertMessage}>Heavy rain expected in 12 miles. Alternative route available.</div>
          </div>
        </div>
        
        <div className={`${styles.card} ${styles.cardContact}`}>
          <div className={`${styles.iconWrapper} ${styles.iconContact}`}>
            <svg style={{width:'40px',height:'40px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
            </svg>
          </div>
          <h3 className={`font-display ${styles.cardTitle}`}>Emergency Contact</h3>
          <p className={styles.cardDesc}>One-tap emergency calling with automatic GPS coordinate sharing.</p>
          <button className={styles.btnAction}>
              <svg style={{width:'16px',height:'16px'}} fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg>
              Configure SOS
          </button>
        </div>
        
        <div className={`${styles.card} ${styles.cardCrash}`}>
          <div className={`${styles.iconWrapper} ${styles.iconCrash}`}>
            <svg style={{width:'40px',height:'40px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
          </div>
          <h3 className={`font-display ${styles.cardTitle}`}>Crash Detection</h3>
          <p className={styles.cardDesc}>AI monitors accelerometer data to detect accidents and alert emergency services.</p>
          <div className={styles.statusIndicator}>
              <span className={styles.statusDot}></span>
              Monitoring Active
          </div>
        </div>
      </div>
    </div>
  </section>

  <section className={styles.ctaSection}>
      <div className={styles.ctaGradient}></div>
      <div className={styles.ctaWave}>
          <svg style={{width:'100%', height:'100%'}} viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="#ff6b35" strokeWidth="0.5"/>
              <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="#ff6b35" strokeWidth="0.5"/>
              <path d="M0,40 Q25,20 50,40 T100,40" fill="none" stroke="#ff6b35" strokeWidth="0.5"/>
          </svg>
      </div>
      
      <div className="container relative">
          <h2 className={`font-display ${styles.ctaTitle}`}>READY TO <span className={styles.titleHighlight} style={{color:'#f97316'}}>RIDE?</span></h2>
          <p className={styles.ctaSubtitle}>
              Join 50,000+ riders who trust MotoRoute AI for their adventures. 
              Download now and get 30 days of premium free.
          </p>
          <div style={{display:'flex',justifyContent:'center',gap:'1rem',alignItems:'center'}}>
              <button className={styles.btnWhite}>DOWNLOAD IOs</button>
              <button className={styles.btnWhite}>DOWNLOAD ANDROID</button>
          </div>
      </div>
  </section>
  </>
);
