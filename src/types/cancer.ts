export type OrganSystem =
  | 'head-neck'
  | 'thoracic'
  | 'breast'
  | 'neurological'
  | 'hematological'
  | 'gi'
  | 'urological'
  | 'gynecological'
  | 'skin'

export type AtlasStatus = 'complete' | 'stub'

export type MeshId =
  | 'thyroid_right_lobe'
  | 'thyroid_left_lobe'
  | 'tumor_mass'
  | 'jugular_vein'
  | 'recurrent_laryngeal_nerve'
  | 'lymph_nodes'
  | 'trachea'

export type StageId =
  | 'normal'
  | 'ret-mutation'
  | 'early-tumor'
  | 'local-invasion'
  | 'vascular-involvement'
  | 'lymphatic-spread'

export interface CancerReference {
  id: string
  label: string
  url: string
}

export interface CancerStructure {
  mesh_id: MeshId
  label: string
  description: string
  cancer_relevance: string
  source_ids: string[]
}

export interface CancerSymptom {
  id: string
  label: string
  cause: string
  stage_onset: StageId | 'advanced'
  source_ids: string[]
}

export interface CancerStage {
  id: StageId
  label: string
  description: string
  highlight: MeshId[]
  symptoms: string[]
  source_ids: string[]
}

export interface CancerTreatment {
  name: string
  type: 'surgery' | 'targeted-therapy' | 'radiation' | 'monitoring' | 'supportive'
  description: string
  applicable_stages: StageId[] | string[]
  source_ids: string[]
}

export interface CancerEpidemiology {
  incidence: string
  median_age?: number
  hereditary_percentage?: number
}

export interface CancerData {
  id: string
  atlas_status: AtlasStatus
  name: string
  aliases: string[]
  icd11_code: string | null
  organ_system: OrganSystem
  primary_organ: string
  model_file: string | null
  affected_meshes: MeshId[]
  overview: string
  epidemiology: CancerEpidemiology
  symptoms: CancerSymptom[]
  structures: CancerStructure[]
  stages: CancerStage[]
  treatments: CancerTreatment[]
  ai_suggested_questions: string[]
  references: CancerReference[]
  data_sources: string[]
  contributed_by: string
  last_reviewed: string
  medical_review_status: 'needs-review' | 'reviewed'
  version: string
}
