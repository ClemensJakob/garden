import { describe, it, expect } from 'vitest'
import { usePatchDetails } from './usePatchDetails'

describe('usePatchDetails', () => {
  it('returns the patch for a known number', () => {
    const patch = usePatchDetails(7)
    expect(patch).toBeDefined()
    expect(patch?.number).toBe(7)
    expect(patch?.label).toBe('Beet 7')
  })

  it('returns the patch with its bedding referencing plants by id', () => {
    const patch = usePatchDetails(7)
    expect(patch?.bedding).toEqual([
      { plantId: 'rucola' },
      { plantId: 'radieschen' },
      { plantId: 'edamame' },
    ])
  })

  it('returns special patches like Kompost (15) and Kräuter (16)', () => {
    expect(usePatchDetails(15)?.label).toBe('Kompost')
    expect(usePatchDetails(16)?.label).toBe('Kräuter')
  })

  it('returns undefined for unknown patch numbers', () => {
    expect(usePatchDetails(999)).toBeUndefined()
  })

  it('returns undefined when called with undefined', () => {
    expect(usePatchDetails(undefined)).toBeUndefined()
  })

  it('returns undefined when called with NaN', () => {
    expect(usePatchDetails(Number.NaN)).toBeUndefined()
  })
})
