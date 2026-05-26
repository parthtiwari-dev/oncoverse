const anatomyMarkers = [
  { label: 'Thyroid', className: 'left-[46%] top-[42%] h-9 w-14 border-onco-healthy/40 bg-onco-healthy/10' },
  { label: 'Tumor', className: 'left-[53%] top-[39%] h-8 w-8 border-onco-tumor/70 bg-onco-tumor/25 shadow-[0_0_34px_rgba(249,115,22,0.28)]' },
  { label: 'Nerve', className: 'left-[43%] top-[34%] h-28 w-2 border-onco-nerve/50 bg-onco-nerve/25' },
  { label: 'Vessel', className: 'left-[58%] top-[28%] h-36 w-3 border-onco-danger/50 bg-onco-danger/20' },
]

const railItems = ['HN', 'TH', 'GI', 'BR']

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-onco-bg text-onco-text-primary">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(110,231,183,0.12),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(167,139,250,0.09),transparent_28%),linear-gradient(180deg,rgba(10,10,15,0),rgba(10,10,15,0.86))]" />

      <div className="relative grid min-h-screen grid-rows-[auto_1fr_auto] lg:grid-cols-[76px_minmax(0,1fr)_360px] lg:grid-rows-1">
        <aside className="hidden border-r border-onco-border/80 bg-onco-surface/55 backdrop-blur-xl lg:flex lg:flex-col lg:items-center lg:gap-4 lg:px-3 lg:py-6">
          <div className="mb-3 h-9 w-9 rounded-full border border-onco-healthy/45 bg-onco-healthy/10 shadow-[0_0_28px_rgba(110,231,183,0.18)]" />
          {railItems.map((item, index) => (
            <div
              className="grid h-11 w-11 place-items-center rounded-lg border border-onco-border bg-onco-panel text-[11px] font-semibold tracking-[0.12em] text-onco-text-muted"
              key={item}
            >
              <span className={index === 1 ? 'text-onco-healthy' : undefined}>{item}</span>
            </div>
          ))}
        </aside>

        <section className="relative flex min-h-[62vh] flex-col px-5 py-5 sm:px-8 lg:min-h-screen lg:px-10 lg:py-7">
          <header className="z-10 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-onco-healthy">OncoVerse</p>
              <h1 className="mt-2 max-w-2xl text-2xl font-semibold leading-tight text-onco-text-primary sm:text-4xl">
                Medullary Thyroid Carcinoma Atlas
              </h1>
            </div>
            <div className="hidden rounded-lg border border-onco-border bg-onco-panel/80 px-4 py-3 text-right sm:block">
              <p className="text-xs uppercase tracking-[0.18em] text-onco-text-dim">v0.1</p>
              <p className="mt-1 text-sm text-onco-text-muted">Foundation</p>
            </div>
          </header>

          <div className="relative grid flex-1 place-items-center py-8">
            <div className="absolute inset-x-6 top-1/2 h-px bg-gradient-to-r from-transparent via-onco-border to-transparent" />
            <div className="absolute left-1/2 top-16 h-[72%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-onco-border to-transparent" />

            <div className="relative aspect-[4/5] w-[min(72vw,430px)]">
              <div className="absolute inset-[8%] rounded-[48%] border border-onco-border/80 bg-onco-panel/45 shadow-[inset_0_0_90px_rgba(110,231,183,0.06),0_0_80px_rgba(0,0,0,0.45)]" />
              <div className="absolute left-1/2 top-[12%] h-[74%] w-[32%] -translate-x-1/2 rounded-full border border-onco-border/70 bg-gradient-to-b from-slate-300/8 via-slate-200/5 to-transparent" />
              <div className="absolute left-1/2 top-[31%] h-[34%] w-[46%] -translate-x-1/2 rounded-[44%] border border-onco-healthy/25 bg-onco-healthy/5" />

              {anatomyMarkers.map((marker) => (
                <div
                  aria-label={marker.label}
                  className={`absolute -translate-x-1/2 rounded-full border ${marker.className}`}
                  key={marker.label}
                />
              ))}

              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(241,245,249,0.07),transparent_26%),radial-gradient(circle_at_53%_40%,rgba(249,115,22,0.18),transparent_12%)]" />
            </div>
          </div>

          <div className="z-10 border-t border-onco-border/80 pt-4">
            <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.18em] text-onco-text-dim">
              <span>Normal</span>
              <span>Mutation</span>
              <span>Invasion</span>
              <span>Vessel</span>
            </div>
            <div className="mt-3 h-2 rounded-full bg-onco-panel">
              <div className="h-full w-[42%] rounded-full bg-gradient-to-r from-onco-healthy via-onco-tumor to-onco-danger" />
            </div>
          </div>
        </section>

        <aside className="border-t border-onco-border bg-onco-surface/82 px-5 py-6 backdrop-blur-xl sm:px-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-7">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-onco-text-dim">Active specimen</p>
              <h2 className="mt-2 text-xl font-semibold text-onco-text-primary">MTC foundation</h2>
            </div>
            <div className="h-3 w-3 rounded-full bg-onco-tumor shadow-[0_0_22px_rgba(249,115,22,0.52)]" />
          </div>

          <div className="mt-8 space-y-5">
            <section className="border-b border-onco-border pb-5">
              <p className="text-sm leading-6 text-onco-text-muted">
                The first release is focused on a careful thyroid cancer atlas: one flagship specimen, precise
                structure language, and a visual system that treats anatomy as the interface.
              </p>
            </section>

            <section className="grid gap-3">
              <div className="flex items-center justify-between border-b border-onco-border/80 pb-3">
                <span className="text-sm text-onco-text-muted">Healthy tissue</span>
                <span className="h-2.5 w-2.5 rounded-full bg-onco-healthy" />
              </div>
              <div className="flex items-center justify-between border-b border-onco-border/80 pb-3">
                <span className="text-sm text-onco-text-muted">Tumor highlight</span>
                <span className="h-2.5 w-2.5 rounded-full bg-onco-tumor" />
              </div>
              <div className="flex items-center justify-between border-b border-onco-border/80 pb-3">
                <span className="text-sm text-onco-text-muted">Nerve pathway</span>
                <span className="h-2.5 w-2.5 rounded-full bg-onco-nerve" />
              </div>
            </section>

            <section className="rounded-lg border border-onco-border bg-onco-panel p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-onco-healthy">Guardrail</p>
              <p className="mt-3 text-sm leading-6 text-onco-text-muted">
                Educational biology only. No diagnosis, prognosis, or treatment recommendation belongs in this
                interface.
              </p>
            </section>
          </div>
        </aside>
      </div>
    </main>
  )
}

export default App
