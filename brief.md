# Conversational Elle Freemium — Guide Voice, Form Factor Prototype

Responsive (desktop 1440px + mobile 390px) prototype of a free conversational AI
experience where Elle answers general legal questions and routes prospects toward
LegalShield membership. Built for unmoderated Maze testing and internal demos.

**Concept under test:** Guide voice (Elle as teacher: patient, explanatory,
plain-language) — Decision 2, form factor test. One variable per test: voice,
conversation content, and entry aids are identical across all three form factors.
Only the container changes.

**Status: Phases 1–9 built and deployed. Phases 1–6 QA'd. Phases 7–9 verified
locally; no formal QA re-run yet (Phase 6's decline-branch assertions no longer
apply — see Phase 8).**
Live: **https://conversational-elle-wf.vercel.app**
Repo: https://github.com/kclwork/conversational-elle-wf

---

## Architecture

- **One engine, one script, three containers.** `src/engine/` owns all
  conversation UI and state; each form factor is a shell that wraps it. The
  shells never modify the engine — the bar and widget restyle the engine's own
  composer via structural CSS and observe it via event capture. This is what
  guarantees the one-variable test.
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
| `/maze/full-page` (+ `/chat`) | Full Page form factor (wireframe) |
| `/maze/message-bar` | Floating Message Bar (wireframe) |
| `/maze/chat-widget` | Chat Widget (wireframe) |
| `/maze/hifi/message-bar` | **Hifi Floating Message Bar (Stratos DS)** — team-selected direction |
| `/maze/engine` | Bare-container engine demo (build tool) |
| `/homepage` | Pruned host homepage (`#plans` = pricing anchor) |

Old non-maze paths redirect to `/maze/*`. Every route is viewport-responsive via
`useIsMobile` (breakpoint 768px) — one URL per variant, no separate mobile URLs.
Maze participants get deep-linked to one form factor.

## Tech stack

- React 18 + Vite 5, plain CSS modules, react-router 6 — static SPA, no server
  code, no environment variables
- Stratos DS tokens (`design-tokens.css`, project root) + `stratos-components.md`
  specs; fonts (ABC Otto, Instrument Rounded — variable) in `public/fonts/`

## File structure

```
brief.md / README.md          this doc + run/deploy instructions
design-tokens.css             Stratos DS tokens (imported by src/index.css)
stratos-components.md         Stratos DS component specs
docs/elle-system-prompt-v0.1.md   Leann's prompt, preserved (live mode removed)
index.html                    <html class="wireframe"> ← the skin toggle
vercel.json                   SPA rewrite (makes /maze/* deep links resolve)
public/fonts, public/images   variable fonts + homepage imagery
src/
  data/guideScript.js         THE script + ALL shared copy (greeting, disclosure,
                              placeholder, gate label, handoff CTA)
  engine/
    ConversationEngine.jsx    the conversation UI (identical everywhere)
    useConversation.js        state machine (gate/typing/ended)
    MessageBlocks.jsx         block + inline **bold** renderer
    engine.module.css         bubbles, typing dots, gate card, CTAs, composer
    brains/scriptedBrain.js   linear playback (gate is a wall since Phase 8)
  pages/
    IndexPage                 "Start demo" per form factor + hifi surface
    ResponsiveHomepage        host homepage (desktop/mobile switch)
    Homepage, mobile/MobileHomepage   pruned host pages
    fullPage/FullPageHost     homepage + nav/menu Elle CTA
    fullPage/FullPageChat     dedicated chat page (760px reading column)
    fullPage/PlansDrawer      handoff drawer over the chat
    messageBar/MessageBarShell        Fin-style floating bar (wireframe route)
    messageBar/HifiMessageBarRoute    wraps the shell for `/maze/hifi/*`; toggles the wireframe class + renders the Zoom widget placeholder
    messageBar/ZoomWidgetPlaceholder  static Zoom/TalkDesk mock (hifi only, non-interactive)
    chatWidget/ChatWidgetShell        Zendesk-style bubble + panel
    EngineTest                bare-container engine demo
  components/                 inherited homepage components (nav, footer, etc.)
  hooks/                      useIsMobile (768px), useScrollToHash
  wireframe.css               greyscale skin + bubble-token pins (keeps the
                              wireframe user/elle bubble pair distinct in
                              wireframe when hifi uses light-purple/warm-100)
```

## Conversation flow (User Flow v2 — locked)

Entry (session 1 ungated) → first exchange (greeting: Elle narrates the deal) →
loop → **email gate (wall) at turn 2–3** (Leann, 2026-08-20: capturing the email
is the point of the interaction; a valid email is required to continue) → soft
heads-up (~2 substantive responses left, inside Turn 9 copy — never a visible
counter) → scope close → handoff (single CTA: "Subscribe to speak to a
lawyer"). Safety escalation is a reserved engine state, content pending Trust
& Safety, no UI.

**Handoff behavior differs by container by design** (the conversation must stay
reachable in all three):
- Full Page → opens PlansDrawer over the chat (chat stays mounted behind).
- Bar / Widget → minimizes and scrolls the host homepage to `#plans` in place;
  clicking the bar or bubble reopens the chat with history intact, even after
  the conversation has ended.

## Key rules

- Everything identical across the three form factors except the container.
  No per-form-factor content, entry aids, or copy differences. No suggestion chips.
- Both viewports in every phase. A form factor is not done until both work.
- No visible countdown or remaining-message indicator anywhere, ever.
- **The gate is a wall** (Leann, 2026-08-20). A valid email is required to
  continue — the decline path and Turn 11b provisional re-offer were removed.
  Email input is format-validated only, accepted visually, never stored or
  transmitted (zero network calls, verified). The main composer is disabled
  while the gate is open so the only way forward is the inline email field.
- Any typed input advances the script (forgiving) EXCEPT at the gate, where a
  valid email is required. Empty/whitespace input is ignored everywhere.
- ALL legal copy is placeholder pending Legal review (comment at top of
  guideScript.js + persistent disclosure line in the chat UI, marked
  PLACEHOLDER PENDING LEGAL).
- All conversation copy lives in `src/data/guideScript.js` — never in components.
- Do not proceed past a phase without Kaitlyn's approval.

## Phase status

| Phase | State |
|---|---|
| 1 — Prune homepage | DONE, approved |
| 2 — Engine + index | DONE, approved (with amendments) |
| 3 — Full Page | BUILT (+ plans drawer amendment) |
| 4 — Floating Message Bar | BUILT (expand-on-focus revision) |
| 5 — Chat Widget | BUILT |
| 6 — Maze readiness + deploy | QA COMPLETE, DEPLOYED |
| 7 — Hifi (Stratos) exposure | Message Bar surfaced at `/maze/hifi/message-bar` |
| 8 — Gate → wall (Leann) | Decline chip + Turn 11b re-offer removed; email required to continue |
| 9 — Hifi polish + Zoom widget | Bubble/AI-badge colour pass, DS-compliant invalid-email state, static Zoom/TalkDesk widget on the hifi route |
| 10 — Wider expanded panel (Leann) | Desktop panel widens 640 → 800 on expand; pill stays 640 |

**Phase 7 — Hifi Stratos DS exposure.** Team selected the Floating Message Bar
as the direction, so we added a hifi surface for it *without touching* the three
greyscale routes. Implementation is deliberately minimal because the architecture
was built for this: the wireframe skin is a single `wireframe` class on `<html>`
(set in index.html) that overrides Stratos color tokens to greys. The new route
`/maze/hifi/message-bar` renders the same `MessageBarShell` wrapped in
`HifiMessageBarRoute` (src/pages/messageBar/HifiMessageBarRoute.jsx), which uses
`useLayoutEffect` to remove the `wireframe` class from `<html>` on mount and
restore it on unmount. Navigating away from the hifi route puts greyscale back
exactly as it was — verified by loading `/maze/message-bar`, `/maze/full-page`,
and `/maze/chat-widget` after visiting the hifi route and confirming they render
in greyscale.

Zero duplication: the engine, script, gate logic, mobile behavior, and shell
component are shared. Any future copy or logic change in `guideScript.js` or
`src/engine/*` updates greyscale and hifi in lockstep. IndexPage was split into
two labeled sections — "Wireframe (greyscale)" (three form factors) and
"Hifi (Stratos)" (Floating Message Bar) — so stakeholders can be sent the
correct link.

Files touched: `src/App.jsx` (one new route), `src/pages/IndexPage.jsx` +
`.module.css` (section labels + hifi card), `src/pages/messageBar/HifiMessageBarRoute.jsx` (new).

**Phase 8 — Gate becomes a wall (Leann, 2026-08-20).** The purpose of the chat
interaction is to capture the user's email, so the "No thanks, keep it in the
chat" decline chip was removed and a valid email is now required to continue
past Turn 4. The Turn 11b provisional re-offer was removed with it — it only
ever played on the decline path. This change lives in the shared engine + shared
script, so it applies to all four routes (three greyscale + one hifi) — a
project-level PM decision, not a per-form-factor one.

What changed in code:
- `guideScript.js`: removed `GATE_DECLINE_LABEL` and `PROVISIONAL_RE_OFFER_ENABLED`;
  flattened Turn 5's `gateAccepted` / `gateDeclined` branches into a single
  post-gate response; removed Turn 11b entirely.
- `useConversation.js`: removed `declineGate`, `reOfferOpen` state, and the
  `gateDecline` action; `sendText` now no-ops while the gate is open.
- `scriptedBrain.js`: removed `gateDecline` handling, the branch resolver, the
  provisional-turn skipping logic, and the `gateChoice`/`reOffer` state.
- `ConversationEngine.jsx`: removed the decline button from the gate card;
  disabled the main composer while the gate is open (so the inline email field
  is the only way forward).
- `engine.module.css`: removed the unused `.gateDecline` style.

QA implication: Phase 6's decline-branch assertions no longer apply and will
need to be removed if/when the QA suite is re-run — the 3 accept-path passes
still hold. Nothing else in the script changed.

**Phase 9 — Hifi polish + Zoom widget coexistence.** Four visual/interaction
refinements on the hifi surface:

1. **Chat bubble colours.** Elle bubble → `--color-neutral-warm-100` (#F4F2F0);
   user bubble → `--color-primary-light-purple` (#EEF1FF) with `gray-900` text
   (flipped from the previous dark bubble + white text). Contrast: 12.2:1 and
   12.1:1 respectively (WCAG AAA). To keep the greyscale routes visually
   distinct — a light-purple user bubble becomes gray-400 in wireframe and
   would collapse into the light Elle bubble — the change is wired through
   NEW `--color-bubble-elle-bg / -text` and `--color-bubble-user-bg / -text`
   tokens (design-tokens.css); wireframe.css overrides them back to the
   original dark-user / light-elle pair. Engine.module.css consumes the tokens
   directly.
2. **AI badge (Message Bar header).** Background → light-purple, text →
   `--color-accent-primary-text`. 5.8:1 contrast (WCAG AA at 12px). Wireframe
   inherits the greys automatically.
3. **Invalid-email state now renders our own design-system error** (thin red
   border + `ⓘ Please enter a valid email address` in `--color-status-error`)
   instead of the browser's native tooltip. Fix: `noValidate` on the gate form
   so our regex is the only validator that runs — matches Kaitlyn's DS
   reference exactly. Applies to all routes (shared engine), but wireframe
   naturally renders the red border as grey via token overrides.
4. **Static Zoom / TalkDesk widget placeholder** in the bottom-right corner —
   the LegalShield production customer-service widget, mocked in so
   stakeholders can see how the two entry points coexist on the page.
   `ZoomWidgetPlaceholder.jsx` (~56px dark-purple circle with a white
   chat-bubble SVG), `pointer-events: none`, `z-index: 85`. **Hifi route
   only** — rendered directly in `HifiMessageBarRoute` alongside
   `MessageBarShell`, not in the shell itself, so it doesn't appear on the
   three greyscale routes. Desktop: `bottom: 24px, right: 24px` (matches
   production). Mobile (< 768px): `bottom: 108px, right: 16px` — nudged above
   the floating pill so both entry points remain visible and tappable rather
   than colliding (Kaitlyn's call: design a real solution, don't just expose
   the problem). When the mobile chat sheet opens (`z-index: 120`) the widget
   disappears behind it, which is the correct production behavior.

Files touched:
- `design-tokens.css` — new bubble token block
- `src/wireframe.css` — pin bubble tokens to greyscale values
- `src/engine/engine.module.css` — bubbles reference the new tokens
- `src/engine/ConversationEngine.jsx` — `noValidate` on the gate form
- `src/pages/messageBar/MessageBarShell.module.css` — AI badge colour swap
- `src/pages/messageBar/ZoomWidgetPlaceholder.jsx` + `.module.css` — NEW
- `src/pages/messageBar/HifiMessageBarRoute.jsx` — renders the placeholder

**Phase 10 — Wider expanded panel (Leann, 2026-08-20).** Long Elle responses
were feeling cramped in the desktop panel. Widened the panel from 640 → 800px
when expanded (measured against the same Colorado deposit script — Turn 2's
wear-and-tear explanation), keeping the resting composer pill at 640px so the
bar itself doesn't change shape. Done in `MessageBarShell.module.css`: `.dock`
gains a 240ms width transition; `.dock.expanded` under `min-width: 768px`
widens to `min(800px, calc(100vw - 32px))`; the composer area
(`.expanded .engineStack > div > div:last-child`) is pinned to `width: 640px;
align-self: center` on desktop so the pill stays 640 centered inside the wider
dock. Mobile untouched (still `100vw × 100dvh` sheet). Applies to both the
wireframe and hifi message-bar routes — same shell.

**Phase 1 —** Traced imports, removed doc-review pages/CTAs (Nav +
MobileMenuOverlay), cut MobileFunnelSections (doc-review funnel), added
wireframe mode, scaffolded Vite (package.json/index.html/vite.config were
missing from the copy), copied homepage images from the doc-review project,
made the homepage viewport-responsive.

**Phase 2 —** Engine: message list, typing indicator (~1–1.5s), gate with
accept/decline branches + inline error state (both decline path and the
provisional re-offer were later removed in Phase 8 — the gate is now a wall),
heads-up, scope close, handoff CTA, disclosure line, opening greeting.
guideScript.js with Leann's verbatim turns. Index route. Live mode was
originally built here (serverless `/api/chat` + Leann's prompt + turn-budget
injection) and later removed — see Architecture.

**Phase 3 — Full Page.** Host = homepage with "Ask Elle a legal question [AI]"
in the nav (desktop) / hamburger menu (mobile) — the slot the doc-review CTA
occupied. CTA → `/maze/full-page/chat`: minimal LegalShield header + back link,
760px centered reading column (full-canvas on mobile). **Amendment:** the
handoff CTA originally navigated to `/homepage#plans`, which abandoned the
conversation; replaced with PlansDrawer (desktop right drawer 480px, mobile full
sheet) showing Personal & Family + Small Business (Enterprise removed per
Kaitlyn), closable via X / scrim / Esc / "Back to your conversation".

**Phase 4 — Floating Message Bar.** Kaitlyn-approved: **expand on focus**
(clicking into the bar opens the panel with Elle's greeting — revised from
expand-on-send after Kaitlyn tested and found the greeting was missed; clicking
away with nothing typed quietly dismisses; once anything is typed/sent the panel
persists), internal scroll for long answers (panel ≈640px × 60vh, frosted
`--color-opacity-light-85` + blur), mobile = full-screen 100dvh sheet. Minimize
via chevron/Esc; the engine stays mounted so the conversation persists.

**Phase 5 — Chat Widget.** Kaitlyn-approved: internal scroll for long answers
(panel ≈420px × 70vh — the deliberately tight canvas this form factor tests),
mobile = full-screen 100dvh sheet (consistent with the bar). Launcher bubble
bottom-right (morphs to a chevron while open); slim Elle header + minimize;
engine's own composer + disclosure inside the panel per the references.

**Phase 6 — QA + deploy** (historical — several assertions were invalidated by
Phase 8's "gate becomes a wall" change; the ACCEPT-path passes still hold, the
decline-path and re-offer assertions no longer apply).
- Script QA (as of 2026-08-13): 9 automated passes green — all 3 form factors ×
  both gate branches at 1440, plus all 3 at 390 (decline path). 27 assertions
  per decline run / 25 per accept run: greeting on open, disclosure line, no
  countdown UI, substantive turns, Turn 4 long answer, gate offer, gate card
  geometry, invalid-email inline error + gate survives, correct branch line,
  conversation continues after gate, verdict refusal, drafting refusal + soft
  heads-up, scope close, handoff, single CTA present / old CTAs absent,
  re-offer matches branch (decline only) + confirmation, composer disabled at
  end, zero network calls.
- Off-script (as of 2026-08-13): 12 assertions green — empty and
  whitespace-only ignored (no dead-end, no phantom bubble); emoji, gibberish,
  markup, a 1,200-char input, and on-script text sent out of order all
  advance; off-script text typed at the gate declines and continues (this
  last case no longer applies — decline path removed in Phase 8; gate now
  holds until a valid email is submitted).
- Production verification (2026-08-13, live Vercel build): all three `/maze/*`
  deep links resolve cold via the SPA rewrite; zero failed resources; both
  variable fonts load; wireframe class intact. Full scripted pass on Full Page
  (15/15); bar expands on focus with greeting; widget runs to handoff, CTA
  minimizes + scrolls to `#plans`, chat revisitable afterward with history
  intact; mobile 390 widget opens as a true 100dvh sheet with scroll locked.

---

## Open items for next session

**Kaitlyn's decisions (parked):**
1. **Full Page CTA copy** — "Ask Elle a legal question" + AI badge is Claude's
   placeholder wording.
2. **Full Page mobile discoverability** — the entry point currently lives only
   inside the hamburger menu (mirrors the old doc-review pattern). This is a
   harsher findability test than desktop; a visible on-page entry is TBD and
   would materially affect that form factor's Maze results.

**Copy pending review (all marked placeholder in code):**
- Elle's opening greeting (`OPENING_MESSAGE` in guideScript.js)
- The single handoff CTA "Subscribe to speak to a lawyer" — **this overrode the
  Turn 11 [LEANN VERBATIM] two-CTA line ("See plans" / "Talk to an attorney").
  Worth reconciling with Leann.**
- All legal content (per the file-top comment) pending Legal review

**Open items added this session (2026-08-20):**
- Phase 6 QA re-run against the wall gate (accept-only path, no decline
  assertions, no re-offer). See the note in Phase 6.
- If the Zoom/TalkDesk widget's exact production hex or icon asset is available,
  swap into `ZoomWidgetPlaceholder` — currently using `#2C1178` and an inline
  chat-bubble SVG (eyeballed from Kaitlyn's reference).

**Verification Claude can't do:**
- Real-phone pass on the three `/maze/*` links (iOS Safari dynamic viewport vs.
  the 100dvh sheets, on-screen keyboard with the composer, real touch targets).

**Not built (out of scope, do not contradict):**
- Returning visit / new matter email gate before session 2.
- Safety escalation UI (engine state reserved; content pending Trust & Safety).

## References

`references/` holds annotated screenshots: the canonical user flow, the Intercom
Fin series (Message Bar craft benchmark — the state transitions are the soul of
that form factor), chat-widget active/expanded (Zendesk pattern), and
fullpage-chat. References are for structure/interaction/craft — all styling comes
from Stratos DS tokens.
