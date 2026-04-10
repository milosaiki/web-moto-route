import React from 'react';
import styles from './Navigation.module.css';

type NavigationUIProps = {
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
};

export const NavigationUI: React.FC<NavigationUIProps> = ({ isMobileMenuOpen, toggleMobileMenu }) => (
  <nav className={styles.nav} id="navbar">
    <div className={styles.navBackground}></div>
    <div className={`container ${styles.inner}`}>
      <div className={styles.logoGroup}>
        <div className={styles.logoIcon}>
          <svg className="w-6 h-6 text-white" style={{width: '24px', height: '24px', color: 'white'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
        </div>
        <span className={`font-display ${styles.logoText}`}>
          MOTO<span className={styles.logoHighlight}>ROUTE</span> AI
        </span>
      </div>
      
      <div className={styles.desktopMenu}>
        <a href="#features" className={styles.navLink}>FEATURES</a>
        <a href="#planner" className={styles.navLink}>ROUTE PLANNER</a>
        <a href="#community" className={styles.navLink}>COMMUNITY</a>
        <a href="#safety" className={styles.navLink}>SAFETY</a>
        <button className={styles.downloadBtn}>DOWNLOAD APP</button>
      </div>
      
      <button className={styles.mobileBtn} onClick={toggleMobileMenu}>
        <svg style={{width: '24px', height: '24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      </button>
    </div>

    {isMobileMenuOpen && (
      <div className={styles.mobileMenu}>
        <div className={`container ${styles.mobileInner}`}>
          <a href="#features" className={styles.mobileLink}>Features</a>
          <a href="#planner" className={styles.mobileLink}>Route Planner</a>
          <a href="#community" className={styles.mobileLink}>Community</a>
          <a href="#safety" className={styles.mobileLink}>Safety</a>
          <button className={`${styles.downloadBtn} ${styles.mobileDownloadBtn}`}>Download App</button>
        </div>
      </div>
    )}
  </nav>
);
