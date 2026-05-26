# OncoVerse

> You don't browse cancer. You explore it.

OncoVerse is an open-source cancer education atlas that makes cancer biology visible through immersive 3D anatomy, plain-English explanations, and stage-by-stage exploration.

It is built for patients, families, students, educators, and anyone trying to understand what cancer does inside the human body.

OncoVerse is not a diagnostic tool. It is an educational interface for making the invisible visible.

---

## Vision

Cancer is often explained through reports, scans, medical terms, and rushed conversations.

OncoVerse asks a simpler question:

What if people could see what is happening?

The goal is to build the Wikipedia + Google Maps of cancer: alive, visual, careful, and understandable.

---

## v0.1.0 Focus

The first release is intentionally narrow:

- One flagship Medullary Thyroid Carcinoma experience
- Immersive 3D neck anatomy
- Clickable thyroid, tumor, jugular vein, and recurrent laryngeal nerve
- Plain-English structure explanations
- Symptom mapping
- Four additional cancer directory stubs
- No AI chat yet
- No report upload yet
- No diagnosis, prognosis, or treatment recommendation

One excellent cancer visualization is more important than five shallow ones.

---

## Design Principles

### Anatomy Is The Interface

The 3D anatomy is the product. UI panels support exploration, but they do not lead it.

### Motion Is Information

Camera movement, highlighting, transitions, and progression states should help people understand biology, not decorate the screen.

### Cinematic, But Medically Careful

OncoVerse should feel like a sci-fi biological observatory, not a hospital dashboard. But it must stay grounded, restrained, source-backed, and respectful.

---

## Tech Stack

- React + Vite
- Three.js + React Three Fiber
- Drei
- Tailwind CSS
- Framer Motion
- Zustand

Later phases may add:

- FastAPI backend
- OpenAI GPT-4o mini for low-cost AI explanations
- PDF/report parsing
- RAG over cancer knowledge sources

---

## Roadmap

### v0.1.0 — Foundation

Build the flagship MTC visual atlas.

### v0.2.0 — AI Explainer

Add a server-side AI explainer using GPT-4o mini by default.

### v0.3.0 — Report Explainer

Upload medical reports and receive plain-English educational breakdowns.

### v0.4.0 — Progression Simulator

Animate cancer progression from normal tissue to advanced disease.

### v1.0.0 — Public Release

Polished public release with 20+ cancer types, SEO pages, accessibility, and contributor workflows.

### v2.0.0 — Research Track

Explore DICOM, personalized visualization, and multi-scale continuity.

---

## Medical Disclaimer

OncoVerse is an educational project.

It does not diagnose cancer.  
It does not predict prognosis.  
It does not recommend treatment.  
It is not a substitute for a qualified doctor.

If you or someone you love is dealing with cancer, consult an oncologist or qualified medical professional.

---

## License

MIT License.
