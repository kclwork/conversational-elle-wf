import { useState } from 'react'
import styles from './Accordion.module.css'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isInteractive = i === 0
        const isOpen = openIndex === i

        return (
          <div key={i} className={styles.item}>
            <button
              className={styles.trigger}
              onClick={() => isInteractive && setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{ cursor: isInteractive ? 'pointer' : 'default' }}
            >
              <span className={styles.question}>{item.question}</span>
              {isInteractive && (
                <span className={styles.icon}>{isOpen ? '−' : '+'}</span>
              )}
              {!isInteractive && <span className={styles.icon}>+</span>}
            </button>
            {isOpen && (
              <div className={styles.body}>
                <p>{item.answer}</p>
              </div>
            )}
            <div className={styles.divider} />
          </div>
        )
      })}
    </div>
  )
}
