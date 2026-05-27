import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Layers3, Map, Orbit, RotateCcw, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CancerDirectory } from './components/CancerDirectory/CancerDirectory'
import { InfoPanel } from './components/InfoPanel/InfoPanel'
import { AtlasBackground } from './components/Layout/AtlasBackground'
import { OncoMark } from './components/Layout/OncoMark'
import { StageTimeline } from './components/ProgressionTimeline/StageTimeline'
import { getStageById, getStructureByMeshId } from './data/cancers'
import { useCancerData } from './hooks/useCancerData'
import { useOncoStore } from './store/useOncoStore'
import type { CancerData } from './types/cancer'
import { getAtlasSystems, organSystemLabels } from './utils/atlasUi'

const Scene3D = lazy(() =>
  import('./components/Scene3D/Scene3D').then((module) => ({
    default: module.Scene3D,
  })),
)

interface AtlasToolButtonProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  isDisabled?: boolean
  onClick?: () => void
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

  useEffect(() => {
    const openDirectory = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setIsDirectoryOpen(true)
      }
    }

    window.addEventListener('keydown', openDirectory)

    return () => window.removeEventListener('keydown', openDirectory)
  }, [])

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
    <main className="relative h-dvh min-h-[620px] overflow-hidden bg-[#06090f] text-onco-text-primary sm:min-h-[560px]">
      <AtlasBackground selectedMeshId={selectedMeshId} />

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
            activeStageId={activeStage?.id ?? activeStageId}
            isOrbiting={isOrbiting}
            onSelectMesh={setSelectedMeshId}
            selectedMeshId={selectedMeshId}
          />
        </Suspense>
      </section>

      <header className="pointer-events-none absolute left-3 right-3 top-3 z-30 flex items-start justify-between gap-3 sm:left-5 sm:right-5 sm:top-5 lg:right-[420px]">
        <div className="pointer-events-auto min-w-0 rounded-[1.35rem] border border-white/10 bg-[linear-gradient(180deg,rgba(21,21,31,0.52),rgba(6,9,15,0.72))] p-2 shadow-[0_20px_80px_rgba(0,0,0,0.26),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-2xl">
          <div className="flex items-center gap-2 px-2 pt-1">
            <OncoMark className="h-8 w-8 shrink-0" />
            <div className="min-w-0">
              <p className="font-onco-display text-xl leading-none text-onco-text-primary">OncoVerse</p>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-onco-text-dim">
                {activeSystem} atlas
              </p>
            </div>
          </div>

          <button
            className="mt-2 flex w-full min-w-0 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.035] px-3 py-2 text-left transition hover:border-onco-healthy/35 hover:bg-onco-healthy/[0.08]"
            onClick={() => setIsDirectoryOpen(true)}
            type="button"
          >
            <Search className="shrink-0 text-onco-text-muted" size={17} strokeWidth={1.8} />
            <span className="min-w-0">
              <span className="block truncate text-sm font-medium text-onco-text-primary">{activeCancer.name}</span>
              <span className="block truncate text-xs text-onco-text-dim">
                Search atlas / cmd K
              </span>
            </span>
          </button>
        </div>

        <button
          className="pointer-events-auto grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/10 bg-onco-bg/42 text-onco-text-muted shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-2xl transition hover:border-onco-healthy/35 hover:text-onco-text-primary"
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

      {activeCancer.stages.length > 0 ? (
        <StageTimeline
          activeStageId={activeStage?.id ?? activeStageId}
          onSelectStage={setActiveStageId}
          stages={activeCancer.stages}
        />
      ) : null}

      <CancerDirectory
        activeCancerId={activeCancer.id}
        cancers={cancers}
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        onSelectCancer={selectCancer}
      />

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#06090f] via-[#06090f]/45 to-transparent" />
    </main>
  )
}

export default App
