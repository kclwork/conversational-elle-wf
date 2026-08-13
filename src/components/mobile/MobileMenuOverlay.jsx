import { useEffect } from 'react'
import styles from './MobileMenuOverlay.module.css'

const PRIMARY_ITEMS = ['Personal', 'Business', 'Resources', 'Pricing']

// elleCta: optional { label, onClick } — Elle entry point (Full Page form factor).
export default function MobileMenuOverlay({ onClose, elleCta }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Menu">
      <button
        type="button"
        className={styles.closeBtn}
        aria-label="Close menu"
        onClick={onClose}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
        </svg>
      </button>

      <div className={styles.inner}>
        <ul className={styles.primaryList}>
          {PRIMARY_ITEMS.map((label) => (
            <li key={label} className={styles.primaryItem}>
              <span className={styles.primaryLabel}>{label}</span>
            </li>
          ))}
          {elleCta && (
            <li className={styles.primaryItem}>
              <button
                type="button"
                className={styles.ctaLink}
                onClick={() => { onClose(); elleCta.onClick() }}
              >
                <span className={styles.primaryLabel}>{elleCta.label}</span>
                <span className={styles.aiBadge}>AI</span>
              </button>
            </li>
          )}
        </ul>

        <ul className={styles.utilityList}>
          <li className={styles.utilityItem}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M5 20c1.5-3.5 4-5 7-5s5.5 1.5 7 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Sign In</span>
          </li>
          <li className={styles.utilityItem}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
              <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span>Search</span>
          </li>
          <li className={styles.utilityItem}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 4h2.4l2.2 11.2a1.6 1.6 0 0 0 1.6 1.3h8.6a1.6 1.6 0 0 0 1.6-1.3L21 8H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="10" cy="20" r="1.25" fill="currentColor" />
              <circle cx="17" cy="20" r="1.25" fill="currentColor" />
            </svg>
            <span>Cart</span>
          </li>
          <li className={styles.utilityItem}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 4h3.2l1.6 4.2-2 1.4a12 12 0 0 0 6.6 6.6l1.4-2L20 15.8V19a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span>Call Us</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
