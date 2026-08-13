// The host homepage, viewport-responsive. Decorative and inert except for the
// Elle entry point the active form factor injects (elleCta for Full Page;
// Phases 4–5 overlay their own entry points instead).

import Homepage from './Homepage.jsx'
import MobileHomepage from './mobile/MobileHomepage.jsx'
import useIsMobile from '../hooks/useIsMobile.js'

export default function ResponsiveHomepage({ elleCta }) {
  const isMobile = useIsMobile()
  return isMobile ? <MobileHomepage elleCta={elleCta} /> : <Homepage elleCta={elleCta} />
}
