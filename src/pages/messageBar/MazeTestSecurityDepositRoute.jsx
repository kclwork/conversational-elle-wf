// MAZE TEST route — /maze/test/security-deposit
//
// Isolated wrapper for the hifi Floating Message Bar experience, used by a
// Maze usability test that needs URL-based mission tracking. It renders the
// SAME MessageBarShell and ZoomWidgetPlaceholder used by /maze/hifi/message-bar
// (imported, not duplicated) and adds silent URL updates at two moments so
// Maze can detect mission completion:
//
//   • email accepted at the gate   →  ?stage=post-gate
//   • Elle's handoff CTA is clicked →  ?stage=done
//
// Both use react-router's navigate({ replace: true }) — no reload, no history
// entry, no visible change. This route is additive; nothing under
// /maze/hifi/message-bar or the wireframe routes is affected.
//
// Same hifi skin toggle as HifiMessageBarRoute: remove the `wireframe` class
// from <html> while mounted, restore it on unmount.

import { useCallback, useEffect, useLayoutEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MessageBarShell from './MessageBarShell.jsx'
import ZoomWidgetPlaceholder from './ZoomWidgetPlaceholder.jsx'
import { buildResumeState } from './mazeTestResume.js'

const BASE_PATH = '/maze/test/security-deposit'

// Maze Live Website tracking snippet. Verbatim from Maze — injected only when
// this route is mounted, and removed on unmount so no other route (the hifi
// route, wireframe routes, or anything else) loads it.
const MAZE_SNIPPET_ATTR = 'data-maze-snippet'
const MAZE_LOADER_HOST = 'snippet.maze.co'
const MAZE_SNIPPET_SRC = `<script>
(function (m, a, z, e) {
  var s, t, u, v;
  try {
    t = m.sessionStorage.getItem('maze-us');
  } catch (err) {}

  if (!t) {
    t = new Date().getTime();
    try {
      m.sessionStorage.setItem('maze-us', t);
    } catch (err) {}
  }

  u = document.currentScript || (function () {
    var w = document.getElementsByTagName('script');
    return w[w.length - 1];
  })();
  v = u && u.nonce;

  s = a.createElement('script');
  s.src = z + '?apiKey=' + e;
  s.async = true;
  if (v) s.setAttribute('nonce', v);
  a.getElementsByTagName('head')[0].appendChild(s);
  m.mazeUniversalSnippetApiKey = e;
})(window, document, 'https://${MAZE_LOADER_HOST}/maze-universal-loader.js', 'ecf39d61-ac55-46b3-a1a3-722d2238c5aa');
</script>`

export default function MazeTestSecurityDepositRoute() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // Resume state is captured once at first render — Maze reloads the URL
  // between missions, so the stage on mount is the source of truth. Later
  // in-session URL updates (post-gate → done via onGateAccept / onHandoff)
  // must NOT re-seed the chat and wipe the participant's live state.
  const initialStage = useMemo(() => searchParams.get('stage'), []) // eslint-disable-line react-hooks/exhaustive-deps
  const resume = useMemo(() => buildResumeState(initialStage) || {}, [initialStage])

  useLayoutEffect(() => {
    const html = document.documentElement
    const wasWireframe = html.classList.contains('wireframe')
    html.classList.remove('wireframe')
    return () => {
      if (wasWireframe) html.classList.add('wireframe')
    }
  }, [])

  // Inject the Maze snippet on mount, remove on unmount. Guarded by a data
  // attribute so StrictMode's double-mount in dev doesn't double-inject.
  useEffect(() => {
    if (document.querySelector(`script[${MAZE_SNIPPET_ATTR}]`)) return

    // Extract the IIFE body from the <script>…</script> wrapper so we can set
    // it as textContent on a real element — this makes document.currentScript
    // resolve to our node when the browser executes it.
    const inline = MAZE_SNIPPET_SRC.replace(/^<script>|<\/script>$/g, '').trim()

    const el = document.createElement('script')
    el.setAttribute(MAZE_SNIPPET_ATTR, '')
    el.textContent = inline
    document.head.appendChild(el)

    return () => {
      // Remove our inline snippet, the loader it appended, and the global it set —
      // so navigating away leaves no Maze surface on any other route.
      document.querySelectorAll(`script[${MAZE_SNIPPET_ATTR}]`).forEach(n => n.remove())
      document
        .querySelectorAll(`script[src*="${MAZE_LOADER_HOST}"]`)
        .forEach(n => n.remove())
      try { delete window.mazeUniversalSnippetApiKey } catch (_) {}
    }
  }, [])

  const setStage = useCallback(stage => {
    navigate(`${BASE_PATH}?stage=${stage}`, { replace: true })
  }, [navigate])

  const onGateAccept = useCallback(() => setStage('post-gate'), [setStage])
  const onHandoff = useCallback(() => setStage('done'), [setStage])

  // For a fresh load at ?stage=done, mirror the natural post-CTA scroll —
  // the participant should see the pricing section below the collapsed pill.
  useEffect(() => {
    if (initialStage !== 'done') return
    const scrollToPlans = behavior =>
      document.getElementById('plans')?.scrollIntoView({ behavior, block: 'start' })
    const t1 = setTimeout(() => scrollToPlans('auto'), 100)
    const t2 = setTimeout(() => {
      const el = document.getElementById('plans')
      if (el && Math.abs(el.getBoundingClientRect().top) > 80) scrollToPlans('auto')
    }, 800)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [initialStage])

  return (
    <>
      <MessageBarShell
        onGateAccept={onGateAccept}
        onHandoff={onHandoff}
        {...resume}
      />
      <ZoomWidgetPlaceholder />
    </>
  )
}
