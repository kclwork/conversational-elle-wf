import styles from './MobileFooter.module.css'

const COLUMNS = [
  { heading: 'Company', links: ['About Us', 'Blog', 'Careers', 'News & Press', 'Partners', 'Meet IDI'] },
  { heading: 'Solutions', links: ['Collections', 'Business Services', 'Commerce & Agreements', 'Employment', 'Intellectual Property', 'Add-on Coverage'] },
  { heading: 'Legal Help', links: ['Estate Planning', 'Family Law', 'Real Estate', 'Reviews', 'Traffic & Accidents', 'Add-on Coverage'] },
  { heading: 'Support', links: ['Help Center', 'Contact Us', 'Find a Lawyer', 'Family Law', 'Traffic & Accidents', 'Become an Associate'] },
]

export default function MobileFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>
        <span className={styles.logoText}>LegalShield</span>
        <p className={styles.tagline}>Sign up for our newsletter for tips, advice, and updates.</p>
        <div className={styles.emailRow}>
          <input type="email" placeholder="Email address" className={styles.emailInput} />
          <button type="button" className={styles.emailBtn} aria-label="Subscribe">→</button>
        </div>
      </div>

      <div className={styles.columns}>
        {COLUMNS.map(col => (
          <div key={col.heading} className={styles.col}>
            <span className={styles.colHeading}>{col.heading}</span>
            <ul className={styles.colLinks}>
              {col.links.map(link => (
                <li key={link}><span className={styles.colLink}>{link}</span></li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottom}>
        <span className={styles.country}>
          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{display:'inline',verticalAlign:'middle',marginRight:6}}>
            <rect width="16" height="12" fill="#B22234"/>
            <rect y="1" width="16" height="1.5" fill="white"/>
            <rect y="3" width="16" height="1.5" fill="white"/>
            <rect y="5" width="16" height="1.5" fill="white"/>
            <rect y="7" width="16" height="1.5" fill="white"/>
            <rect y="9" width="16" height="1.5" fill="white"/>
            <rect width="7" height="6.5" fill="#3C3B6E"/>
          </svg>
          United States (EN) ↓
        </span>
        <div className={styles.appLabels}>
          <span>App Store</span>
          <span>Google Play</span>
        </div>
      </div>

      <div className={styles.legal}>
        <div className={styles.legalLinks}>
          <span>Home</span><span>Plans</span><span>Tax</span><span>Business</span>
          <span>Español</span><span>Privacy Policy</span><span>Terms of Service</span>
          <span>Employee Benefits</span><span>Become an Associate</span>
        </div>
        <p className={styles.copyright}>© 2025 LegalShield. All rights reserved.</p>
      </div>
    </footer>
  )
}
