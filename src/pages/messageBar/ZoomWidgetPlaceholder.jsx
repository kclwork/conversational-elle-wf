// Static, non-interactive placeholder for the Zoom / TalkDesk customer-service
// widget that lives bottom-right on the LegalShield production site. Included
// on the hifi Floating Message Bar route only, so stakeholders can see how the
// two entry points coexist on the page. NOT clickable; NOT connected to
// anything. Position matches production (bottom-right, ~24px inset). On mobile
// this deliberately shows the collision with the floating message bar — that
// coexistence is exactly what the mockup needs to expose.

import styles from './ZoomWidgetPlaceholder.module.css'

export default function ZoomWidgetPlaceholder() {
  return (
    <div
      className={styles.widget}
      aria-hidden="true"
      title="Zoom / TalkDesk widget (placeholder — not interactive)"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v9a2.5 2.5 0 0 1-2.5 2.5H10l-4 4v-4h-.5A1.5 1.5 0 0 1 4 15.5v-10Z"
          fill="#ffffff"
        />
        <rect x="8" y="8" width="8" height="1.5" rx="0.75" fill="#2C1178" />
        <rect x="8" y="11" width="6" height="1.5" rx="0.75" fill="#2C1178" />
      </svg>
    </div>
  )
}
