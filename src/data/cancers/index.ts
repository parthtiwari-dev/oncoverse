import allData from './acute-lymphoblastic-leukemia.json'
import breastData from './breast-invasive-ductal.json'
import glioblastomaData from './glioblastoma.json'
import lungData from './lung-adenocarcinoma.json'
import mtcData from './medullary-thyroid-carcinoma.json'
import type { CancerData, MeshId, StageId } from '../../types/cancer'

export const cancers = [
  mtcData,
  lungData,
  breastData,
  glioblastomaData,
  allData,
] as CancerData[]

export const defaultCancer = mtcData as CancerData

export function getCancerById(cancerId: string): CancerData {
  return cancers.find((cancer) => cancer.id === cancerId) ?? defaultCancer
}

export function getStructureByMeshId(cancer: CancerData, meshId: MeshId) {
  return cancer.structures.find((structure) => structure.mesh_id === meshId)
}

export function getStageById(cancer: CancerData, stageId: StageId) {
  return cancer.stages.find((stage) => stage.id === stageId) ?? cancer.stages[0]
}
