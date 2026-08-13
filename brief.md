# Conversational Elle Freemium — Guide Voice, Form Factor Prototype

Responsive (desktop 1440px + mobile 390px) prototype of a free conversational AI
experience where Elle answers general legal questions and routes prospects toward
LegalShield membership. Built for unmoderated Maze testing and internal demos.

**Concept under test:** Guide voice (Elle as teacher: patient, explanatory,
plain-language) — Decision 2, form factor test. One variable per test: voice,
conversation content, and entry aids are identical across all three form factors.
Only the container changes.

**Status: all 6 phases built, QA'd, and deployed.**
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
| `/maze/full-page` (+ `/chat`) | Full Page form factor |
| `/maze/message-bar` | Floating Message Bar |
| `/maze/chat-widget` | Chat Widget |
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
                              placeholder, gate labels, CTA) +
                              PROVISIONAL_RE_OFFER_ENABLED flag
  engine/
    ConversationEngine.jsx    the conversation UI (identical everywhere)
    useConversation.js        state machine (gate/re-offer/typing/ended)
    MessageBlocks.jsx         block + inline **bold** renderer
    engine.module.css         bubbles, typing dots, gate card, CTAs, composer
    brains/scriptedBrain.js   playback + branch resolution
  pages/
    IndexPage                 "Start demo" per form factor
    ResponsiveHomepage        host homepage (desktop/mobile switch)
    Homepage, mobile/MobileHomepage   pruned host pages
    fullPage/FullPageHost     homepage + nav/menu Elle CTA
    fullPage/FullPageChat     dedicated chat page (760px reading column)
    fullPage/PlansDrawer      handoff drawer over the chat
    messageBar/MessageBarShell    Fin-style floating bar
    chatWidget/ChatWidgetShell    Zendesk-style bubble + panel
    EngineTest                bare-container engine demo
  components/                 inherited homepage components (nav, footer, etc.)
  hooks/                      useIsMobile (768px), useScrollToHash
  wireframe.css               the greyscale skin + hifi accent hook
```

## Conversation flow (User Flow v2 — locked)

Entry (session 1 ungated) → first exchange (greeting: Elle narrates the deal) →
loop → gate offer at turn 2–3 (summary + attorney questions emailed; an offer,
never a toll; accept AND decline visibly continue) → soft heads-up (~2
substantive responses left, inside Turn 9 copy — never a visible counter) →
scope close (+ ONE provisional re-offer if the gate was declined;
`PROVISIONAL_RE_OFFER_ENABLED` in guideScript.js is the one-line removal) →
handoff (single CTA: "Subscribe to speak to a lawyer"). Safety escalation is a
reserved engine state, content pending Trust & Safety, no UI.

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
- The gate is an offer, never a wall. Email input is format-validated only,
  accepted visually, never stored or transmitted (zero network calls, verified).
- Any typed input advances the script (forgiving) — at the gate, email-shaped
  text accepts, anything else declines; empty/whitespace is ignored.
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

**Phase 1 —** Traced imports, removed doc-review pages/CTAs (Nav +
MobileMenuOverlay), cut MobileFunnelSections (doc-review funnel), added
wireframe mode, scaffolded Vite (package.json/index.html/vite.config were
missing from the copy), copied homepage images from the doc-review project,
made the homepage viewport-responsive.

**Phase 2 —** Engine: message list, typing indicator (~1–1.5s), gate with real
accept/decline branches + inline error state, heads-up, scope close, handoff
CTA, provisional re-offer + accept confirmation, disclosure line, opening
greeting. guideScript.js with Leann's verbatim turns. Index route. Live mode was
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

**Phase 6 — QA + deploy.**
- Script QA: 9 automated passes green — all 3 form factors × both gate branches
  at 1440, plus all 3 at 390 (decline path). 27 assertions per decline run / 25
  per accept run: greeting on open, disclosure line, no countdown UI, substantive
  turns, Turn 4 long answer, gate offer, gate card geometry (input spans bubble
  width, chip centered), invalid-email inline error + gate survives, correct
  branch line, conversation continues after gate, verdict refusal, drafting
  refusal + soft heads-up, scope close, handoff, single CTA present / old CTAs
  absent, re-offer matches branch (decline only) + confirmation, composer
  disabled at end, zero network calls.
- Off-script: 12 assertions green — empty and whitespace-only ignored (no
  dead-end, no phantom bubble); emoji, gibberish, markup, a 1,200-char input,
  and on-script text sent out of order all advance; off-script text typed at the
  gate declines and continues.
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
- Turn 11b accept confirmation line
- The single handoff CTA "Subscribe to speak to a lawyer" — **this overrode the
  Turn 11 [LEANN VERBATIM] two-CTA line ("See plans" / "Talk to an attorney").
  Worth reconciling with Leann.**
- All legal content (per the file-top comment) pending Legal review
- The Turn 11b re-offer itself is PROVISIONAL pending Leann

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
