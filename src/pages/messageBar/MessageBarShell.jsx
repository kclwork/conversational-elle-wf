// FORM FACTOR 2 — Floating Message Bar (Fin-style).
// The bar IS the entry point and the composer throughout. States:
//   default   — slim pill bar floating bottom-center over the homepage
//   focus     — clicking into the bar expands the panel with Elle's greeting
//               (per Kaitlyn: the welcome message must be seen BEFORE typing).
//               If they disengage without typing, the panel quietly dismisses.
//   expanded  — panel rises out of the bar; the bar stays put as the composer
//               (mobile: full-screen sheet instead)
//   minimized — chevron collapses back to the bar; conversation preserved
//               (the engine stays mounted; focusing the bar re-expands)
// Handoff CTAs: minimize the panel and scroll the host homepage to #plans in
// place — no navigation, so the conversation stays accessible.
//
// The engine is untouched and identical to the other form factors. The shell
// observes it via event capture (submit/focus bubbling) and restyles its
// composer area into the floating pill with structural CSS only.

import { useEffect, useMemo, useRef, useState } from 'react'
import ResponsiveHomepage from '../ResponsiveHomepage.jsx'
import ConversationEngine from '../../engine/ConversationEngine.jsx'
import { createScriptedBrain } from '../../engine/brains/scriptedBrain.js'
import useIsMobile from '../../hooks/useIsMobile.js'
import {
  PILL_PLACEHOLDER_IN_SESSION,
  PILL_PLACEHOLDER_POST_SUBSCRIBE,
  READONLY_INPUT_PLACEHOLDER,
} from '../../data/guideScript.js'
import styles from './MessageBarShell.module.css'

export default function MessageBarShell({
  onGateAccept,
  onHandoff,
  // Resume props — used by the maze-test route to seed a mid-conversation
  // state on a fresh load (so Maze can reload between missions without
  // wiping the chat). All optional; other routes leave them unset and
  // behave exactly as before.
  brainStartIndex = 0,
  initialMessages,
  initialExpanded = false,
  initialStarted = false,
  initialSubscribed = false,
  initialEnded = false,
} = {}) {
  const brain = useMemo(
    () => createScriptedBrain({ startIndex: brainStartIndex }),
    [brainStartIndex],
  )
  const [expanded, setExpanded] = useState(initialExpanded)
  const [started, setStarted] = useState(initialStarted) // a first message has been sent
  const [subscribed, setSubscribed] = useState(initialSubscribed) // handoff CTA was clicked
  const isMobile = useIsMobile()
  const dockRef = useRef(null)

  // Mobile sheet: lock the homepage scroll behind it.
  useEffect(() => {
    if (!(expanded && isMobile)) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [expanded, isMobile])

  // Esc minimizes.
  useEffect(() => {
    if (!expanded) return
    const onKey = e => { if (e.key === 'Escape') setExpanded(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  // Dismiss on disengage: while the panel is open pre-conversation, a click
  // outside it with nothing typed quietly collapses it.
  useEffect(() => {
    if (!expanded || started) return
    const onPointerDown = e => {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        const input = dockRef.current.querySelector('input[aria-label="Message Elle"]')
        if (!input || !input.value.trim()) setExpanded(false)
      }
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [expanded, started])

  // Any send marks the conversation as started (panel stays from then on).
  function handleSubmitCapture(e) {
    const input = e.target.querySelector?.('input')
    if (input && input.value.trim()) setStarted(true)
    setExpanded(true)
  }

  // Clicking into the bar expands the panel — Elle's greeting is visible
  // before the participant types. Also re-expands a minimized conversation.
  function handleFocusCapture() {
    setExpanded(true)
  }

  // Clicks on the bar itself also re-expand. Needed for ended conversations:
  // the composer is disabled then, disabled inputs swallow focus/click events,
  // and the chat history must stay revisitable in-session (the input gets
  // pointer-events: none via CSS so the click reaches this wrapper).
  function handlePointerDownCapture() {
    if (!expanded) setExpanded(true)
  }

  // Handoff CTAs: minimize and scroll the host homepage to the plans section
  // in place. The engine stays mounted, so the conversation stays accessible.
  // The shell also flips to its post-subscribe surface: the pill placeholder
  // changes and, when reopened, the composer is read-only (see engine props).
  function handleCta() {
    // Optional side-channel for maze-test routes (silent URL updates, analytics).
    // No-op when the prop is unset — /maze/hifi/message-bar and /maze/message-bar
    // don't pass one, so their behavior is byte-for-byte identical.
    onHandoff?.()
    setSubscribed(true)
    setExpanded(false)
    const scrollToPlans = behavior =>
      document.getElementById('plans')?.scrollIntoView({ behavior, block: 'start' })
    // Wait out the collapse (mobile sheet teardown + scroll unlock), try a
    // smooth scroll, then verify — some mobile environments suppress smooth
    // scrolling, so force an instant scroll if the target didn't arrive.
    setTimeout(() => scrollToPlans('smooth'), 350)
    setTimeout(() => {
      const el = document.getElementById('plans')
      if (el && Math.abs(el.getBoundingClientRect().top) > 80) scrollToPlans('auto')
    }, 1200)
  }

  return (
    <div>
      <ResponsiveHomepage />

      <div ref={dockRef} className={`${styles.dock} ${expanded ? styles.expanded : styles.collapsed}`}>
        <div className={styles.panelHeader}>
          <span className={styles.panelTitle}>
            Elle
            <span className={styles.aiBadge}>AI</span>
          </span>
          <button
            type="button"
            className={styles.minimize}
            aria-label="Minimize conversation"
            onClick={() => setExpanded(false)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div
          className={styles.engineStack}
          onSubmitCapture={handleSubmitCapture}
          onFocusCapture={handleFocusCapture}
          onPointerDownCapture={handlePointerDownCapture}
        >
          <ConversationEngine
            brain={brain}
            onCta={handleCta}
            onGateAccept={onGateAccept}
            initialMessages={initialMessages}
            initialEnded={initialEnded}
            placeholder={
              // Post-subscribe state:
              //  - collapsed pill: "Revisit your conversation with Elle"
              //  - expanded (read-only chat): "Ask Elle a question..."
              // In-session state:
              //  - collapsed pill: "Continue your conversation with Elle…"
              //  - expanded: default composer copy from the engine
              subscribed
                ? (expanded ? READONLY_INPUT_PLACEHOLDER : PILL_PLACEHOLDER_POST_SUBSCRIBE)
                : (!expanded && started ? PILL_PLACEHOLDER_IN_SESSION : undefined)
            }
          />
        </div>
      </div>
    </div>
  )
}
