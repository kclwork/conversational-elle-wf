// Resume-state builder for /maze/test/security-deposit.
//
// Maze runs each mission in its own page load, which means a deep-link like
// ?stage=post-gate is what the participant sees FIRST for Mission 2 — the
// in-memory chat state from Mission 1 is gone. To keep the conversation
// coherent, we pre-populate the engine with the scripted history that led up
// to the stage, and drop the brain's cursor at the next turn to play.
//
// All copy is pulled from src/data/guideScript.js — nothing is duplicated here.

import { guideScript, OPENING_MESSAGE } from '../../data/guideScript.js'

// Displayed as the participant's own gate bubble in a resumed session. It
// stands in for whatever the actual participant would have typed in Mission 1.
const SEEDED_GATE_EMAIL = 'you@example.com'

const openingElleMessage = () => ({
  role: 'elle',
  blocks: OPENING_MESSAGE.blocks,
  moments: [],
})

function findTurn(id) {
  const turn = guideScript.find(t => t.id === id)
  if (!turn) throw new Error(`guideScript is missing turn ${id}`)
  return turn
}

const userTurnMessage = id => ({
  role: 'user',
  blocks: [{ type: 'p', text: findTurn(id).expected }],
})

const elleTurnMessage = id => {
  const turn = findTurn(id)
  return { role: 'elle', blocks: turn.blocks, moments: turn.moments || [] }
}

const gateSubmissionMessage = () => ({
  role: 'user',
  blocks: [{ type: 'p', text: SEEDED_GATE_EMAIL }],
})

// Index into guideScript for the NEXT turn the brain should play. Post-gate
// picks up at t6 (the "can he legally keep it" pushback — turn index 5); the
// done stage has nothing left to play (cursor at end).
const POST_GATE_CURSOR = guideScript.findIndex(t => t.id === 't6')
const DONE_CURSOR = guideScript.length

const POST_GATE_HISTORY = [
  openingElleMessage(),
  userTurnMessage('t1'),
  elleTurnMessage('t2'),
  userTurnMessage('t3'),
  elleTurnMessage('t4'),
  gateSubmissionMessage(),
  elleTurnMessage('t5'),
]

const DONE_HISTORY = [
  ...POST_GATE_HISTORY,
  userTurnMessage('t6'),
  elleTurnMessage('t7'),
  userTurnMessage('t8'),
  elleTurnMessage('t9'),
  userTurnMessage('t10'),
  elleTurnMessage('t11'),
]

// Returns a props bundle for MessageBarShell, or null if the stage is unknown
// (no stage param, or a value we don't seed). Callers should fall back to the
// shell's normal defaults in the null case.
export function buildResumeState(stage) {
  if (stage === 'post-gate') {
    return {
      initialMessages: POST_GATE_HISTORY,
      brainStartIndex: POST_GATE_CURSOR,
      initialExpanded: true,
      initialStarted: true,
      initialSubscribed: false,
      initialEnded: false,
    }
  }
  if (stage === 'done') {
    return {
      initialMessages: DONE_HISTORY,
      brainStartIndex: DONE_CURSOR,
      // Match the natural post-CTA surface: panel minimized, pill on the
      // pricing section, composer disabled.
      initialExpanded: false,
      initialStarted: true,
      initialSubscribed: true,
      initialEnded: true,
    }
  }
  return null
}
