import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import HeroMarquee from '../components/HeroMarquee.jsx'
import HowWeHelpCarousel from '../components/HowWeHelpCarousel.jsx'
import Accordion from '../components/Accordion.jsx'
import useScrollToHash from '../hooks/useScrollToHash.js'
import styles from './Homepage.module.css'

const INFO_FAQ = [
  {
    question: 'What kinds of legal issues can LegalShield help with?',
    answer: 'LegalShield attorneys can help with a wide range of legal matters — from reviewing contracts and documents to advising on family law, real estate, estate planning, traffic issues, and more. Your plan gives you direct access to a real, licensed attorney.',
  },
  {
    question: 'Is there a limit to how often I can use my plan?',
    answer: 'No. Your LegalShield plan gives you unlimited consultations with your provider law firm. Use it as often as you need — no hourly billing, no surprises.',
  },
  {
    question: 'Can I use LegalShield for business matters?',
    answer: 'Yes. LegalShield offers dedicated Small Business plans that cover contract review, debt collection, IRS audit assistance, and more.',
  },
  {
    question: 'How quickly can I speak to a lawyer?',
    answer: 'Most members are connected with a licensed attorney within hours. For emergency situations, 24/7 emergency access is included in all plans.',
  },
]

const BOTTOM_FAQ = [
  {
    question: 'Is LegalShield a law firm?',
    answer: 'No. LegalShield is a legal services company that connects you with a network of independent provider law firms. You get direct access to licensed attorneys through your membership plan.',
  },
  {
    question: 'What is the difference between LegalShield and hiring a lawyer?',
    answer: 'Hiring an attorney typically costs $200–$500 per hour. LegalShield gives you access to licensed attorneys for a flat monthly fee — so you can get the legal help you need without worrying about the bill.',
  },
  {
    question: 'Can I cancel my membership at any time?',
    answer: 'Yes. LegalShield memberships are month-to-month. You can cancel at any time without penalty.',
  },
  {
    question: 'Is my personal information kept confidential?',
    answer: 'Absolutely. All communications with your provider law firm are protected by attorney-client privilege. Your information is never shared without your consent.',
  },
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

const HOW_IT_WORKS = [
  {
    step: '01',
    heading: 'Select your plan and get started.',
    body: 'Choose the plan that fits your needs. Sign up in minutes — no lengthy forms or legal jargon.',
    img: '/images/homepage/how-it-works/01-step-1.png',
    imgLeft: true,
  },
  {
    step: '02',
    heading: 'We connect you with a lawyer.',
    body: "Get matched with a licensed attorney in your provider law firm — someone who knows your state's laws.",
    img: '/images/homepage/how-it-works/02-step-2.png',
    imgLeft: false,
  },
  {
    step: '03',
    heading: 'Relax while they take care of it.',
    body: 'Your attorney handles the legal work. You stay informed every step of the way — without the hourly bills.',
    img: '/images/homepage/how-it-works/03-step-3.png',
    imgLeft: true,
  },
]

export default function Homepage({ elleCta }) {
  useScrollToHash()
  return (
    <div className={styles.page}>
      <Nav elleCta={elleCta} />
      <main>

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.heroLeft}>
              <h1 className={styles.heroHeadline}>Real lawyers.<br />Unreal prices.</h1>
              <p className={styles.heroBody}>
                Get unlimited access to real, licensed attorneys — for less than a dollar a day. No hourly rates. No surprises.
              </p>
              <button className={styles.heroCta}>Shop plans</button>
            </div>
            <div className={styles.heroRight}>
              <HeroMarquee />
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <section className={styles.stats}>
          <div className={styles.inner}>
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
          </div>
        </section>

        {/* ── ONE SIMPLE LEGAL SOLUTION ── */}
        <section className={styles.infoSection}>
          <div className={styles.inner}>
            <div className={styles.infoLeft}>
              <img
                src="/images/homepage/info/family-of-4.png"
                alt="Family of four"
                className={styles.infoImg}
              />
            </div>
            <div className={styles.infoRight}>
              <h2 className={styles.infoHeading}>One simple legal solution. Zero hourly rates.</h2>
              <Accordion items={INFO_FAQ} />
            </div>
          </div>
        </section>

        {/* ── AWARDS ── */}
        <section className={styles.awards}>
          <div className={styles.inner}>
            <p className={styles.awardsLabel}>Named best overall prepaid legal service 3 years in a row</p>
            <div className={styles.awardsLogos}>
              {AWARDS.map((src, i) => (
                <img key={i} src={src} alt="" className={styles.awardImg} />
              ))}
            </div>
          </div>
        </section>

        {/* ── LOGO CLOUD ── */}
        <section className={styles.logoCloud}>
          <div className={styles.inner}>
            <span className={styles.logoCloudEyebrow}>Featured in</span>
            <div className={styles.logoCloudRow}>
              {LOGOS.map((src, i) => (
                <img key={i} src={src} alt="" className={styles.logoCloudImg} />
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW WE HELP ── */}
        <section className={styles.howWeHelp}>
          <div className={styles.inner}>
            <HowWeHelpCarousel />
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section className={styles.howItWorks}>
          <div className={styles.inner}>
            <h2 className={styles.sectionHeading}>How it works</h2>
            <div className={styles.stepsContainer}>
              {HOW_IT_WORKS.map((step) => (
                <div
                  key={step.step}
                  className={`${styles.step} ${step.imgLeft ? styles.stepImgLeft : styles.stepImgRight}`}
                >
                  <img src={step.img} alt="" className={styles.stepImg} />
                  <div className={styles.stepContent}>
                    <span className={styles.stepNumber}>{step.step}</span>
                    <h3 className={styles.stepHeading}>{step.heading}</h3>
                    <p className={styles.stepBody}>{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIAL ── */}
        <section className={styles.testimonial}>
          <div className={styles.inner}>
            <blockquote className={styles.quote}>
              "LegalShield delivered prompt, reliable service at a rate that's nearly impossible to find today!"
            </blockquote>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="plans" className={styles.pricing}>
          <div className={styles.inner}>
            <h2 className={styles.pricingHeading}>
              Affordable plans for <em>every</em> need.
            </h2>
            <div className={styles.pricingGrid}>
              <div className={styles.pricingCard}>
                <span className={styles.planName}>Personal</span>
                <p className={styles.planDesc}>Legal services on unlimited number of personal legal issues. Legal services provided by attorneys with an average of 22 years of experience.</p>
                <div className={styles.planPrice}>$35<span className={styles.planPer}>+/mo</span></div>
                <button className={styles.planCta}>Shop Plans</button>
              </div>
              <div className={styles.pricingCard}>
                <span className={styles.planName}>Small Business</span>
                <p className={styles.planDesc}>Legal services on business bases, including document review, help collecting debts, on our behalf, and more.</p>
                <div className={styles.planPrice}>$53.95<span className={styles.planPer}>+/mo</span></div>
                <button className={styles.planCta}>Shop Plans</button>
              </div>
              <div className={`${styles.pricingCard} ${styles.pricingCardEnterprise}`}>
                <span className={styles.planName}>Enterprise</span>
                <p className={styles.planDesc}>Legal and identity theft protection benefits designed to give your employees and their families a sense of security.</p>
                <div className={styles.planPriceContact}>Contact for pricing</div>
                <button className={styles.planCtaSecondary}>Learn more</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── BOTTOM FAQ ── */}
        <section className={styles.faqSection}>
          <div className={styles.inner}>
            <div className={styles.faqHeader}>
              <h2 className={styles.faqHeading}>Frequently Asked Questions</h2>
              <button className={styles.helpCenterBtn}>Help Center</button>
            </div>
            <Accordion items={BOTTOM_FAQ} />
          </div>
        </section>

        {/* ── CTA ── */}
        <section className={styles.ctaSection}>
          <div className={styles.inner}>
            <h2 className={styles.ctaHeading}>Ready to get legal help?</h2>
            <button className={styles.ctaBtn}>Shop plans</button>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
