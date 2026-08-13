import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Scrolls to the element matching the URL hash (e.g. /homepage#plans from the
// handoff CTAs). Re-anchors a couple of times after mount because images
// loading above the target shift the layout and strand the first scroll.
export default function useScrollToHash() {
  const { hash } = useLocation()

  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const scrollTo = behavior => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior, block: 'start' })
    }

    scrollTo('smooth')
    const t1 = setTimeout(() => scrollTo('auto'), 600)
    const t2 = setTimeout(() => scrollTo('auto'), 1400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [hash])
}
