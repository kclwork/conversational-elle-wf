# Conversational Elle Freemium — Guide Voice Prototype

Form factor test (Full Page / Floating Message Bar / Chat Widget) for a free
conversational Elle experience. Scripted (Maze) mode only — the conversation is
pre-authored; no API keys, no network calls. See [brief.md](brief.md) for the
concept, flow, rules, and phase status — **update brief.md at the end of every
working session** so the next session starts with current state.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173 — the index page has a "Start demo" button per form
factor. No environment variables needed.

## Deployed

**https://conversational-elle-wf.vercel.app** — Maze deep links:

- `/maze/full-page`
- `/maze/message-bar`
- `/maze/chat-widget`

Pushing to `main` triggers a redeploy. No environment variables; `vercel.json`
rewrites all paths to `index.html` so the deep links resolve.

## File structure

```
design-tokens.css       Stratos DS tokens (imported by src/index.css)
stratos-components.md   Stratos DS component specs
docs/                   elle-system-prompt-v0.1.md — Leann's prompt, preserved
                        as reference (live mode was removed from the prototype)
public/fonts/           ABC Otto + Instrument Rounded (variable fonts)
public/images/          Homepage imagery
src/
  data/guideScript.js   THE Maze script + all shared copy (edit copy here,
                        never in components); PROVISIONAL_RE_OFFER_ENABLED flag
  engine/               Conversation engine (UI + state), brain-agnostic
    brains/             scriptedBrain.js (a live brain can return behind the
                        same interface if ever needed)
  hooks/                useIsMobile (768px switch), useScrollToHash
  pages/                Index, EngineTest, host homepage, and one folder per
                        form factor: fullPage/ (host, chat page, PlansDrawer),
                        messageBar/, chatWidget/
  components/           Inherited homepage components (nav, footer, carousel)
  wireframe.css         Wireframe skin — remove the `wireframe` class in
                        index.html to go hifi
```

## Routes

| Route | What it is |
|---|---|
| `/` | Index — "Start demo" per form factor + build tools |
| `/maze/full-page` (+`/chat`) | Full Page form factor |
| `/maze/message-bar` | Floating Message Bar |
| `/maze/chat-widget` | Chat Widget |
| `/maze/engine` | Bare-container engine demo |
| `/homepage` | Pruned host homepage |

Old non-maze paths (`/full-page`, `/message-bar`, …) redirect to the `/maze/*`
equivalents.

## Making common changes

| To change… | Edit |
|---|---|
| Any conversation copy (greeting, script turns, CTA, disclosure, placeholder) | `src/data/guideScript.js` — never components |
| Wireframe → hifi | Delete `class="wireframe"` from `index.html` |
| Remove the provisional Turn 11b re-offer | `PROVISIONAL_RE_OFFER_ENABLED = false` in `guideScript.js` |
| Anything shared by all three form factors (bubbles, gate card, typing, composer) | `src/engine/` — changes apply everywhere by design |
| One form factor's container only | its folder under `src/pages/` |

The engine is deliberately shared: the form factors differ *only* by container,
which is what keeps the test to one variable. Resist adding a feature to one
shell that the others don't have.

## Session workflow (between Claude Code sessions)

- brief.md is the source of truth: phase status, decisions and deviations, open
  questions, what's left. Update it (and this README if anything structural
  changed) before ending a session; commit and push.
- Legal copy is placeholder pending Legal review — see the note at the top of
  `guideScript.js` and the open items in brief.md.
