// Build tool: the conversation engine in a bare container (scripted brain).
// Not a form factor — exists so the engine can be reviewed on its own.

import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import ConversationEngine from '../engine/ConversationEngine.jsx'
import { createScriptedBrain } from '../engine/brains/scriptedBrain.js'
import styles from './EngineTest.module.css'

export default function EngineTest() {
  const brain = useMemo(() => createScriptedBrain(), [])

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link to="/" className={styles.back}>← Index</Link>
        <span className={styles.label}>Engine test — scripted (Maze)</span>
      </div>
      <div className={styles.container}>
        <ConversationEngine brain={brain} />
      </div>
    </div>
  )
}
