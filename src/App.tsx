import { lazy, Suspense } from 'react'
import { InfoPanel } from './components/InfoPanel/InfoPanel'
import { getStageById, getStructureByMeshId } from './data/cancers'
import { useCancerData } from './hooks/useCancerData'
import { useOncoStore } from './store/useOncoStore'

const Scene3D = lazy(() =>
  import('./components/Scene3D/Scene3D').then((module) => ({
    default: module.Scene3D,
  })),
)

const navLabels: Record<string, string> = {
  'medullary-thyroid-carcinoma': 'MTC',
  'lung-adenocarcinoma': 'LNG',
  'breast-invasive-ductal': 'BRS',
  glioblastoma: 'GBM',
  'acute-lymphoblastic-leukemia': 'ALL',
}

function App() {
  const {
    activeCancerId,
    activeStageId,
    isOrbiting,
    selectedMeshId,
    setActiveStageId,
    setIsOrbiting,
    setSelectedMeshId,
  } = useOncoStore()
  const { activeCancer, cancers } = useCancerData(activeCancerId)
  const activeStage = getStageById(activeCancer, activeStageId)
  const selectedStructure = getStructureByMeshId(activeCancer, selectedMeshId)
  const activeMeshes = activeStage?.highlight ?? activeCancer.affected_meshes

  return (
    <main className="min-h-screen overflow-hidden bg-onco-bg text-onco-text-primary">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(30,30,46,0.28)_1px,transparent_1px),linear-gradient(90deg,rgba(30,30,46,0.22)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,rgba(10,10,15,0.22),rgba(10,10,15,0.94))]" />

      <div className="relative grid min-h-screen grid-rows-[auto_minmax(520px,1fr)_auto] lg:grid-cols-[76px_minmax(0,1fr)_380px] lg:grid-rows-1">
        <aside className="hidden border-r border-onco-border/80 bg-onco-surface/70 backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:gap-4 lg:px-3 lg:py-6">
          <div className="mb-3 grid h-10 w-10 place-items-center rounded-full border border-onco-healthy/45 bg-onco-healthy/10 text-xs font-semibold text-onco-healthy shadow-[0_0_28px_rgba(110,231,183,0.16)]">
            OV
          </div>
          {cancers.map((cancer) => {
            const isActive = cancer.id === activeCancer.id

            return (
              <button
                className={`grid h-11 w-11 place-items-center rounded-lg border text-[11px] font-semibold text-onco-text-muted transition ${
                  isActive
                    ? 'border-onco-healthy/50 bg-onco-healthy/10 text-onco-healthy'
                    : 'border-onco-border bg-onco-panel/70 opacity-55'
                }`}
                disabled={cancer.atlas_status === 'stub'}
                key={cancer.id}
                title={cancer.atlas_status === 'stub' ? `${cancer.name} coming soon` : cancer.name}
                type="button"
              >
                {navLabels[cancer.id]}
              </button>
            )
          })}
        </aside>

        <section className="relative flex min-h-[520px] flex-col px-4 py-4 sm:px-6 lg:min-h-screen lg:px-8 lg:py-7">
          <header className="z-10 flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase text-onco-healthy">OncoVerse</p>
              <h1 className="mt-2 max-w-2xl text-2xl font-semibold leading-tight text-onco-text-primary sm:text-4xl">
                {activeCancer.name}
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-onco-text-muted">
                Explore the thyroid, tumor, jugular vein, recurrent laryngeal nerve, and lymph nodes as connected
                anatomy.
              </p>
            </div>
            <button
              className="rounded-lg border border-onco-border bg-onco-panel/90 px-4 py-3 text-left text-sm text-onco-text-muted transition hover:border-onco-healthy/40 hover:text-onco-text-primary"
              onClick={() => setIsOrbiting(!isOrbiting)}
              type="button"
            >
              <span className="block text-xs uppercase text-onco-text-dim">Orbit</span>
              <span className="mt-1 block">{isOrbiting ? 'Auto' : 'Manual'}</span>
            </button>
          </header>

          <div className="relative mt-4 min-h-[360px] flex-1 overflow-hidden rounded-lg border border-onco-border bg-onco-surface/72 shadow-[inset_0_0_90px_rgba(110,231,183,0.035)] sm:min-h-[460px] lg:mt-7">
            <Suspense
              fallback={
                <div className="grid h-full min-h-[360px] place-items-center text-sm text-onco-text-muted">
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
            <div className="pointer-events-none absolute left-4 top-4 rounded-lg border border-onco-border bg-onco-bg/65 px-3 py-2 text-xs text-onco-text-muted backdrop-blur">
              Click a structure to explain it
            </div>
          </div>

          <div className="z-10 border-t border-onco-border/80 pt-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
              {activeCancer.stages.map((stage) => {
                const isActive = stage.id === activeStage?.id

                return (
                  <button
                    className={`rounded-lg border px-3 py-3 text-left text-xs transition ${
                      isActive
                        ? 'border-onco-tumor/55 bg-onco-tumor/12 text-onco-text-primary'
                        : 'border-onco-border bg-onco-panel/70 text-onco-text-muted hover:border-onco-healthy/35'
                    }`}
                    key={stage.id}
                    onClick={() => setActiveStageId(stage.id)}
                    type="button"
                  >
                    {stage.label}
                  </button>
                )
              })}
            </div>
          </div>
        </section>

        <InfoPanel activeStage={activeStage} cancer={activeCancer} selectedStructure={selectedStructure} />
      </div>
    </main>
  )
}

export default App
