// Full Page handoff: the plans drawer.
// The handoff CTA opens this slide-over ON TOP of the conversation page —
// desktop: right-side drawer; mobile: full-screen sheet. The chat stays
// mounted behind it, so the recap + attorney questions remain one tap away.
// Pricing content mirrors the homepage plans section (same placeholder copy).

import { useEffect } from 'react'
import styles from './PlansDrawer.module.css'

const PLANS = [
  {
    name: 'Personal & Family',
    desc: 'Legal services on unlimited number of personal legal issues. Legal services provided by attorneys with an average of 22 years of experience.',
    price: '$35',
    per: '+/mo',
    cta: 'Shop Plans',
    primary: true,
  },
  {
    name: 'Small Business',
    desc: 'Legal services on business bases, including document review, help collecting debts, on our behalf, and more.',
    price: '$53.95',
    per: '+/mo',
    cta: 'Shop Plans',
    primary: true,
  },
  // Enterprise card removed per Kaitlyn (homepage pricing section still has it).
]

export default function PlansDrawer({ open, onClose }) {
  // Esc closes; page behind stays put but doesn't scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className={styles.scrim} onClick={onClose}>
      <aside
        className={styles.drawer}
        role="dialog"
        aria-modal="true"
        aria-label="LegalShield plans"
        onClick={e => e.stopPropagation()}
      >
        <div className={styles.head}>
          <h2 className={styles.title}>
            Affordable plans for <em>every</em> need.
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label="Close plans and return to conversation"
            onClick={onClose}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className={styles.cards}>
          {PLANS.map(plan => (
            <div key={plan.name} className={styles.card}>
              <span className={styles.planName}>{plan.name}</span>
              <p className={styles.planDesc}>{plan.desc}</p>
              {plan.price
                ? <div className={styles.planPrice}>{plan.price}<span className={styles.planPer}>{plan.per}</span></div>
                : <div className={styles.planContact}>{plan.contact}</div>}
              <button
                type="button"
                className={plan.primary ? styles.planCta : styles.planCtaSecondary}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        <button type="button" className={styles.backToChat} onClick={onClose}>
          ← Back to your conversation
        </button>
      </aside>
    </div>
  )
}
