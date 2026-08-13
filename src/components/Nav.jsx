import { Link } from 'react-router-dom'
import styles from './Nav.module.css'

const NAV_LINKS = ['Personal', 'Business', 'Resources', 'Pricing']

// elleCta: optional { label, onClick } — the Elle entry point for form factors
// that enter via a homepage CTA (Full Page). Absent = homepage stays inert.
export default function Nav({ elleCta }) {
  return (
    <nav className={styles.nav}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <img src="/images/logo.svg" alt="LegalShield" />
        </Link>

        <ul className={styles.links}>
          {NAV_LINKS.map(label => (
            <li key={label}>
              <span className={styles.link}>{label}</span>
            </li>
          ))}
          {elleCta && (
            <li>
              <span
                className={`${styles.link} ${styles.linkCta}`}
                onClick={elleCta.onClick}
              >
                {elleCta.label}
                <span className={styles.aiBadge}>AI</span>
              </span>
            </li>
          )}
        </ul>

        <div className={styles.actions}>
          <button className={styles.iconBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="8.5" cy="8.5" r="5.5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 13L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className={styles.iconBtn} aria-label="Cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M2 2H4L6 13H16L18 6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="8" cy="16.5" r="1" fill="currentColor"/>
              <circle cx="14" cy="16.5" r="1" fill="currentColor"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
