import type { StorageUnit } from './types'

/**
 * Storage units in the garden — places that hold tools but no plants.
 *
 * They are first-class aggregate roots (separate from Patch) because
 * their behaviour and lifecycle differ: a storage unit owns tools, not
 * a bedding, and its detail view (future) will list tools rather than
 * plants.
 *
 * The detail route `/storage/:id` is reserved but not implemented yet.
 *
 * Grid positions are NOT stored here — they live in `src/layout/gardenLayout.ts`
 * as a separate presentation concern.
 */
export const STORAGE_UNITS: readonly StorageUnit[] = [
  {
    id: 'kiste',
    label: 'Kiste',
    tools: [],
  },
  {
    id: 'schuppen',
    label: 'Schuppen',
    tools: [],
  },
]

/** Look up a storage unit by its id. Returns undefined if no such unit exists. */
export function findStorageUnitById(id: string): StorageUnit | undefined {
  return STORAGE_UNITS.find((s) => s.id === id)
}
