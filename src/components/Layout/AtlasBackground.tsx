import { AnimatePresence, motion } from 'framer-motion'
import type { MeshId } from '../../types/cancer'
import { meshColorWash } from '../../utils/atlasUi'

interface AtlasBackgroundProps {
  selectedMeshId: MeshId
}

export function AtlasBackground({ selectedMeshId }: AtlasBackgroundProps) {
  const washColor = meshColorWash[selectedMeshId]

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="atlas-void absolute inset-0" />
      <div className="atlas-cell-texture absolute inset-0" />
      <AnimatePresence initial={false}>
        <motion.div
          animate={{ opacity: 1 }}
          className="absolute inset-0 mix-blend-screen"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          key={selectedMeshId}
          style={{
            background: `radial-gradient(circle at 50% 58%, ${washColor}, transparent 36%), linear-gradient(180deg, transparent 55%, ${washColor})`,
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,15,0.72),rgba(6,9,15,0.04)_36%,rgba(6,9,15,0.9))]" />
    </div>
  )
}
