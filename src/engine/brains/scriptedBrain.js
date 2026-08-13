// Scripted brain — plays back the pre-authored Maze script from src/data/guideScript.js.
// No API calls. Nothing typed here is stored or transmitted; email-shaped input at the
// gate is accepted visually and goes nowhere.
//
// Brain interface (the engine talks only to this; a live/API brain can be
// re-added behind the same interface if the prototype ever needs one):
//   brain.send(input) -> Promise<{ messages, gate, reOffer, ended }>
//     input: { type: 'text', text } | { type: 'gateAccept' } | { type: 'gateDecline' }
//     messages: [{ blocks, moments }]  — Elle messages to play back
//     gate:    true when the UI should show the inline email/decline choice
//     reOffer: true when the provisional re-offer input should show (Turn 11b)
//     ended:   true when the conversation has reached its end state

import { guideScript, PROVISIONAL_RE_OFFER_ENABLED } from '../../data/guideScript.js'

export function createScriptedBrain() {
  // Pointer into the ordered turn array. Forgiving by design: ANY typed input
  // advances the script — nobody ever gets stuck at a dead input.
  let index = 0
  let gateChoice = null // 'gateAccepted' | 'gateDeclined'
  let awaiting = null // 'gate' | 'reOffer' — which choice the UI is showing

  function collectElleTurns() {
    const messages = []
    let gate = false
    let reOffer = false
    let ended = false

    while (index < guideScript.length) {
      const turn = guideScript[index]

      if (turn.role === 'user') break // wait for the participant's next input

      // Provisional re-offer: only on the declined path, only while enabled.
      if (turn.provisional) {
        if (!PROVISIONAL_RE_OFFER_ENABLED || gateChoice !== turn.onlyIf) {
          index += 1
          continue
        }
        messages.push({ blocks: turn.blocks, moments: turn.moments || [] })
        reOffer = true
        awaiting = 'reOffer'
        index += 1
        continue
      }

      // Branch turn (the gate response) — resolved by gateChoice.
      if (turn.branches) {
        const branch = turn.branches[gateChoice] || turn.branches.gateDeclined
        messages.push({ blocks: branch.blocks, moments: [] })
        index += 1
        continue
      }

      const moments = turn.moments || []
      messages.push({ blocks: turn.blocks, moments })

      index += 1

      // A gate moment pauses playback: the next thing the engine shows is the
      // email/decline choice, and the branch turn plays after the choice.
      if (moments.includes('gate')) {
        gate = true
        awaiting = 'gate'
        break
      }
    }

    // End state: nothing left to play after the handoff (and re-offer, if shown).
    if (index >= guideScript.length && !gate && !reOffer) ended = true

    return { messages, gate, reOffer, ended }
  }

  return {
    mode: 'scripted',

    async send(input) {
      if (input.type === 'gateAccept' || input.type === 'gateDecline') {
        // Re-offer choice (Turn 11b): accept plays the confirmation line;
        // either way, the conversation ends at the handoff state.
        if (awaiting === 'reOffer') {
          awaiting = null
          const reOfferTurn = guideScript.find(t => t.provisional)
          const messages =
            input.type === 'gateAccept' && reOfferTurn?.acceptConfirmation
              ? [{ blocks: reOfferTurn.acceptConfirmation.blocks, moments: [] }]
              : []
          return { messages, gate: false, reOffer: false, ended: true }
        }

        awaiting = null
        gateChoice = input.type === 'gateAccept' ? 'gateAccepted' : 'gateDeclined'
        return collectElleTurns()
      }

      // Plain text: consume the pending user turn (whatever was actually typed)
      // and play Elle's next response(s).
      if (index < guideScript.length && guideScript[index].role === 'user') {
        index += 1
      }
      return collectElleTurns()
    },
  }
}
