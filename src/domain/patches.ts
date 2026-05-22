import type { Patch } from './types'

/**
 * All patches (Beete) in the garden. The number is fixed and used as the
 * URL parameter (`/patches/:number`). What changes over time is the `bedding`.
 *
 * Numbers 1–14 are the labelled patches in the mockup. Numbers 15–17 are
 * special patches (Kompost, Kräuter, Himbeeren) that share the Patch
 * domain concept but render with a distinct visual variant.
 *
 * Grid positions are NOT stored here — they live in `src/layout/gardenLayout.ts`
 * as a separate presentation concern.
 */
export const PATCHES: readonly Patch[] = [
  {
    number: 1,
    label: 'Beet 1',
    variant: 'default',
    bedding: [{ plantId: 'tomaten' }],
  },
  {
    number: 2,
    label: 'Beet 2',
    variant: 'default',
    bedding: [{ plantId: 'zucchini' }],
  },
  {
    number: 3,
    label: 'Beet 3',
    variant: 'default',
    bedding: [{ plantId: 'bohnen' }, { plantId: 'karotten' }],
  },
  {
    number: 4,
    label: 'Beet 4',
    variant: 'default',
    bedding: [{ plantId: 'pfluecksalat' }],
  },
  {
    number: 5,
    label: 'Beet 5',
    variant: 'default',
    bedding: [{ plantId: 'gruenkohl' }],
  },
  {
    number: 6,
    label: 'Beet 6',
    variant: 'default',
    bedding: [{ plantId: 'mangold' }, { plantId: 'salat' }],
  },
  {
    number: 7,
    label: 'Beet 7',
    variant: 'default',
    bedding: [{ plantId: 'rote-bete' }],
  },
  {
    number: 8,
    label: 'Beet 8',
    variant: 'default',
    bedding: [{ plantId: 'erbsen' }],
  },
  {
    number: 9,
    label: 'Beet 9',
    variant: 'default',
    bedding: [{ plantId: 'radieschen' }],
  },
  {
    number: 10,
    label: 'Beet 10',
    variant: 'default',
    bedding: [{ plantId: 'lauch' }],
  },
  {
    number: 11,
    label: 'Beet 11',
    variant: 'default',
    bedding: [{ plantId: 'tomaten' }],
  },
  {
    number: 12,
    label: 'Beet 12',
    variant: 'default',
    bedding: [{ plantId: 'mangold' }],
  },
  {
    number: 13,
    label: 'Beet 13',
    variant: 'default',
    bedding: [{ plantId: 'hokkaido' }],
  },
  {
    number: 14,
    label: 'Beet 14',
    variant: 'default',
    bedding: [{ plantId: 'gurken' }],
  },
  {
    number: 15,
    label: 'Kompost',
    variant: 'kompost',
    bedding: [],
  },
  {
    number: 16,
    label: 'Kräuter',
    variant: 'kraeuter',
    bedding: [],
  },
  {
    number: 17,
    label: 'Himbeeren',
    variant: 'beere',
    bedding: [{ plantId: 'himbeeren' }],
  },
]

/** Look up a patch by its number. Returns undefined if no such patch exists. */
export function findPatchByNumber(number: number): Patch | undefined {
  return PATCHES.find((p) => p.number === number)
}
