import type { CancerData, CancerStage, CancerStructure, CancerSymptom } from '../../types/cancer'

interface InfoPanelProps {
  cancer: CancerData
  selectedStructure?: CancerStructure
  activeStage?: CancerStage
}

export function InfoPanel({ cancer, selectedStructure, activeStage }: InfoPanelProps) {
  const symptoms = activeStage?.symptoms
    .map((symptomId) => cancer.symptoms.find((symptom) => symptom.id === symptomId))
    .filter((symptom): symptom is CancerSymptom => Boolean(symptom))

  return (
    <aside className="scrollbar-none pointer-events-auto absolute inset-x-3 bottom-[5.7rem] z-30 max-h-[34dvh] overflow-y-auto rounded-2xl border border-white/10 bg-onco-bg/62 px-4 py-4 shadow-[0_28px_110px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:bottom-[6.2rem] sm:max-h-[36dvh] sm:px-5 lg:inset-x-auto lg:bottom-5 lg:right-5 lg:top-5 lg:w-[370px] lg:max-h-[calc(100dvh-2.5rem)] lg:px-5 lg:py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-onco-text-dim">
            Active specimen
          </p>
          <h2 className="mt-2 text-lg font-semibold leading-tight text-onco-text-primary sm:text-xl">
            {selectedStructure?.label ?? cancer.name}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-5 text-onco-text-muted">
            {selectedStructure ? selectedStructure.description : cancer.overview}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-onco-healthy/30 bg-onco-healthy/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-onco-healthy">
          {cancer.atlas_status}
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {selectedStructure ? (
          <section className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-onco-healthy">
              Structure relevance
            </p>
            <p className="mt-3 text-sm leading-6 text-onco-text-muted">{selectedStructure.cancer_relevance}</p>
          </section>
        ) : null}

        {activeStage ? (
          <section className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-onco-text-dim">Active stage</p>
            <h3 className="mt-2 text-base font-semibold text-onco-text-primary">{activeStage.label}</h3>
            <p className="mt-3 text-sm leading-6 text-onco-text-muted">{activeStage.description}</p>
          </section>
        ) : null}

        <section>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-onco-text-dim">
            Symptoms explained here
          </p>
          <div className="mt-3 grid gap-2">
            {symptoms && symptoms.length > 0 ? (
              symptoms.map((symptom) => (
                <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3" key={symptom.id}>
                  <p className="text-sm font-semibold text-onco-text-primary">{symptom.label}</p>
                  <p className="mt-1 text-sm leading-5 text-onco-text-muted">{symptom.cause}</p>
                </div>
              ))
            ) : (
              <p className="text-sm leading-6 text-onco-text-muted">
                This stage is shown as biological context. No specific symptom is implied.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-xl border border-onco-healthy/20 bg-onco-healthy/[0.055] p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-onco-healthy">Guardrail</p>
          <p className="mt-3 text-sm leading-6 text-onco-text-muted">
            Educational biology only. This does not diagnose, predict prognosis, or recommend treatment.
          </p>
        </section>
      </div>
    </aside>
  )
}
