import { useState } from 'react'
import MobileNav from '../../components/mobile/MobileNav.jsx'
import MobileFooter from '../../components/mobile/MobileFooter.jsx'
import useScrollToHash from '../../hooks/useScrollToHash.js'
import styles from './MobileHomepage.module.css'

const HERO_IMAGES = [
  '/images/homepage/hero/col1-image-1.png',
  '/images/homepage/hero/col2-image-1.png',
  '/images/homepage/hero/col1-image-2.png',
  '/images/homepage/hero/col2-image-2.png',
  '/images/homepage/hero/col1-image-3.png',
  '/images/homepage/hero/col2-image-3.png',
]

const INFO_FAQ = [
  {
    question: 'What kinds of legal issues can LegalShield help with?',
    answer: 'LegalShield attorneys can help with a wide range of legal matters — from reviewing contracts and documents to advising on family law, real estate, estate planning, traffic issues, and more. Your plan gives you direct access to a real, licensed attorney.',
  },
  { question: 'Is there a limit to how often I can use my plan?', answer: '' },
  { question: 'Can I use LegalShield for business matters?', answer: '' },
  { question: 'How quickly can I speak to a lawyer?', answer: '' },
]

const BOTTOM_FAQ = [
  {
    question: 'Is LegalShield a law firm?',
    answer: 'No. LegalShield is a legal services company that connects you with a network of independent provider law firms. You get direct access to licensed attorneys through your membership plan.',
  },
  { question: 'What is the difference between LegalShield and hiring a lawyer?', answer: '' },
  { question: 'Can I cancel my membership at any time?', answer: '' },
  { question: 'Is my personal information kept confidential?', answer: '' },
]

const AWARDS = [
  '/images/homepage/awards/forbes-2023.png',
  '/images/homepage/awards/forbes-2024.png',
  '/images/homepage/awards/forbes-2025.png',
  '/images/homepage/awards/forbes-2026.png',
]

const LOGOS = [
  '/images/homepage/logo-cloud/Media.png',
  '/images/homepage/logo-cloud/Media-1.png',
  '/images/homepage/logo-cloud/Media-2.png',
  '/images/homepage/logo-cloud/Media-3.png',
  '/images/homepage/logo-cloud/Media-4.png',
]

const AOL_CARDS = [
  { img: '/images/homepage/aol/01-family-law.png', label: 'Family Law' },
  { img: '/images/homepage/aol/02-real-estate.png', label: 'Real Estate' },
  { img: '/images/homepage/aol/03-estate-planning.png', label: 'Estate Planning' },
  { img: '/images/homepage/aol/04-renters.png', label: 'Renters' },
  { img: '/images/homepage/aol/05-contracts.png', label: 'Contracts' },
  { img: '/images/homepage/aol/06-traffic-and-accidents.png', label: 'Traffic & Accidents' },
]

const HOW_IT_WORKS = [
  {
    step: '01',
    heading: 'Select your plan and get started.',
    body: 'Choose the plan that fits your needs. Sign up in minutes — no lengthy forms or legal jargon.',
    img: '/images/homepage/how-it-works/01-step-1.png',
  },
  {
    step: '02',
    heading: 'We connect you with a lawyer.',
    body: "Get matched with a licensed attorney in your provider law firm — someone who knows your state's laws.",
    img: '/images/homepage/how-it-works/02-step-2.png',
  },
  {
    step: '03',
    heading: 'Relax while they take care of it.',
    body: 'Your attorney handles the legal work. You stay informed every step of the way — without the hourly bills.',
    img: '/images/homepage/how-it-works/03-step-3.png',
  },
]

function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div className={styles.faqList}>
      {items.map((item, i) => {
        const interactive = i === 0
        const isOpen = openIndex === i
        return (
          <div key={i} className={styles.faqItem}>
            <button
              type="button"
              className={styles.faqTrigger}
              onClick={() => interactive && setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
            >
              <span className={styles.faqQuestion}>{item.question}</span>
              <span className={styles.faqIcon}>{interactive && isOpen ? '−' : '+'}</span>
            </button>
            {isOpen && item.answer && (
              <div className={styles.faqAnswer}><p>{item.answer}</p></div>
            )}
            <div className={styles.faqDivider} />
          </div>
        )
      })}
    </div>
  )
}

function HowWeHelpCarousel() {
  const [index, setIndex] = useState(0)
  const total = AOL_CARDS.length
  const prev = () => setIndex(i => (i - 1 + total) % total)
  const next = () => setIndex(i => (i + 1) % total)

  return (
    <>
      <div className={styles.carouselViewport}>
        <div
          className={styles.carouselTrack}
          style={{ transform: `translateX(calc(${-index * 100}% - ${index * 12}px))` }}
        >
          {AOL_CARDS.map((card, i) => (
            <div key={i} className={styles.carouselCard}>
              <img src={card.img} alt={card.label} className={styles.carouselImg} />
              <span className={styles.carouselLabel}>{card.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.carouselControls}>
        <button
          type="button"
          className={styles.carouselBtn}
          onClick={prev}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          className={styles.carouselBtn}
          onClick={next}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  )
}

export default function MobileHomepage({ elleCta }) {
  useScrollToHash()
  return (
    <div className={styles.page}>
      <MobileNav elleCta={elleCta} />
      <main>

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <h1 className={styles.heroHeadline}>Real lawyers.<br />Unreal prices.</h1>
            <p className={styles.heroBody}>
              Get unlimited access to real, licensed attorneys — for less than a dollar a day. No hourly rates. No surprises.
            </p>
            <button type="button" className={styles.heroCta}>Shop plans</button>
          </div>
          <div className={styles.marqueeViewport}>
            <div className={styles.marqueeTrack}>
              {[...HERO_IMAGES, ...HERO_IMAGES].map((src, i) => (
                <div key={i} className={styles.marqueeItem}>
                  <img src={src} alt="" className={styles.marqueeImg} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section className={styles.stats}>
          <div className={styles.statItem}>
            <span className={styles.statNumber}>4.5M</span>
            <span className={styles.statLabel}>members and growing</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>22 yrs</span>
            <span className={styles.statLabel}>of legal expertise</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.statItem}>
            <span className={styles.statNumber}>$1<span className={styles.statSup}>/day</span></span>
            <span className={styles.statLabel}>plans starting from</span>
          </div>
        </section>

        {/* ── ONE SIMPLE LEGAL SOLUTION ── */}
        <section className={styles.info}>
          <img
            src="/images/homepage/info/family-of-4.png"
            alt="Family of four"
            className={styles.infoImg}
          />
          <h2 className={styles.infoHeading}>One simple legal solution. Zero hourly rates.</h2>
          <FaqAccordion items={INFO_FAQ} />
        </section>

        {/* ── AWARDS ── */}
        <section className={styles.awards}>
          <h2 className={styles.awardsHeading}>Named best overall prepaid legal service 3 years in a row</h2>
          <div className={styles.awardsGrid}>
            {AWARDS.map((src, i) => (
              <img key={i} src={src} alt="" className={styles.awardImg} />
            ))}
          </div>
        </section>

        {/* ── LOGO CLOUD ── */}
        <section className={styles.logoCloud}>
          <span className={styles.logoEyebrow}>Featured in</span>
          <div className={styles.logoRow}>
            {LOGOS.map((src, i) => (
              <img key={i} src={src} alt="" className={styles.logoImg} />
            ))}
          </div>
        </section>

        {/* ── HOW WE HELP CAROUSEL ── */}
        <section className={styles.howWeHelp}>
          <h2 className={styles.sectionHeading}>How we help</h2>
          <HowWeHelpCarousel />
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className={styles.howItWorks}>
          <h2 className={styles.sectionHeading}>How it works</h2>
          <div className={styles.steps}>
            {HOW_IT_WORKS.map(step => (
              <div key={step.step} className={styles.step}>
                <img src={step.img} alt="" className={styles.stepImg} />
                <span className={styles.stepNumber}>{step.step}</span>
                <h3 className={styles.stepHeading}>{step.heading}</h3>
                <p className={styles.stepBody}>{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className={styles.testimonial}>
          <blockquote className={styles.quote}>
            "LegalShield delivered prompt, reliable service at a rate that's nearly impossible to find today!"
          </blockquote>
        </section>

        {/* ── PRICING ── */}
        <section id="plans" className={styles.pricing}>
          <h2 className={styles.pricingHeading}>
            Affordable plans for <em>every</em> need.
          </h2>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCard}>
              <span className={styles.planName}>Personal &amp; Family</span>
              <p className={styles.planDesc}>Legal services on unlimited number of personal legal issues. Legal services provided by attorneys with an average of 22 years of experience.</p>
              <div className={styles.planPrice}>$35<span className={styles.planPer}>+/mo</span></div>
              <button type="button" className={styles.planCta}>Shop Plans</button>
            </div>
            <div className={styles.pricingCard}>
              <span className={styles.planName}>Small Business</span>
              <p className={styles.planDesc}>Legal services on business bases, including document review, help collecting debts, on our behalf, and more.</p>
              <div className={styles.planPrice}>$53.95<span className={styles.planPer}>+/mo</span></div>
              <button type="button" className={styles.planCta}>Shop Plans</button>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className={styles.faqSection}>
          <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
          <FaqAccordion items={BOTTOM_FAQ} />
          <button type="button" className={styles.helpCenterBtn}>Help Center</button>
        </section>

        {/* ── CTA ── */}
        <section className={styles.cta}>
          <h2 className={styles.ctaHeading}>Ready to get legal help?</h2>
          <button type="button" className={styles.ctaBtn}>Shop plans</button>
        </section>

      </main>
      <MobileFooter />
    </div>
  )
}
