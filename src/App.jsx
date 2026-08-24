import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import IndexPage from './pages/IndexPage.jsx'
import EngineTest from './pages/EngineTest.jsx'
import ResponsiveHomepage from './pages/ResponsiveHomepage.jsx'
import FullPageHost from './pages/fullPage/FullPageHost.jsx'
import FullPageChat from './pages/fullPage/FullPageChat.jsx'
import MessageBarShell from './pages/messageBar/MessageBarShell.jsx'
import HifiMessageBarRoute from './pages/messageBar/HifiMessageBarRoute.jsx'
import MazeTestSecurityDepositRoute from './pages/messageBar/MazeTestSecurityDepositRoute.jsx'
import ChatWidgetShell from './pages/chatWidget/ChatWidgetShell.jsx'

// Route plan — scripted (Maze) mode only; live mode was removed (no API access).
//   /                    → index linking the three form factor demos
//   /maze/full-page      → Full Page (homepage CTA → dedicated chat page)
//   /maze/message-bar    → Floating Message Bar (Fin-style)
//   /maze/chat-widget    → Chat Widget (Phase 5)
//   /maze/engine         → bare-container engine demo (build tool)
//   /homepage            → pruned host homepage (viewport-responsive)
// Old non-maze paths redirect so nothing 404s.

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/homepage" element={<ResponsiveHomepage />} />

        {/* Build tool: bare-container engine demo */}
        <Route path="/maze/engine" element={<EngineTest />} />

        {/* Form factor 1 — Full Page */}
        <Route path="/maze/full-page" element={<FullPageHost basePath="/maze/full-page" />} />
        <Route path="/maze/full-page/chat" element={<FullPageChat basePath="/maze/full-page" />} />

        {/* Form factor 2 — Floating Message Bar */}
        <Route path="/maze/message-bar" element={<MessageBarShell />} />

        {/* Hifi (Stratos DS) — Floating Message Bar. Same shell, wireframe skin
            disabled while this route is mounted. */}
        <Route path="/maze/hifi/message-bar" element={<HifiMessageBarRoute />} />

        {/* Maze usability-test route — hifi Message Bar wrapped with silent
            URL updates at gate-accept and handoff-CTA moments. Additive; does
            not modify /maze/hifi/message-bar. */}
        <Route path="/maze/test/security-deposit" element={<MazeTestSecurityDepositRoute />} />

        {/* Form factor 3 — Chat Widget */}
        <Route path="/maze/chat-widget" element={<ChatWidgetShell />} />

        {/* Legacy live-mode paths → scripted equivalents */}
        <Route path="/engine" element={<Navigate to="/maze/engine" replace />} />
        <Route path="/full-page" element={<Navigate to="/maze/full-page" replace />} />
        <Route path="/full-page/chat" element={<Navigate to="/maze/full-page/chat" replace />} />
        <Route path="/message-bar" element={<Navigate to="/maze/message-bar" replace />} />
        <Route path="/chat-widget" element={<Navigate to="/maze/chat-widget" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
