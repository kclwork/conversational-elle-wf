import { useState } from 'react'
import styles from './HowWeHelpCarousel.module.css'

const CARDS = [
  { label: 'Family Law', img: '/images/homepage/aol/01-family-law.png' },
  { label: 'Real Estate', img: '/images/homepage/aol/02-real-estate.png' },
  { label: 'Estate Planning', img: '/images/homepage/aol/03-estate-planning.png' },
  { label: 'Renters', img: '/images/homepage/aol/04-renters.png' },
  { label: 'Contracts', img: '/images/homepage/aol/05-contracts.png' },
  { label: 'Traffic & Accidents', img: '/images/homepage/aol/06-traffic-and-accidents.png' },
]

const VISIBLE = 4

export default function HowWeHelpCarousel() {
  const [offset, setOffset] = useState(0)
  const maxOffset = CARDS.length - VISIBLE

  return (
    <div className={styles.carousel}>
      <div className={styles.header}>
        <h2 className={styles.heading}>How we help</h2>
        <div className={styles.controls}>
          <button
            className={styles.btn}
            onClick={() => setOffset(o => Math.max(0, o - 1))}
            disabled={offset === 0}
            aria-label="Previous"
          >
            ←
          </button>
          <button
            className={styles.btn}
            onClick={() => setOffset(o => Math.min(maxOffset, o + 1))}
            disabled={offset === maxOffset}
            aria-label="Next"
          >
            →
          </button>
        </div>
      </div>

      <div className={styles.trackWrapper}>
        <div
          className={styles.track}
          style={{ transform: `translateX(calc(-${offset} * (25% + 6px)))` }}
        >
          {CARDS.map((card, i) => (
            <div key={i} className={styles.card}>
              <img src={card.img} alt={card.label} className={styles.cardImg} />
              <span className={styles.cardLabel}>{card.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
