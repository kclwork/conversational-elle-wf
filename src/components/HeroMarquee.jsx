import styles from './HeroMarquee.module.css'

const COL1 = [
  '/images/homepage/hero/col1-image-1.png',
  '/images/homepage/hero/col1-image-2.png',
  '/images/homepage/hero/col1-image-3.png',
]

const COL2 = [
  '/images/homepage/hero/col2-image-1.png',
  '/images/homepage/hero/col2-image-2.png',
  '/images/homepage/hero/col2-image-3.png',
]

export default function HeroMarquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.col}>
        <div className={styles.trackUp}>
          {[...COL1, ...COL1].map((src, i) => (
            <img key={i} src={src} alt="" className={styles.img} />
          ))}
        </div>
      </div>
      <div className={styles.col}>
        <div className={styles.trackDown}>
          {[...COL2, ...COL2].map((src, i) => (
            <img key={i} src={src} alt="" className={styles.img} />
          ))}
        </div>
      </div>
    </div>
  )
}
