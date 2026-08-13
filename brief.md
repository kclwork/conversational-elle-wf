# Conversational Elle Freemium — Guide Voice, Form Factor Prototype

Responsive (desktop 1440px + mobile 390px) prototype of a free conversational AI
experience where Elle answers general legal questions and routes prospects toward
LegalShield membership. Built for unmoderated Maze testing and internal demos.

**Concept under test:** Guide voice (Elle as teacher: patient, explanatory,
plain-language) — Decision 2, form factor test. One variable per test: voice,
conversation content, and entry aids are identical across all three form factors.
Only the container changes.

## Architecture

- **Brain:** scripted mode only (pre-authored Maze conversation). LIVE MODE WAS
  REMOVED (2026-08-12, Kaitlyn: no Anthropic API access, no key coming) — a
  deliberate deviation from the master prompt's two-brain plan. The engine still
  talks to a swappable brain interface (`brains/scriptedBrain.js`), so a live/API
  brain can return behind it; Leann's System Prompt v0.1 is preserved verbatim in
  `docs/elle-system-prompt-v0.1.md`. No API keys, no network calls anywhere.
- **Skins:** wireframe mode (full greyscale, default ON via the `wireframe` class
  on `<html>` in index.html) and hifi (remove that one class). Wireframe is
  implemented as token overrides + a grayscale filter on media only (a root
  `filter` would break `position: fixed` for the message bar / widget bubble).

## Routes

| Route | What it is |
|---|---|
| `/` | Index — "Start demo" per form factor + build tools |
| `/homepage` | Pruned host homepage, viewport-responsive (`#plans` = pricing anchor) |
| `/maze/full-page` (+`/chat`) | Full Page form factor (Phase 3) |
| `/maze/message-bar` | Floating Message Bar (Phase 4) |
| `/maze/chat-widget` | Chat Widget (Phase 5) |
| `/maze/engine` | Bare-container engine demo |

Old non-maze paths redirect to `/maze/*`. Every route is viewport-responsive via
`useIsMobile` (breakpoint 768px) — one URL per variant, no separate mobile URLs.
Maze participants get deep-linked to one form factor.

## Tech stack

- React 18 + Vite 5, plain CSS modules, react-router 6 — static SPA, no server
  code, no environment variables
- Stratos DS tokens (`design-tokens.css`, project root) + `stratos-components.md`
  specs; fonts (ABC Otto, Instrument Rounded — variable) in `public/fonts/`

## Conversation flow (User Flow v2 — locked)

Entry (session 1 ungated) → first exchange (Elle narrates the deal) → loop →
gate offer at turn 2–3 (summary + attorney questions emailed; an offer, never a
toll; accept AND decline visibly continue) → soft heads-up (~2 substantive
responses left, inside Turn 9 copy — never a visible counter) → scope close
(+ ONE provisional re-offer if gate was declined; `PROVISIONAL_RE_OFFER_ENABLED`
in guideScript.js is the one-line removal) → handoff (See plans / Talk to an
attorney → homepage `#plans`). Safety escalation is a reserved engine state,
content pending Trust & Safety, no UI.

## Key rules

- Everything identical across the three form factors except the container.
  No per-form-factor content, entry aids, or copy differences. No suggestion chips.
- Both viewports in every phase. A form factor is not done until both work.
- No visible countdown or remaining-message indicator anywhere, ever.
- The gate is an offer, never a wall. Scripted-mode email input is format-validated
  only, accepted visually, never stored or transmitted.
- Any typed input advances the script (forgiving) — at the gate, email-shaped text
  accepts, anything else declines.
- ALL legal copy is placeholder pending Legal review (comment at top of
  guideScript.js + persistent disclosure line in the chat UI, marked
  PLACEHOLDER PENDING LEGAL).
- Long structured answers (Turn 4) must render well in every form factor; propose
  long-answer + transition + mobile approaches before building Phases 4–5.
- Do not proceed past a phase without Kaitlyn's approval.

## Phase plan & status

- **Phase 1 — Prune the homepage: DONE.** Traced imports, removed doc-review pages
  /CTAs (Nav + MobileMenuOverlay), cut MobileFunnelSections (doc-review funnel),
  added wireframe mode, scaffolded Vite (package.json/index.html/vite.config were
  missing from the copy), copied homepage images from the doc-review project,
  made `/homepage` viewport-responsive. Approved.
- **Phase 2 — Conversation engine + index route: DONE.** Engine (message list,
  typing indicator ~1–1.5s, gate with real accept/decline branches + inline error
  state, heads-up, scope close, live handoff CTAs → `/homepage#plans`, provisional
  re-offer + accept confirmation, disclosure line, opening greeting), both brains,
  guideScript.js (Leann verbatim turns), index route. Approved with amendments
  (greeting, working handoff CTAs, 11b confirmation — all placeholder copy
  pending review). Live mode was originally built here (serverless `/api/chat` +
  Leann's prompt + turn-budget injection) and later removed — see Architecture.
- **Phase 3 — Full Page** (`/full-page`, `/maze/full-page`): BUILT, PENDING
  APPROVAL. Host = homepage with "Ask Elle a legal question [AI]" in the nav
  (desktop) / hamburger menu (mobile) — the slot the doc-review CTA occupied.
  CTA → `<base>/chat`: minimal LegalShield header + back link, 760px centered
  reading column (full-canvas on mobile), engine unchanged.
- **Phase 4 — Floating Message Bar**: BUILT, PENDING APPROVAL. Kaitlyn-approved
  decisions: **expand on focus** (clicking into the bar opens the panel with
  Elle's greeting — revised from expand-on-send after Kaitlyn tested and found
  the greeting was missed; clicking away with nothing typed quietly dismisses;
  once anything is typed/sent the panel persists), internal scroll for long
  answers (panel ≈640px × 60vh, frosted `--color-opacity-light-85` + blur),
  mobile = full-screen 100dvh sheet. Minimize via chevron/Esc; engine stays
  mounted so the conversation persists; focusing the bar re-expands. Handoff
  CTAs minimize + scroll the host homepage to #plans IN PLACE (no navigation —
  chat stays accessible). Engine untouched — the shell restyles the engine's
  composer into the pill via structural CSS and observes via event capture.
- **Phase 5 — Chat Widget**: BUILT, PENDING APPROVAL. Kaitlyn-approved
  decisions: internal scroll for long answers (panel ≈420px × 70vh, the
  deliberately tight canvas), mobile = full-screen 100dvh sheet (consistent
  with the bar). Launcher bubble bottom-right (morphs to a chevron while open);
  panel per the Mailchimp/Airtable references: slim Elle header + minimize,
  engine's own composer + disclosure inside the panel. Engine stays mounted
  (display-toggled), so the conversation persists across minimize and stays
  revisitable after it ends. Handoff CTA minimizes + scrolls host page to
  #plans (same pattern as the bar). Esc minimizes; body scroll locks behind
  the mobile sheet.
- **Phase 6 — Maze readiness + deploy**: full script QA on all three /maze/*
  routes both viewports, off-script never dead-ends, deploy to Vercel, verify
  deep links on a real phone. NOT STARTED.

## Open questions (parked, revisit with Kaitlyn)

- Full Page CTA copy: "Ask Elle a legal question" + AI badge is placeholder wording.
- Full Page mobile discoverability: entry point currently lives only inside the
  hamburger menu (mirrors the old doc-review pattern) — visible on-page entry TBD.
- ~~Full Page handoff~~ RESOLVED: plans drawer built (PlansDrawer.jsx) — the
  handoff CTA opens a slide-over on top of the chat (desktop right drawer 480px,
  mobile full sheet) with the homepage pricing cards; chat stays mounted behind;
  close via X / scrim / Esc / "Back to your conversation". Kaitlyn reviewing.
- Handoff is now ONE CTA everywhere (per Kaitlyn): "Subscribe to speak to a
  lawyer" (primary), replacing "See plans" + "Talk to an attorney" — the Turn 11
  [LEANN VERBATIM] CTA labels were overridden by this decision.
- Bar (and widget, Phase 5): CTA minimizes + scrolls host page to #plans in
  place; clicking/tapping the bar re-opens the chat history even after the
  conversation has ended (disabled composer gets pointer-events:none so the
  click reaches the shell) — chat stays revisitable all session.

## References

`references/` holds annotated screenshots: the canonical user flow, the
Intercom Fin series (Message Bar craft benchmark — the state transitions are the
soul of that form factor), chat-widget-active/expanded (Zendesk pattern), and
fullpage-chat. References are for structure/interaction/craft — all styling
comes from Stratos DS tokens.

## Repo

https://github.com/kclwork/conversational-elle-wf.git
(git not yet initialized/pushed — confirm `.env` is gitignored before first commit)
