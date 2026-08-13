// FORM FACTOR 1 — Full Page, conversation view.
// A dedicated destination page: minimal LegalShield chrome (so it reads as part
// of the marketing site, not an app dashboard), one generous centered reading
// column, bottom-docked composer. The engine inside is identical to the other
// form factors — only this container differs.

import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import ConversationEngine from '../../engine/ConversationEngine.jsx'
import { createScriptedBrain } from '../../engine/brains/scriptedBrain.js'
import PlansDrawer from './PlansDrawer.jsx'
import styles from './FullPageChat.module.css'

export default function FullPageChat({ basePath }) {
  const brain = useMemo(() => createScriptedBrain(), [])
  // Handoff CTA opens the plans drawer OVER the conversation — the chat stays
  // mounted behind it, so the recap stays one tap away.
  const [plansOpen, setPlansOpen] = useState(false)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link to={basePath} className={styles.logo} aria-label="Back to LegalShield home">
          <img src="/images/logo.svg" alt="LegalShield" />
        </Link>
        <Link to={basePath} className={styles.back}>← Back to LegalShield</Link>
      </header>

      <main className={styles.main}>
        <div className={styles.column}>
          <ConversationEngine brain={brain} onCta={() => setPlansOpen(true)} />
        </div>
      </main>

      <PlansDrawer open={plansOpen} onClose={() => setPlansOpen(false)} />
    </div>
  )
}
