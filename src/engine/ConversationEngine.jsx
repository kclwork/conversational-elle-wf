// The conversation UI — one engine, rendered inside any of the three form-factor
// shells. Everything here is identical across form factors: message bubbles,
// typing indicator, gate card, handoff CTAs, disclosure line, composer.
// Only the CONTAINER around this component changes per form factor.

import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useConversation from './useConversation.js'
import MessageBlocks from './MessageBlocks.jsx'
import {
  DISCLOSURE_TEXT,
  INPUT_PLACEHOLDER,
  GATE_DECLINE_LABEL,
  GATE_EMAIL_PLACEHOLDER,
} from '../data/guideScript.js'
import styles from './engine.module.css'

function TypingIndicator() {
  return (
    <div className={`${styles.bubble} ${styles.elleBubble} ${styles.typingBubble}`}>
      <span className={styles.dot} />
      <span className={styles.dot} />
      <span className={styles.dot} />
    </div>
  )
}

function GateCard({ onAccept, onDecline }) {
  const [email, setEmail] = useState('')
  const [invalid, setInvalid] = useState(false)

  function submit(e) {
    e.preventDefault()
    const ok = onAccept(email)
    if (!ok) setInvalid(true)
  }

  return (
    <div className={styles.gateCard}>
      <form className={styles.gateForm} onSubmit={submit}>
        <input
          type="email"
          className={`${styles.gateInput} ${invalid ? styles.gateInputError : ''}`}
          placeholder={GATE_EMAIL_PLACEHOLDER}
          value={email}
          onChange={e => { setEmail(e.target.value); setInvalid(false) }}
          aria-label="Email address for summary"
        />
        <button type="submit" className={styles.gateSend} aria-label="Send summary">→</button>
      </form>
      {invalid && <p className={styles.gateError}>ⓘ Please enter a valid email address</p>}
      <button type="button" className={styles.gateDecline} onClick={onDecline}>
        {GATE_DECLINE_LABEL}
      </button>
    </div>
  )
}

export default function ConversationEngine({ brain, onCta }) {
  const convo = useConversation(brain)
  const [draft, setDraft] = useState('')
  const scrollRef = useRef(null)
  const navigate = useNavigate()

  // Handoff CTAs — identical behavior across all three form factors: both
  // route to the homepage plans (pricing) section. Shells may override via
  // onCta (e.g. the widget closes its panel first, then scrolls in place).
  const handleCta = onCta || (() => navigate('/homepage#plans'))

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [convo.messages, convo.typing, convo.gateOpen, convo.reOfferOpen])

  function submit(e) {
    e.preventDefault()
    if (!draft.trim()) return
    convo.sendText(draft)
    setDraft('')
  }

  const showGateCard = convo.gateOpen || convo.reOfferOpen

  return (
    <div className={styles.engine}>
      <div className={styles.scroll} ref={scrollRef}>
        <div className={styles.messages}>
          {convo.messages.map(msg => (
            <div key={msg.id} className={msg.role === 'user' ? styles.userRow : styles.elleRow}>
              <div className={`${styles.bubble} ${msg.role === 'user' ? styles.userBubble : styles.elleBubble}`}>
                <MessageBlocks blocks={msg.blocks} />
                {msg.blocks.some(b => b.type === 'ctaRow') && (
                  <div className={styles.ctaRow}>
                    {msg.blocks.find(b => b.type === 'ctaRow').ctas.map(cta => (
                      <button
                        key={cta.label}
                        type="button"
                        className={cta.style === 'primary' ? styles.ctaPrimary : styles.ctaSecondary}
                        onClick={() => handleCta(cta)}
                      >
                        {cta.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {convo.typing && <div className={styles.elleRow}><TypingIndicator /></div>}

          {showGateCard && !convo.typing && (
            <div className={styles.elleRow}>
              <GateCard onAccept={convo.acceptGate} onDecline={convo.declineGate} />
            </div>
          )}
        </div>
      </div>

      <div className={styles.composerArea}>
        <form className={styles.composer} onSubmit={submit}>
          <input
            type="text"
            className={styles.input}
            placeholder={INPUT_PLACEHOLDER}
            value={draft}
            onChange={e => setDraft(e.target.value)}
            disabled={convo.ended}
            aria-label="Message Elle"
          />
          <button
            type="submit"
            className={styles.send}
            disabled={convo.ended || !draft.trim()}
            aria-label="Send message"
          >
            →
          </button>
        </form>
        {/* PLACEHOLDER PENDING LEGAL — identical across all three form factors */}
        <p className={styles.disclosure}>{DISCLOSURE_TEXT}</p>
      </div>
    </div>
  )
}
