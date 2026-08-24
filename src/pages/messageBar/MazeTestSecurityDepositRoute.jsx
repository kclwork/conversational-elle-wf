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

import { useCallback, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MessageBarShell from './MessageBarShell.jsx'
import ZoomWidgetPlaceholder from './ZoomWidgetPlaceholder.jsx'

const BASE_PATH = '/maze/test/security-deposit'

export default function MazeTestSecurityDepositRoute() {
  const navigate = useNavigate()

  useLayoutEffect(() => {
    const html = document.documentElement
    const wasWireframe = html.classList.contains('wireframe')
    html.classList.remove('wireframe')
    return () => {
      if (wasWireframe) html.classList.add('wireframe')
    }
  }, [])

  const setStage = useCallback(stage => {
    navigate(`${BASE_PATH}?stage=${stage}`, { replace: true })
  }, [navigate])

  const onGateAccept = useCallback(() => setStage('post-gate'), [setStage])
  const onHandoff = useCallback(() => setStage('done'), [setStage])

  return (
    <>
      <MessageBarShell onGateAccept={onGateAccept} onHandoff={onHandoff} />
      <ZoomWidgetPlaceholder />
    </>
  )
}
