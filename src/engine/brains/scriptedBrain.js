// Scripted brain — plays back the pre-authored Maze script from src/data/guideScript.js.
// No API calls. Nothing typed here is stored or transmitted; email-shaped input at the
// gate is accepted visually and goes nowhere.
//
// Brain interface (the engine talks only to this; a live/API brain can be
// re-added behind the same interface if the prototype ever needs one):
//   brain.send(input) -> Promise<{ messages, gate, ended }>
//     input:    { type: 'text', text } | { type: 'gateAccept' }
//     messages: [{ blocks, moments }]  — Elle messages to play back
//     gate:     true when the UI should show the inline email field (a wall — the
//               conversation cannot continue until a valid email is submitted)
//     ended:    true when the conversation has reached its end state

import { guideScript } from '../../data/guideScript.js'

export function createScriptedBrain({ startIndex = 0 } = {}) {
  // Pointer into the ordered turn array. Forgiving by design: ANY typed input
  // advances the script — nobody ever gets stuck at a dead input (except at the
  // gate, which is a wall by design and requires a valid email).
  // `startIndex` is used by the maze-test resume paths to drop the cursor
  // partway through the script when the chat is pre-populated with history.
  let index = startIndex

  function collectElleTurns() {
    const messages = []
    let gate = false
    let ended = false

    while (index < guideScript.length) {
      const turn = guideScript[index]

      if (turn.role === 'user') break // wait for the participant's next input

      const moments = turn.moments || []
      messages.push({ blocks: turn.blocks, moments })

      index += 1

      // A gate moment pauses playback: the next thing the engine shows is the
      // email field. The post-gate line plays once a valid email is submitted.
      if (moments.includes('gate')) {
        gate = true
        break
      }
    }

    // End state: nothing left to play after the handoff.
    if (index >= guideScript.length && !gate) ended = true

    return { messages, gate, ended }
  }

  return {
    mode: 'scripted',

    async send(input) {
      if (input.type === 'gateAccept') {
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
