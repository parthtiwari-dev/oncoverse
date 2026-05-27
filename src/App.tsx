import { lazy, Suspense, useMemo, useState } from 'react'
import { Layers3, Map, Orbit, RotateCcw, Search, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { InfoPanel } from './components/InfoPanel/InfoPanel'
import { getStageById, getStructureByMeshId } from './data/cancers'
import { useCancerData } from './hooks/useCancerData'
import { useOncoStore } from './store/useOncoStore'
import type { CancerData, OrganSystem } from './types/cancer'

const Scene3D = lazy(() =>
  import('./components/Scene3D/Scene3D').then((module) => ({
    default: module.Scene3D,
  })),
)

const organSystemLabels: Record<OrganSystem, string> = {
  breast: 'Breast',
  gi: 'Gastrointestinal',
  gynecological: 'Gynecological',
  'head-neck': 'Head and neck',
  hematological: 'Hematological',
  neurological: 'Neurological',
  skin: 'Skin',
  thoracic: 'Thoracic',
  urological: 'Urological',
}

interface AtlasToolButtonProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  isDisabled?: boolean
  onClick?: () => void
}

interface AtlasSystem {
  system: OrganSystem
  label: string
  totalCount: number
  liveCount: number
}

function AtlasToolButton({ icon: Icon, label, isActive, isDisabled, onClick }: AtlasToolButtonProps) {
  return (
    <button
      aria-label={label}
      className={`grid h-11 w-11 place-items-center rounded-full border backdrop-blur-xl transition ${
        isActive
          ? 'border-onco-healthy/55 bg-onco-healthy/14 text-onco-healthy shadow-[0_0_28px_rgba(110,231,183,0.14)]'
          : 'border-white/10 bg-onco-bg/42 text-onco-text-muted hover:border-onco-healthy/35 hover:text-onco-text-primary'
      } ${isDisabled ? 'cursor-not-allowed opacity-35 hover:border-white/10 hover:text-onco-text-muted' : ''}`}
      disabled={isDisabled}
      onClick={onClick}
      title={label}
      type="button"
    >
      <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
    </button>
  )
}

function getAtlasSystems(cancers: CancerData[]): AtlasSystem[] {
  return Object.values(
    cancers.reduce<Record<string, AtlasSystem>>((systems, cancer) => {
      const existing = systems[cancer.organ_system]
      const liveCount = cancer.atlas_status === 'complete' ? 1 : 0

      systems[cancer.organ_system] = {
        system: cancer.organ_system,
        label: organSystemLabels[cancer.organ_system],
        totalCount: (existing?.totalCount ?? 0) + 1,
        liveCount: (existing?.liveCount ?? 0) + liveCount,
      }

      return systems
    }, {}),
  )
}

function App() {
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false)
  const {
    activeCancerId,
    activeStageId,
    isOrbiting,
    selectedMeshId,
    setActiveCancerId,
    setActiveStageId,
    setIsOrbiting,
    setSelectedMeshId,
  } = useOncoStore()
  const { activeCancer, cancers } = useCancerData(activeCancerId)
  const activeStage = getStageById(activeCancer, activeStageId)
  const selectedStructure = getStructureByMeshId(activeCancer, selectedMeshId)
  const activeMeshes = activeStage?.highlight ?? activeCancer.affected_meshes
  const atlasSystems = useMemo(() => getAtlasSystems(cancers), [cancers])
  const activeSystem = organSystemLabels[activeCancer.organ_system]

  const resetView = () => {
    setSelectedMeshId(activeCancer.structures[0]?.mesh_id ?? selectedMeshId)
    if (activeCancer.stages[0]) {
      setActiveStageId(activeCancer.stages[0].id)
    }
  }

  const selectCancer = (cancer: CancerData) => {
    if (cancer.atlas_status !== 'complete') {
      return
    }

    setActiveCancerId(cancer.id)
    if (cancer.stages[0]) {
      setActiveStageId(cancer.stages[0].id)
    }
    if (cancer.structures[0]) {
      setSelectedMeshId(cancer.structures[0].mesh_id)
    }
    setIsDirectoryOpen(false)
  }

  return (
    <main className="relative h-dvh min-h-[620px] overflow-hidden bg-onco-bg text-onco-text-primary sm:min-h-[560px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(110,231,183,0.09),transparent_34%),linear-gradient(rgba(30,30,46,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,46,0.18)_1px,transparent_1px)] bg-[size:auto,56px_56px,56px_56px]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.72),rgba(10,10,15,0.08)_34%,rgba(10,10,15,0.88))]" />

      <section className="absolute inset-0">
        <Suspense
          fallback={
            <div className="grid h-full place-items-center text-sm text-onco-text-muted">
              Loading anatomy specimen
            </div>
          }
        >
          <Scene3D
            activeMeshes={activeMeshes}
            isOrbiting={isOrbiting}
            onSelectMesh={setSelectedMeshId}
            selectedMeshId={selectedMeshId}
          />
        </Suspense>
      </section>

      <header className="pointer-events-none absolute left-3 right-3 top-3 z-30 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5 lg:right-[420px]">
        <div className="pointer-events-auto min-w-0 rounded-2xl border border-white/10 bg-onco-bg/48 p-2 shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 px-2 pt-1">
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-onco-healthy/40 bg-onco-healthy/10 text-[10px] font-semibold text-onco-healthy">
              OV
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-onco-healthy">OncoVerse</p>
              <p className="text-xs text-onco-text-dim">{activeSystem} atlas</p>
            </div>
          </div>

          <button
            className="mt-2 flex w-full min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-left transition hover:border-onco-healthy/35 hover:bg-onco-healthy/[0.08]"
            onClick={() => setIsDirectoryOpen(true)}
            type="button"
          >
            <Search className="shrink-0 text-onco-text-muted" size={17} strokeWidth={1.8} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-onco-text-primary">{activeCancer.name}</span>
              <span className="block truncate text-xs text-onco-text-dim">
                Search and atlas directory
              </span>
            </span>
          </button>
        </div>

        <button
          className="pointer-events-auto grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-onco-bg/48 text-onco-text-muted shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition hover:border-onco-healthy/35 hover:text-onco-text-primary"
          onClick={() => setIsOrbiting(!isOrbiting)}
          title={isOrbiting ? 'Pause auto orbit' : 'Resume auto orbit'}
          type="button"
        >
          <Orbit aria-hidden="true" size={19} strokeWidth={1.8} />
          <span className="sr-only">{isOrbiting ? 'Pause auto orbit' : 'Resume auto orbit'}</span>
        </button>
      </header>

      <nav
        aria-label="Atlas tools"
        className="pointer-events-auto absolute left-3 top-[8.8rem] z-30 flex flex-col gap-2 sm:left-5 sm:top-1/2 sm:-translate-y-1/2"
      >
        <AtlasToolButton icon={Search} label="Open cancer directory" onClick={() => setIsDirectoryOpen(true)} />
        <AtlasToolButton icon={RotateCcw} label="Reset specimen view" onClick={resetView} />
        <AtlasToolButton
          icon={Orbit}
          isActive={isOrbiting}
          label={isOrbiting ? 'Auto orbit on' : 'Auto orbit off'}
          onClick={() => setIsOrbiting(!isOrbiting)}
        />
        <div className="my-1 h-px w-11 bg-white/10" />
        {atlasSystems
          .filter((atlasSystem) => atlasSystem.liveCount > 0)
          .map((atlasSystem) => (
          <AtlasToolButton
            icon={atlasSystem.system === activeCancer.organ_system ? Map : Layers3}
            isActive={atlasSystem.system === activeCancer.organ_system}
            key={atlasSystem.system}
            label={`${atlasSystem.label}: ${atlasSystem.liveCount}/${atlasSystem.totalCount} live`}
          />
        ))}
      </nav>

      <div className="pointer-events-none absolute left-3 top-[23.5rem] z-20 hidden max-w-[11rem] text-xs leading-5 text-onco-text-dim sm:left-5 sm:top-auto sm:bottom-28 sm:block lg:max-w-[13rem]">
        Click anatomy to make the panel follow the specimen.
      </div>

      <InfoPanel activeStage={activeStage} cancer={activeCancer} selectedStructure={selectedStructure} />

      <section className="pointer-events-none absolute inset-x-3 bottom-3 z-40 sm:bottom-5 lg:left-28 lg:right-[420px]">
        <div className="pointer-events-auto mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-onco-bg/56 p-1.5 shadow-[0_22px_90px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
          <div className="scrollbar-none flex gap-1 overflow-x-auto sm:grid sm:grid-cols-6 sm:overflow-visible">
            {activeCancer.stages.map((stage) => {
              const isActive = stage.id === activeStage?.id

              return (
                <button
                  className={`min-w-[9.5rem] rounded-xl border px-3 py-2 text-left text-xs transition sm:min-w-0 sm:px-3 ${
                    isActive
                      ? 'border-onco-tumor/60 bg-onco-tumor/16 text-onco-text-primary shadow-[0_0_24px_rgba(249,115,22,0.14)]'
                      : 'border-transparent text-onco-text-muted hover:border-onco-healthy/30 hover:bg-onco-healthy/[0.06] hover:text-onco-text-primary'
                  }`}
                  key={stage.id}
                  onClick={() => setActiveStageId(stage.id)}
                  type="button"
                >
                  <span className="block truncate">{stage.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {isDirectoryOpen ? (
        <div className="absolute inset-0 z-50 bg-onco-bg/28 backdrop-blur-[2px]">
          <div className="scrollbar-none absolute left-3 right-3 top-3 max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-white/12 bg-onco-bg/84 p-4 shadow-[0_28px_110px_rgba(0,0,0,0.42)] backdrop-blur-2xl sm:left-5 sm:right-auto sm:top-5 sm:w-[420px]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-onco-healthy">Atlas directory</p>
                <h2 className="mt-2 text-lg font-semibold text-onco-text-primary">Cancer discovery</h2>
                <p className="mt-1 text-sm text-onco-text-muted">
                  Search-first navigation will live here as the atlas grows.
                </p>
              </div>
              <button
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-onco-text-muted transition hover:border-onco-healthy/35 hover:text-onco-text-primary"
                onClick={() => setIsDirectoryOpen(false)}
                title="Close directory"
                type="button"
              >
                <X aria-hidden="true" size={18} strokeWidth={1.8} />
                <span className="sr-only">Close directory</span>
              </button>
            </div>

            <div className="mt-5 grid gap-2">
              {cancers.map((cancer) => {
                const isLive = cancer.atlas_status === 'complete'
                const isActive = cancer.id === activeCancer.id

                return (
                  <button
                    className={`rounded-xl border p-3 text-left transition ${
                      isActive
                        ? 'border-onco-healthy/45 bg-onco-healthy/10'
                        : 'border-white/10 bg-white/[0.035] hover:border-onco-healthy/30 hover:bg-onco-healthy/[0.07]'
                    } ${!isLive ? 'cursor-not-allowed opacity-55 hover:border-white/10 hover:bg-white/[0.035]' : ''}`}
                    disabled={!isLive}
                    key={cancer.id}
                    onClick={() => selectCancer(cancer)}
                    type="button"
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span>
                        <span className="block text-sm font-medium text-onco-text-primary">{cancer.name}</span>
                        <span className="mt-1 block text-xs text-onco-text-dim">
                          {organSystemLabels[cancer.organ_system]} / {cancer.primary_organ}
                        </span>
                      </span>
                      <span
                        className={`rounded-full border px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                          isLive
                            ? 'border-onco-healthy/35 text-onco-healthy'
                            : 'border-white/10 text-onco-text-dim'
                        }`}
                      >
                        {isLive ? 'Live' : 'Soon'}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-onco-bg via-onco-bg/50 to-transparent" />
    </main>
  )
}

export default App
