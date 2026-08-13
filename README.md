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
  pages/                Index, EngineTest, host homepage, fullPage/, messageBar/
  wireframe.css         Wireframe skin — remove the `wireframe` class in
                        index.html to go hifi
```

## Routes

| Route | What it is |
|---|---|
| `/` | Index — "Start demo" per form factor + build tools |
| `/maze/full-page` (+`/chat`) | Full Page form factor |
| `/maze/message-bar` | Floating Message Bar |
| `/maze/chat-widget` | Chat Widget (Phase 5) |
| `/maze/engine` | Bare-container engine demo |
| `/homepage` | Pruned host homepage |

Old non-maze paths (`/full-page`, `/message-bar`, …) redirect to the `/maze/*`
equivalents.

## Session workflow (between Claude Code sessions)

- brief.md is the source of truth: phases complete, deviations, what's left.
  Update it (and this README if anything structural changed) before ending a
  session; commit and push.
- Wireframe → hifi is one change: delete `class="wireframe"` from index.html.
- All conversation copy lives in `src/data/guideScript.js`; legal copy is
  placeholder pending Legal review.
