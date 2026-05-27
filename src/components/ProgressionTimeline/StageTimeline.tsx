import { motion } from 'framer-motion'
import type { CancerStage, StageId } from '../../types/cancer'

interface StageTimelineProps {
  stages: CancerStage[]
  activeStageId: StageId
  onSelectStage: (stageId: StageId) => void
}

export function StageTimeline({ stages, activeStageId, onSelectStage }: StageTimelineProps) {
  const activeIndex = Math.max(
    0,
    stages.findIndex((stage) => stage.id === activeStageId),
  )
  const progress = stages.length > 1 ? (activeIndex / (stages.length - 1)) * 100 : 0

  return (
    <section className="pointer-events-none absolute inset-x-3 bottom-3 z-40 sm:bottom-5 lg:left-32 lg:right-[440px]">
      <div className="pointer-events-auto mx-auto max-w-5xl rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(21,21,31,0.52),rgba(6,9,15,0.72))] px-4 py-4 shadow-[0_22px_90px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl">
        <div className="relative h-16 min-w-0">
          <div className="absolute left-[1.1rem] right-[1.1rem] top-[1.05rem] h-px bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.18)_0_7px,transparent_7px_14px)]" />
          <motion.div
            animate={{ scaleX: progress / 100 }}
            className="absolute left-[1.1rem] right-[1.1rem] top-[1.05rem] h-px origin-left bg-gradient-to-r from-onco-healthy/60 to-onco-tumor/80 shadow-[0_0_18px_rgba(249,115,22,0.28)]"
            initial={false}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
          />

          <div className="scrollbar-none relative flex h-full items-start justify-between gap-4 overflow-x-auto">
            {stages.map((stage, index) => {
              const isActive = stage.id === activeStageId
              const isPast = index < activeIndex

              return (
                <button
                  className="group grid min-w-[7.75rem] justify-items-center gap-2 text-center sm:min-w-0 sm:flex-1"
                  key={stage.id}
                  onClick={() => onSelectStage(stage.id)}
                  type="button"
                >
                  <span
                    className={`relative grid rounded-full border transition ${
                      isActive
                        ? 'h-9 w-9 border-onco-tumor/70 bg-onco-tumor/18 shadow-[0_0_26px_rgba(249,115,22,0.34)]'
                        : isPast
                          ? 'mt-1 h-7 w-7 border-onco-healthy/45 bg-onco-healthy/10'
                          : 'mt-1 h-7 w-7 border-white/16 bg-white/[0.025]'
                    }`}
                  >
                    <span
                      className={`m-auto rounded-full transition ${
                        isActive
                          ? 'h-3 w-3 bg-onco-tumor'
                          : isPast
                            ? 'h-2 w-2 bg-onco-healthy/75'
                            : 'h-1.5 w-1.5 bg-onco-text-dim/55'
                      }`}
                    />
                  </span>
                  <span
                    className={`block max-w-[9rem] truncate text-[11px] font-medium transition ${
                      isActive
                        ? 'text-xs font-semibold text-onco-text-primary'
                        : isPast
                          ? 'text-onco-text-muted'
                          : 'text-onco-text-dim group-hover:text-onco-text-muted'
                    }`}
                  >
                    {stage.label}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
