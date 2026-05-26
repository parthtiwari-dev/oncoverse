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
    <aside className="border-t border-onco-border bg-onco-surface/90 px-5 py-6 backdrop-blur-xl sm:px-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-7">
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="text-xs font-semibold uppercase text-onco-text-dim">Active specimen</p>
          <h2 className="mt-2 text-xl font-semibold leading-tight text-onco-text-primary">{cancer.name}</h2>
          <p className="mt-2 text-sm text-onco-text-muted">{cancer.aliases.join(' / ')}</p>
        </div>
        <span className="rounded-md border border-onco-healthy/30 bg-onco-healthy/10 px-2 py-1 text-xs font-semibold text-onco-healthy">
          {cancer.atlas_status}
        </span>
      </div>

      <div className="mt-7 space-y-5">
        <section className="border-b border-onco-border pb-5">
          <p className="text-sm leading-6 text-onco-text-muted">{cancer.overview}</p>
        </section>

        {selectedStructure ? (
          <section className="rounded-lg border border-onco-border bg-onco-panel p-4">
            <p className="text-xs font-semibold uppercase text-onco-healthy">Selected structure</p>
            <h3 className="mt-2 text-lg font-semibold text-onco-text-primary">{selectedStructure.label}</h3>
            <p className="mt-3 text-sm leading-6 text-onco-text-muted">{selectedStructure.description}</p>
            <p className="mt-3 text-sm leading-6 text-onco-text-muted">{selectedStructure.cancer_relevance}</p>
          </section>
        ) : null}

        {activeStage ? (
          <section className="border-y border-onco-border py-5">
            <p className="text-xs font-semibold uppercase text-onco-text-dim">Active stage</p>
            <h3 className="mt-2 text-base font-semibold text-onco-text-primary">{activeStage.label}</h3>
            <p className="mt-3 text-sm leading-6 text-onco-text-muted">{activeStage.description}</p>
          </section>
        ) : null}

        <section>
          <p className="text-xs font-semibold uppercase text-onco-text-dim">Symptoms explained here</p>
          <div className="mt-3 grid gap-3">
            {symptoms && symptoms.length > 0 ? (
              symptoms.map((symptom) => (
                <div className="rounded-lg border border-onco-border bg-onco-panel/70 p-3" key={symptom.id}>
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

        <section className="rounded-lg border border-onco-border bg-onco-panel p-4">
          <p className="text-xs font-semibold uppercase text-onco-healthy">Guardrail</p>
          <p className="mt-3 text-sm leading-6 text-onco-text-muted">
            Educational biology only. This does not diagnose, predict prognosis, or recommend treatment.
          </p>
        </section>
      </div>
    </aside>
  )
}
