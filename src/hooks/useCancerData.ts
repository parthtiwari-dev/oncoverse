import { cancers, defaultCancer, getCancerById } from '../data/cancers'

export function useCancerData(cancerId = defaultCancer.id) {
  const activeCancer = getCancerById(cancerId)

  return {
    activeCancer,
    cancers,
  }
}
