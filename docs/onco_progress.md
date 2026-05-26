# OncoVerse Progress Log
> Living audit of what is done, what changed, what is risky, and what comes next.
> Keep entries short, honest, and useful after every session.

**Branch:** `main`  
**Started:** v0.1.0 Foundation  
**Stack:** Vite / React / TypeScript / Tailwind / Three.js / R3F / Drei / Zustand / Framer Motion

---

## Current Status - 2026-05-27

**Status:** v0.1 project foundation is underway. The repo now has the OncoVerse shell, typed cancer data, a source-backed MTC data file, and a first procedural 3D interaction slice.

What is now proven:
- Node is updated and stable enough for project work: `v24.16.0`.
- npm is on the 11.x line and installs project packages successfully.
- Vite production build passes.
- Core v0.1 frontend libraries are installed: Three.js, R3F, Drei, Framer Motion, Zustand, Tailwind, and lucide-react.
- `node_modules/` and `dist/` are ignored by Git.
- MTC data has stable mesh IDs for thyroid, tumor, jugular vein, recurrent laryngeal nerve, lymph nodes, and trachea.
- The first R3F scene supports auto-orbit, drag/zoom, hover, click selection, and info-panel updates.

Current focus:
- Validate the first interactive MTC slice in browser on desktop and mobile widths.
- Improve anatomy fidelity after the placeholder interaction contract feels right.

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
| R3F async chunk | Open | The shell is split from the 3D bundle, but the async WebGL chunk is still large and needs later optimization. |

---

## Next Steps

1. Browser-check the MTC slice on desktop and mobile widths.
2. Refine procedural anatomy proportions, labels, and selected-state polish.
3. Add a real search/directory surface for the four stub cancers.
4. Decide the first real GLB/anatomy asset path.
5. Add focused schema/data validation to the project scripts.

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

### Session 4 - Data backbone and first MTC 3D slice - 2026-05-27

What changed:
- Added the typed cancer data contract.
- Added source-backed Medullary Thyroid Carcinoma JSON.
- Added four roadmap directory stubs: lung adenocarcinoma, invasive ductal breast cancer, glioblastoma, and ALL.
- Added a typed cancer registry, data hook, and Zustand atlas state.
- Replaced the static anatomy shell with a lazy-loaded R3F scene.
- Added procedural clickable structures for thyroid lobes, tumor mass, jugular vein, recurrent laryngeal nerve, lymph nodes, and trachea.
- Connected selected mesh and active stage to the right info panel.

Validation:
- `npm run build` passed.
- `npm run lint` passed.
- Data-contract check passed for all five cancer JSON files.

Notes:
- MTC data is still marked `needs-review`.
- The initial app chunk is split from the 3D scene, but the async 3D chunk remains large because Three/R3F/Drei are heavy.
