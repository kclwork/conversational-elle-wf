import { useState } from 'react'
import { Link } from 'react-router-dom'
import MobileMenuOverlay from './MobileMenuOverlay.jsx'
import styles from './MobileNav.module.css'

export default function MobileNav({ elleCta }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo} aria-label="LegalShield home">
          <img src="/images/logo.svg" alt="LegalShield" />
        </Link>

        <button
          type="button"
          className={styles.menuBtn}
          aria-label="Open menu"
          onClick={() => setMenuOpen(true)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {menuOpen && <MobileMenuOverlay onClose={() => setMenuOpen(false)} elleCta={elleCta} />}
    </>
  )
}
