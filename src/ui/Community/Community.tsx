import React from 'react';
import styles from './Community.module.css';

type CommunityUIProps = {
  riders: { id: string; name: string; avatarBg: string; status: string; metaType: string; metaValue: string }[];
};

export const CommunityUI: React.FC<CommunityUIProps> = ({ riders }) => (
  <section id="community" className={styles.communitySection}>
    <div className={styles.gradientBg}></div>
    
    <div className={`container ${styles.grid}`}>
      <div>
        <h2 className={`font-display ${styles.title}`}>RIDE TOGETHER,<br/><span className={styles.titleHighlight}>EVEN WHEN APART</span></h2>
        <p className={styles.description}>
          Group rides have never been easier. Share your route with a unique link, 
          track live locations, and see everyone's ETA in real-time.
        </p>
        
        <div className={styles.featureList}>
          <div className={styles.featureItem}>
            <div className={`${styles.iconWrapper} ${styles.iconOrange}`}>
               <svg style={{width:'24px',height:'24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
              </svg>
            </div>
            <div>
              <h4 className={styles.featureTitle}>Unique Share Links</h4>
              <p className={styles.featureDesc}>Generate instant URLs to share your exact route configuration with anyone.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={`${styles.iconWrapper} ${styles.iconBlue}`}>
              <svg style={{width:'24px',height:'24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </div>
            <div>
              <h4 className={styles.featureTitle}>Live GPS Tracking</h4>
              <p className={styles.featureDesc}>See your group's exact position and speed on the map in real-time.</p>
            </div>
          </div>
          
          <div className={styles.featureItem}>
            <div className={`${styles.iconWrapper} ${styles.iconGreen}`}>
              <svg style={{width:'24px',height:'24px'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
            <div>
              <h4 className={styles.featureTitle}>Smart ETAs</h4>
              <p className={styles.featureDesc}>AI calculates arrival times based on riding style and current traffic.</p>
            </div>
          </div>
        </div>
        
        <button className={styles.btnPrimary}>CREATE GROUP RIDE</button>
      </div>
      
      <div className={styles.mockupContainer}>
        <div className={styles.mockupGlow}></div>
        <div className={styles.phoneMockup}>
          <div className={styles.notch}></div>
          <div className={styles.appView}>
            
            <div className={styles.appHeader}>
              <div className={styles.appTitleGroup}>
                <div className={styles.appTitleIcon}>
                   <svg style={{width:'16px',height:'16px',color:'white'}} fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"/></svg>
                </div>
                <span className={styles.appTitle}>Group Ride</span>
              </div>
              <div className={styles.liveIndicator}>
                <span className={styles.liveDot}></span>
                <span className={styles.liveText}>LIVE</span>
              </div>
            </div>
            
            <div className={styles.mapPreview}>
               <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:0.3}}>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#grid)"/>
              </svg>
              <div style={{position:'absolute', top:'25%', left:'25%', transform:'translate(-50%, -50%)'}}>
                  <div style={{width:'32px', height:'32px', backgroundColor:'#f97316', borderRadius:'50%', border:'2px solid white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', fontWeight:'bold', animation:'pulse 2s infinite'}}>You</div>
              </div>
              <svg style={{position:'absolute',inset:0,width:'100%',height:'100%',pointerEvents:'none'}}>
                  <path d="M 60,60 Q 150,100 200,150 T 280,200" fill="none" stroke="#ff6b35" strokeWidth="3" strokeDasharray="5,5" opacity="0.8"/>
              </svg>
            </div>
            
            <div className={styles.ridersList}>
              {riders.map((r, i) => (
                <div key={i} className={`${styles.riderCard} ${i===0 ? styles.riderCardActive : ''}`}>
                  <div className={styles.riderInfo}>
                    <div className={`${styles.riderAvatar} ${styles['avatar' + r.avatarBg]}`}>{r.id}</div>
                    <div>
                      <div className={styles.riderName}>{r.name}</div>
                      <div className={styles.riderStatus}>{r.status}</div>
                    </div>
                  </div>
                  <div className={styles.riderMeta}>
                    <div className={r.metaType === 'leader' ? styles.leaderBadge : styles.eta}>{r.metaValue}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.actionButtons}>
               <button className={`${styles.actionBtn} ${styles.voiceBtn}`}>Voice</button>
               <button className={`${styles.actionBtn} ${styles.sosBtn}`}>SOS</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
);
