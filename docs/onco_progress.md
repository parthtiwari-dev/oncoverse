# OncoVerse Progress Log
> Living audit of what is done, what changed, what is risky, and what comes next.
> Keep entries short, honest, and useful after every session.

**Branch:** `main`  
**Started:** v0.1.0 Foundation  
**Stack:** Vite / React / TypeScript / Tailwind / Three.js / R3F / Drei / Zustand / Framer Motion

---

## Current Status - 2026-05-27

**Status:** v0.1 project foundation is underway. The repo has a working Vite React TypeScript setup and is moving from stock scaffold to the OncoVerse visual system.

What is now proven:
- Node is updated and stable enough for project work: `v24.16.0`.
- npm is on the 11.x line and installs project packages successfully.
- Vite production build passes.
- Core v0.1 frontend libraries are installed: Three.js, R3F, Drei, Framer Motion, Zustand, Tailwind, and lucide-react.
- `node_modules/` and `dist/` are ignored by Git.

Current focus:
- Tailwind v4 design-system wiring.
- Clean architecture folders for v0.1.
- A polished minimal OncoVerse shell before the first real MTC interaction slice.

---

## Roadmap Snapshot

| Phase | Goal | Status |
|---|---|---|
| v0.1.0 | Flagship MTC Cancer Atlas foundation | In progress |
| v0.2.0 | Server-side AI explainer | Not started |
| v0.3.0 | Report explainer and PDF parsing | Not started |
| v0.4.0 | Progression simulator | Not started |
| v1.0.0 | Public release with 20+ cancers | Future |
| v2.0.0 | Digital twin research track | Future |

---

## Decisions Locked

- Use React + TypeScript for schema-heavy cancer data and mesh IDs.
- Use Tailwind v4 with CSS-first design tokens.
- Keep v0.1 frontend-only: no backend, no Python venv, no OpenAI, no report upload.
- Build one excellent MTC experience before expanding into many full cancers.
- Start 3D with controlled placeholder anatomy if needed; do not block on perfect GLB assets.
- All medical language must stay educational and source-backed.

---

## Bugs, Risks, and Notes

| Item | Status | Note |
|---|---|---|
| Windows Node shims | Resolved | Stale user npm shims caused `node -v` to behave strangely; system Node now resolves correctly. |
| Real anatomy assets | Open | No GLB model strategy is locked yet. Placeholder anatomy is acceptable for the first interaction slice. |
| Medical accuracy review | Open | MTC content needs cited sources and careful wording before public release. |
| Performance budget | Open | 3D model size, lazy loading, and mobile frame rate must be watched early. |

---

## Next Steps

1. Define the cancer TypeScript schema.
2. Create the first `medullary-thyroid-carcinoma` JSON entry.
3. Build the first non-GLB placeholder MTC scene with stable mesh IDs.
4. Connect mesh selection to the right-side structure panel.
5. Add the four directory stubs after the MTC slice works.

---

## Session Log

### Session 1 - Frontend scaffold and environment setup - 2026-05-26

What changed:
- Initialized Vite React TypeScript project.
- Installed core v0.1 frontend dependencies.
- Fixed missing Windows Rolldown native binding by installing the explicit package.
- Verified production build.
- Committed and pushed the frontend scaffold.

Validation:
- `npm run build` passed.

### Session 2 - Node cleanup and foundation planning - 2026-05-27

What changed:
- Updated Node to `v24.16.0`.
- Identified and removed stale user-level Node/npm PowerShell shims.
- Planned Tailwind v4 setup, architecture folders, and this progress log.

Validation:
- `node -v` reports `v24.16.0`.
- `npm run build` passed.

### Session 3 - Tailwind and foundation shell - 2026-05-27

What changed:
- Wired Tailwind v4 through the Vite plugin.
- Replaced the Vite starter surface with an OncoVerse foundation shell.
- Added v0.1 architecture folders.
- Added this progress log.

Validation:
- `npm run build` passed.
- `npm run lint` passed.
- `dist/` and `node_modules/` remain ignored by Git.
