// Conversation engine state machine — ONE engine, swappable brain, three shells.
// The shells never know which brain is running; they just render this hook's state.

import { useCallback, useRef, useState } from 'react'
import { OPENING_MESSAGE } from '../data/guideScript.js'

const EMAIL_RE = /^\S+@\S+\.\S+$/

// Elle "types" for ~1–1.5s before each scripted response lands.
const typingDelay = () => 1000 + Math.random() * 500

const wait = ms => new Promise(r => setTimeout(r, ms))

let nextId = 1
const mid = () => `m${nextId++}`

export default function useConversation(brain) {
  // Elle's opening greeting is present on load — identical in both brains and
  // across all three form factors.
  const [messages, setMessages] = useState(() => [
    { id: mid(), role: 'elle', blocks: OPENING_MESSAGE.blocks, moments: [] },
  ])
  const [typing, setTyping] = useState(false)
  const [gateOpen, setGateOpen] = useState(false)     // inline email/decline choice visible
  const [reOfferOpen, setReOfferOpen] = useState(false) // provisional re-offer input visible
  const [ended, setEnded] = useState(false)
  // Reserved: safety escalation exits all gates and caps. Content pending Trust & Safety —
  // placeholder state only, no UI yet.
  const [escalation] = useState(null)
  const busy = useRef(false)

  const playResult = useCallback(async result => {
    for (const msg of result.messages) {
      setTyping(true)
      // Scripted responses play after a brief typing indicator; live responses
      // have already arrived by now, so a short beat keeps the rhythm natural.
      await wait(typingDelay())
      setTyping(false)
      setMessages(prev => [...prev, { id: mid(), role: 'elle', ...msg }])
    }
    setGateOpen(result.gate)
    setReOfferOpen(result.reOffer)
    if (result.ended) setEnded(true)
  }, [])

  const dispatch = useCallback(async input => {
    if (busy.current) return
    busy.current = true
    try {
      const result = await brain.send(input)
      await playResult(result)
    } finally {
      busy.current = false
      setTyping(false)
    }
  }, [brain, playResult])

  // Main composer input. At the gate (and the re-offer), typed input still
  // works: email-shaped text accepts the offer (format-only validation;
  // accepted visually — nothing is stored or transmitted); anything else
  // declines, and the conversation visibly continues either way.
  const sendText = useCallback(text => {
    const trimmed = text.trim()
    if (!trimmed || ended) return
    setMessages(prev => [...prev, { id: mid(), role: 'user', blocks: [{ type: 'p', text: trimmed }] }])

    if (gateOpen || reOfferOpen) {
      setGateOpen(false)
      setReOfferOpen(false)
      dispatch({ type: EMAIL_RE.test(trimmed) ? 'gateAccept' : 'gateDecline' })
      return
    }

    dispatch({ type: 'text', text: trimmed })
  }, [dispatch, ended, gateOpen, reOfferOpen])

  // Inline gate card actions (email field submit / decline chip).
  // Format-only validation — an invalid email shows the card's inline error
  // state (returns false); a valid one is accepted visually and goes nowhere.
  const acceptGate = useCallback(email => {
    const trimmed = (email || '').trim()
    if (!EMAIL_RE.test(trimmed)) return false
    setMessages(prev => [...prev, { id: mid(), role: 'user', blocks: [{ type: 'p', text: trimmed }] }])
    setGateOpen(false)
    setReOfferOpen(false)
    dispatch({ type: 'gateAccept' })
    return true
  }, [dispatch])

  const declineGate = useCallback(() => {
    setGateOpen(false)
    setReOfferOpen(false)
    dispatch({ type: 'gateDecline' })
  }, [dispatch])

  return {
    messages,
    typing,
    gateOpen,
    reOfferOpen,
    ended,
    escalation,
    sendText,
    acceptGate,
    declineGate,
  }
}
