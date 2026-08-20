// HIFI route wrapper for the Floating Message Bar.
// Reuses MessageBarShell verbatim; the only difference is the skin: while this
// route is mounted, the `wireframe` class is removed from <html>, so the shared
// Stratos DS tokens (design-tokens.css) render in full colour. Navigating away
// restores the class so the greyscale /maze/* routes remain untouched.

import { useLayoutEffect } from 'react'
import MessageBarShell from './MessageBarShell.jsx'
import ZoomWidgetPlaceholder from './ZoomWidgetPlaceholder.jsx'

export default function HifiMessageBarRoute() {
  useLayoutEffect(() => {
    const html = document.documentElement
    const wasWireframe = html.classList.contains('wireframe')
    html.classList.remove('wireframe')
    return () => {
      if (wasWireframe) html.classList.add('wireframe')
    }
  }, [])

  return (
    <>
      <MessageBarShell />
      <ZoomWidgetPlaceholder />
    </>
  )
}
