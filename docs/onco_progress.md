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
- Polish the spatial atlas into a distinct biological observatory rather than a generic dark UI.
- Keep the 3D specimen stable, centered, and primary while panels remain secondary.
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
| Spatial shell polish | In progress | Current refactor corrected page-scroll pressure, then needed a focused audit for panel scrollbar noise and unstable orbit centering. |
| Visual identity craft | In progress | Grid-based dark-tech styling is being replaced with a void/cellular atlas direction, editorial type, timeline staging, and calmer motion. |

---

## Next Steps

1. Browser-check the visual-system refactor on desktop.
2. Do a focused mobile pass after desktop craft is approved.
3. Refine procedural anatomy proportions, labels, and selected-state polish.
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

### Session 5 - Spatial atlas shell audit - 2026-05-27

What changed:
- Moved the app closer to the roadmap's anatomy-first atlas view with a full-viewport canvas and floating overlays.
- Replaced the hardcoded cancer abbreviation rail with data-driven atlas discovery and organ-system tooling.
- Hid incidental panel and stage-rail scrollbars while preserving internal scroll behavior.
- Re-centered orbit behavior around the specimen instead of moving the camera target to each selected mesh.

Validation:
- Targeted ESLint passed for the changed app, panel, and scene files.
- TypeScript project check passed.

Notes:
- Do not commit this pass until Parth explicitly approves it.
- Browser visual review is still needed after refreshing the running Vite app.

### Session 6 - Biological observatory visual system - 2026-05-27

What changed:
- Replaced the generic grid background direction with a bioluminescent void and faint cellular texture.
- Added Geist/Instrument Serif typography direction, a cell-based OncoVerse mark, and selected-structure ambient wash.
- Replaced bottom stage tabs with a medical progression timeline.
- Reworked the info panel hierarchy so structure relevance, stage, symptoms, and guardrail have distinct visual weights.
- Rebuilt the directory as a search surface grouped by organ system.
- Added calmer Framer Motion transitions and stage-aware scene lighting without moving the specimen off-center.

Validation:
- Targeted ESLint passed for changed UI files.
- TypeScript project check passed.

Notes:
- No data schema changes.
- Do not commit, stage, or push until Parth explicitly asks.

### Session 7 - Atmosphere and material polish - 2026-05-27

What changed:
- Strengthened the void with a visible 8s ambient bloom and kept mesh color wash as a subtle secondary layer.
- Added consistent glass top-edge light catch across the atlas shell.
- Moved the 3D camera closer, added desktop orbit-target offset, and kept mobile centered.
- Converted procedural anatomy surfaces to per-tissue physical materials while keeping tumor dense and opaque.
- Refined local-only scene lighting; no external HDR or Drei environment presets.
- Updated the stage timeline with dashed dormant connectors and a healthy-to-tumor progression fill.
- Rebuilt the small cell mark so it reads more clearly at icon size.

Validation:
- Targeted ESLint passed for changed UI files.
- TypeScript project check passed.

Notes:
- `docs.zip` was intentionally not touched.
- Browser visual review is still required by Parth.
