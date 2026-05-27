import type { CancerData, MeshId, OrganSystem } from '../types/cancer'

export const organSystemLabels: Record<OrganSystem, string> = {
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

export const meshColorWash: Record<MeshId, string> = {
  jugular_vein: 'rgba(239, 68, 68, 0.035)',
  lymph_nodes: 'rgba(226, 232, 240, 0.025)',
  recurrent_laryngeal_nerve: 'rgba(167, 139, 250, 0.035)',
  thyroid_left_lobe: 'rgba(110, 231, 183, 0.03)',
  thyroid_right_lobe: 'rgba(110, 231, 183, 0.032)',
  trachea: 'rgba(148, 163, 184, 0.024)',
  tumor_mass: 'rgba(249, 115, 22, 0.04)',
}

export interface AtlasSystem {
  system: OrganSystem
  label: string
  totalCount: number
  liveCount: number
}

export function getAtlasSystems(cancers: CancerData[]): AtlasSystem[] {
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

export function groupCancersBySystem(cancers: CancerData[]) {
  return cancers.reduce<Record<OrganSystem, CancerData[]>>(
    (groups, cancer) => {
      groups[cancer.organ_system].push(cancer)
      return groups
    },
    {
      breast: [],
      gi: [],
      gynecological: [],
      'head-neck': [],
      hematological: [],
      neurological: [],
      skin: [],
      thoracic: [],
      urological: [],
    },
  )
}
