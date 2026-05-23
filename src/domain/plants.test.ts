import { describe, it, expect } from 'vitest'
import { findPlantById, patchAccent } from './plants'
import { plantAccent, type Bedding } from './types'

describe('plantAccent', () => {
  it('falls back to the family default when no override is given', () => {
    // Tomaten — family "nachtschatten", no explicit accentColor → "tomato".
    const tomaten = findPlantById('tomaten')!
    expect(plantAccent(tomaten)).toBe('tomato')
  })

  it('honors an explicit accentColor override on the plant', () => {
    // Erdbeeren — family "rosengewaechs" (default would be "strawberry"),
    // and explicitly overrides to "strawberry" too. Use Kartoffeln, which
    // overrides "nachtschatten" → "leaf".
    const kartoffeln = findPlantById('kartoffeln')!
    expect(plantAccent(kartoffeln)).toBe('leaf')
  })
})

describe('patchAccent', () => {
  it('returns the accent of the lead (first) plant in the bedding', () => {
    const bedding: readonly Bedding[] = [{ plantId: 'erdbeeren' }]
    expect(patchAccent(bedding)).toBe('strawberry')
  })

  it('uses the first plant when several are present', () => {
    const bedding: readonly Bedding[] = [
      { plantId: 'kuerbis' },
      { plantId: 'tomaten' },
    ]
    // Kürbis is the lead → "pumpkin", not the tomato red.
    expect(patchAccent(bedding)).toBe('pumpkin')
  })

  it('returns undefined for an empty bedding', () => {
    expect(patchAccent([])).toBeUndefined()
  })

  it('returns undefined when the lead plant id is unknown', () => {
    const bedding: readonly Bedding[] = [{ plantId: 'does-not-exist' }]
    expect(patchAccent(bedding)).toBeUndefined()
  })
})
