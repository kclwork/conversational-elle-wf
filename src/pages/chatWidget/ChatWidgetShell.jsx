// FORM FACTOR 3 — Chat Widget (Zendesk-style).
// A corner bubble over the homepage opens a contained panel anchored
// bottom-right (mobile: full-screen sheet). States:
//   closed  — launcher bubble only, bottom-right
//   open    — panel with slim Elle header; Elle's greeting is visible on open;
//             the engine's own composer + disclosure live inside the panel
//   minimized — header chevron or the bubble collapses back to the launcher;
//             the engine stays mounted, so the conversation persists and stays
//             revisitable all session (incl. after the conversation has ended)
// Handoff CTA: minimize + scroll the host homepage to #plans in place — same
// pattern as the Floating Message Bar. The engine is untouched and identical
// across all three form factors; only this container differs.

import { useEffect, useMemo, useState } from 'react'
import ResponsiveHomepage from '../ResponsiveHomepage.jsx'
import ConversationEngine from '../../engine/ConversationEngine.jsx'
import { createScriptedBrain } from '../../engine/brains/scriptedBrain.js'
import useIsMobile from '../../hooks/useIsMobile.js'
import styles from './ChatWidgetShell.module.css'

export default function ChatWidgetShell() {
  const brain = useMemo(() => createScriptedBrain(), [])
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  // Mobile sheet: lock the homepage scroll behind it.
  useEffect(() => {
    if (!(open && isMobile)) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [open, isMobile])

  // Esc minimizes.
  useEffect(() => {
    if (!open) return
    const onKey = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  // Handoff CTA: minimize, then scroll the host homepage to the plans section.
  // Smooth first; verify and force an instant scroll if the environment
  // suppressed the smooth one (same pattern as the message bar).
  function handleCta() {
    setOpen(false)
    const scrollToPlans = behavior =>
      document.getElementById('plans')?.scrollIntoView({ behavior, block: 'start' })
    setTimeout(() => scrollToPlans('smooth'), 350)
    setTimeout(() => {
      const el = document.getElementById('plans')
      if (el && Math.abs(el.getBoundingClientRect().top) > 80) scrollToPlans('auto')
    }, 1200)
  }

  return (
    <div>
      <ResponsiveHomepage />

      {/* Panel stays mounted (display toggled in CSS) so conversation persists */}
      <div className={`${styles.panel} ${open ? styles.open : styles.closed}`}>
        <div className={styles.header}>
          <span className={styles.title}>
            Elle
            <span className={styles.aiBadge}>AI</span>
          </span>
          <button
            type="button"
            className={styles.minimize}
            aria-label="Minimize conversation"
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className={styles.engineWrap}>
          <ConversationEngine brain={brain} onCta={handleCta} />
        </div>
      </div>

      <button
        type="button"
        className={styles.bubble}
        aria-label={open ? 'Minimize conversation' : 'Chat with Elle'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            <path d="M5 8l6 6 6-6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M4 6.5A2.5 2.5 0 0 1 6.5 4h11A2.5 2.5 0 0 1 20 6.5v7a2.5 2.5 0 0 1-2.5 2.5H9l-4.2 3.5A.5.5 0 0 1 4 19.1V6.5z"
              fill="currentColor"
            />
          </svg>
        )}
      </button>
    </div>
  )
}
