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

Wireframe (greyscale):
- `/maze/full-page`
- `/maze/message-bar`
- `/maze/chat-widget`

Hifi (Stratos DS):
- `/maze/hifi/message-bar` — team-selected direction

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
                        never in components)
  engine/               Conversation engine (UI + state), brain-agnostic
    brains/             scriptedBrain.js — linear playback (gate is a wall)
  hooks/                useIsMobile (768px switch), useScrollToHash
  pages/                Index, EngineTest, host homepage, and one folder per
                        form factor: fullPage/ (host, chat page, PlansDrawer),
                        messageBar/ (shell + HifiMessageBarRoute +
                        ZoomWidgetPlaceholder), chatWidget/
  components/           Inherited homepage components (nav, footer, carousel)
  wireframe.css         Wireframe skin — remove the `wireframe` class in
                        index.html to go hifi (or use `/maze/hifi/*` which
                        toggles it per-route)
```

## Routes

| Route | What it is |
|---|---|
| `/` | Index — "Start demo" per form factor + build tools |
| `/maze/full-page` (+`/chat`) | Full Page (wireframe) |
| `/maze/message-bar` | Floating Message Bar (wireframe) |
| `/maze/chat-widget` | Chat Widget (wireframe) |
| `/maze/hifi/message-bar` | **Floating Message Bar (Stratos DS hifi)** |
| `/maze/engine` | Bare-container engine demo |
| `/homepage` | Pruned host homepage |

The hifi route reuses the same `MessageBarShell` — a wrapper
(`HifiMessageBarRoute`) removes the `wireframe` class from `<html>` while
mounted, so the shared Stratos tokens render in full colour. Navigating away
restores the class. Zero duplication; the engine and script stay shared with the
three greyscale routes.

Old non-maze paths (`/full-page`, `/message-bar`, …) redirect to the `/maze/*`
equivalents.

## Making common changes

| To change… | Edit |
|---|---|
| Any conversation copy (greeting, script turns, CTA, disclosure, placeholder) | `src/data/guideScript.js` — never components |
| Wireframe → hifi | Delete `class="wireframe"` from `index.html` (or use `/maze/hifi/message-bar` which toggles it per-route) |
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
