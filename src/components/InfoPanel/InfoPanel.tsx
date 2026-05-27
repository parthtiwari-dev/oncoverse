import { AnimatePresence, motion } from 'framer-motion'
import type { CancerData, CancerStage, CancerStructure, CancerSymptom } from '../../types/cancer'

interface InfoPanelProps {
  cancer: CancerData
  selectedStructure?: CancerStructure
  activeStage?: CancerStage
}

const contentMotion = {
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  initial: { opacity: 0, y: -8 },
  transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
} as const

export function InfoPanel({ cancer, selectedStructure, activeStage }: InfoPanelProps) {
  const symptoms = activeStage?.symptoms
    .map((symptomId) => cancer.symptoms.find((symptom) => symptom.id === symptomId))
    .filter((symptom): symptom is CancerSymptom => Boolean(symptom))
  const panelKey = `${selectedStructure?.mesh_id ?? cancer.id}-${activeStage?.id ?? 'overview'}`

  return (
    <aside className="scrollbar-none pointer-events-auto absolute inset-x-3 bottom-[5.7rem] z-30 max-h-[34dvh] overflow-y-auto rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(21,21,31,0.72),rgba(6,9,15,0.9))] px-4 py-4 shadow-[0_28px_110px_rgba(0,0,0,0.38),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl sm:bottom-[6.2rem] sm:max-h-[36dvh] sm:px-5 lg:inset-x-auto lg:bottom-5 lg:right-5 lg:top-5 lg:w-[390px] lg:max-h-[calc(100dvh-2.5rem)] lg:px-6 lg:py-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-onco-text-dim">
            Active specimen
          </p>
          <h2 className="mt-3 font-onco-display text-4xl leading-[0.95] text-onco-text-primary sm:text-[2.65rem]">
            {selectedStructure?.label ?? cancer.name}
          </h2>
        </div>
        <span className="shrink-0 rounded-full border border-onco-healthy/25 bg-onco-healthy/8 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-onco-healthy">
          {cancer.atlas_status}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div className="mt-5 space-y-5" key={panelKey} {...contentMotion}>
          <p className="text-[15px] leading-7 text-onco-text-muted">
            {selectedStructure ? selectedStructure.description : cancer.overview}
          </p>

          {selectedStructure ? (
            <section className="border-l-2 border-onco-healthy/70 py-1 pl-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-onco-healthy">
                Structure relevance
              </p>
              <p className="mt-3 text-[15px] leading-7 text-onco-text-primary/88">
                {selectedStructure.cancer_relevance}
              </p>
            </section>
          ) : null}

          {activeStage ? (
            <section className="relative py-1 pl-5">
              <span className="absolute left-0 top-2 h-[calc(100%-0.5rem)] w-px bg-gradient-to-b from-onco-tumor/70 to-transparent" />
              <span className="absolute left-[-3px] top-1.5 h-2 w-2 rounded-full bg-onco-tumor shadow-[0_0_16px_rgba(249,115,22,0.42)]" />
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
                  <div className="rounded-xl bg-white/[0.03] px-3 py-3" key={symptom.id}>
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
        </motion.div>
      </AnimatePresence>

      <p className="mt-5 border-t border-white/8 pt-4 text-xs leading-5 text-onco-text-dim">
        Educational biology only. This does not diagnose, predict prognosis, or recommend treatment.
      </p>
    </aside>
  )
}
