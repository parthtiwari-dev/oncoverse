import { create } from 'zustand'
import type { MeshId, StageId } from '../types/cancer'

interface OncoState {
  activeCancerId: string
  activeStageId: StageId
  selectedMeshId: MeshId
  isOrbiting: boolean
  setActiveCancerId: (activeCancerId: string) => void
  setActiveStageId: (activeStageId: StageId) => void
  setSelectedMeshId: (selectedMeshId: MeshId) => void
  setIsOrbiting: (isOrbiting: boolean) => void
}

export const useOncoStore = create<OncoState>((set) => ({
  activeCancerId: 'medullary-thyroid-carcinoma',
  activeStageId: 'early-tumor',
  selectedMeshId: 'thyroid_right_lobe',
  isOrbiting: true,
  setActiveCancerId: (activeCancerId) => set({ activeCancerId }),
  setActiveStageId: (activeStageId) => set({ activeStageId }),
  setSelectedMeshId: (selectedMeshId) => set({ selectedMeshId }),
  setIsOrbiting: (isOrbiting) => set({ isOrbiting }),
}))
