import { findPatchByNumber } from '../domain/patches'
import type { Patch } from '../domain/types'

/**
 * Returns the patch identified by `patchNumber` (matching the URL param).
 *
 * Since a Patch aggregates its own bedding and bedding references plants
 * by id, callers that need plant details can resolve them via the
 * PLANTS catalog (see `findPlantById`).
 *
 * Returns `undefined` for unknown numbers, or when the input itself is
 * undefined / NaN.
 */
export function usePatchDetails(patchNumber: number | undefined): Patch | undefined {
  if (patchNumber === undefined || Number.isNaN(patchNumber)) {
    return undefined
  }
  return findPatchByNumber(patchNumber)
}
