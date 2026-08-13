// Internal navigation index — links every variant (3 form factors × live/scripted).
// Maze participants never see this; they get deep-linked to one /maze/* route.

import { Link } from 'react-router-dom'
import styles from './IndexPage.module.css'

const VARIANTS = [
  {
    name: 'Full Page',
    desc: 'Dedicated conversation page, reached via the "Ask Elle" CTA in the homepage nav.',
    demo: '/maze/full-page',
  },
  {
    name: 'Floating Message Bar',
    desc: 'Fin-style floating bar over the homepage — clicking into it opens the conversation.',
    demo: '/maze/message-bar',
  },
  {
    name: 'Chat Widget',
    desc: 'Zendesk-style corner bubble opening into a contained panel over the homepage.',
    demo: '/maze/chat-widget',
  },
]

export default function IndexPage() {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Conversational Elle Freemium — Guide voice</p>
        <h1 className={styles.heading}>Form factor prototype</h1>
        <p className={styles.sub}>
          One engine, one script, three containers. Every demo plays the scripted
          Colorado security-deposit conversation — any typed input advances it.
        </p>

        <div className={styles.grid}>
          {VARIANTS.map(v => (
            <div key={v.name} className={styles.card}>
              <h2 className={styles.cardTitle}>{v.name}</h2>
              <p className={styles.cardDesc}>{v.desc}</p>
              <div className={styles.cardLinks}>
                <Link className={styles.linkPrimary} to={v.demo}>Start demo</Link>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.utility}>
          <span className={styles.utilityLabel}>Build tools:</span>
          <Link className={styles.utilityLink} to="/maze/engine">Engine test</Link>
          <Link className={styles.utilityLink} to="/homepage">Pruned homepage</Link>
        </div>
      </div>
    </div>
  )
}
