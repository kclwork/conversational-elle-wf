// FORM FACTOR 1 — Full Page, host view.
// The real homepage with the Elle entry point in the nav (desktop) / menu
// (mobile). Clicking it navigates to the dedicated conversation page.

import { useNavigate } from 'react-router-dom'
import ResponsiveHomepage from '../ResponsiveHomepage.jsx'

export default function FullPageHost({ basePath }) {
  const navigate = useNavigate()

  return (
    <ResponsiveHomepage
      elleCta={{
        label: 'Ask Elle a legal question',
        onClick: () => navigate(`${basePath}/chat`),
      }}
    />
  )
}
