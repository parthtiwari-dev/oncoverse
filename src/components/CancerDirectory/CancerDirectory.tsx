import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { CancerData, OrganSystem } from '../../types/cancer'
import { groupCancersBySystem, organSystemLabels } from '../../utils/atlasUi'

interface CancerDirectoryProps {
  activeCancerId: string
  cancers: CancerData[]
  isOpen: boolean
  onClose: () => void
  onSelectCancer: (cancer: CancerData) => void
}

function cancerMatchesQuery(cancer: CancerData, query: string) {
  const normalizedQuery = query.trim().toLowerCase()

  if (!normalizedQuery) {
    return true
  }

  return [cancer.name, cancer.primary_organ, cancer.organ_system, ...cancer.aliases]
    .join(' ')
    .toLowerCase()
    .includes(normalizedQuery)
}

export function CancerDirectory({ activeCancerId, cancers, isOpen, onClose, onSelectCancer }: CancerDirectoryProps) {
  const [query, setQuery] = useState('')
  const filteredCancers = useMemo(
    () => cancers.filter((cancer) => cancerMatchesQuery(cancer, query)),
    [cancers, query],
  )
  const groupedCancers = useMemo(() => groupCancersBySystem(filteredCancers), [filteredCancers])
  const orderedSystems = (Object.keys(groupedCancers) as OrganSystem[]).filter(
    (system) => groupedCancers[system].length > 0,
  )

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 z-50 bg-onco-bg/32 backdrop-blur-[2px]"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.aside
            animate={{ opacity: 1, x: 0 }}
            className="scrollbar-none absolute left-3 right-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-[1.4rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,17,25,0.88),rgba(6,9,15,0.94))] p-4 shadow-[0_32px_120px_rgba(0,0,0,0.48),inset_0_1px_0_rgba(255,255,255,0.07)] backdrop-blur-2xl sm:left-5 sm:right-auto sm:top-5 sm:w-[430px]"
            exit={{ opacity: 0, x: -18 }}
            initial={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-onco-healthy">
                  Atlas directory
                </p>
                <h2 className="mt-2 font-onco-display text-3xl leading-none text-onco-text-primary">
                  Find a specimen
                </h2>
              </div>
              <button
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-onco-text-muted shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition hover:border-onco-healthy/35 hover:text-onco-text-primary"
                onClick={onClose}
                title="Close directory"
                type="button"
              >
                <X aria-hidden="true" size={18} strokeWidth={1.8} />
                <span className="sr-only">Close directory</span>
              </button>
            </div>

            <label className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition focus-within:border-onco-healthy/45 focus-within:bg-onco-healthy/[0.055]">
              <Search className="shrink-0 text-onco-text-muted" size={18} strokeWidth={1.8} />
              <input
                autoFocus
                className="min-w-0 flex-1 bg-transparent text-sm text-onco-text-primary outline-none placeholder:text-onco-text-dim"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search cancers, organs, aliases"
                type="search"
                value={query}
              />
              <span className="rounded-md border border-white/10 px-2 py-1 text-[10px] font-medium text-onco-text-dim">
                cmd K
              </span>
            </label>

            <div className="mt-6 space-y-6">
              {orderedSystems.map((system) => (
                <section key={system}>
                  <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-onco-text-dim">
                    {organSystemLabels[system]}
                  </p>
                  <div className="grid gap-1">
                    {groupedCancers[system].map((cancer) => {
                      const isLive = cancer.atlas_status === 'complete'
                      const isActive = cancer.id === activeCancerId

                      return (
                        <button
                          className={`rounded-xl px-3 py-3 text-left transition ${
                            isLive
                              ? 'hover:bg-onco-healthy/[0.065]'
                              : 'pointer-events-none opacity-30'
                          } ${isActive ? 'bg-onco-healthy/[0.09]' : ''}`}
                          disabled={!isLive}
                          key={cancer.id}
                          onClick={() => onSelectCancer(cancer)}
                          type="button"
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-medium text-onco-text-primary">
                                {cancer.name}
                              </span>
                              <span className="mt-1 block truncate text-xs text-onco-text-dim">
                                {cancer.primary_organ}
                              </span>
                            </span>
                            <span
                              className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                                isLive ? 'text-onco-healthy' : 'text-onco-text-dim'
                              }`}
                            >
                              {isLive ? 'Live' : 'Soon'}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </section>
              ))}
            </div>
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
