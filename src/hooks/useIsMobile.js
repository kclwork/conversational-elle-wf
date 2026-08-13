import { useEffect, useState } from 'react'

// Single source of truth for the mobile/desktop switch.
// Every route (homepage host, form factors, /maze/* deep links) uses this,
// so one URL works on any device — no separate mobile URLs.
const MOBILE_QUERY = '(max-width: 767px)'

export default function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(MOBILE_QUERY).matches)

  useEffect(() => {
    const mql = window.matchMedia(MOBILE_QUERY)
    const onChange = e => setIsMobile(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isMobile
}
