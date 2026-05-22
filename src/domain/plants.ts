import type { Plant, SeasonMonth, SeasonPlan, SeasonStatus } from './types'
import { SEASON_MONTHS } from './types'

/**
 * Build a SeasonPlan from a partial map. Any month not specified
 * defaults to 'idle'.
 */
function seasonPlan(partial: Partial<Record<SeasonMonth, SeasonStatus>>): SeasonPlan {
  return SEASON_MONTHS.reduce((acc, month) => {
    acc[month] = partial[month] ?? 'idle'
    return acc
  }, {} as SeasonPlan)
}

/**
 * Catalog of all plants known to the garden. Plants are reusable:
 * a plant can be referenced by multiple patches via their bedding[].
 */
export const PLANTS: readonly Plant[] = [
  {
    id: 'tomaten',
    name: 'Tomaten',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'zucchini',
    name: 'Zucchini',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'bohnen',
    name: 'Bohnen',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MAI: 'säen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'karotten',
    name: 'Karotten',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'pfluecksalat',
    name: 'Pflücksalat',
    feeder: 'Schwachzehrer',
    light: 'Halbschatten',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', MAI: 'ernte', JUN: 'ernte', JUL: 'ernte', AUG: 'ernte' }),
  },
  {
    id: 'gruenkohl',
    name: 'Grünkohl',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', OKT: 'ernte', NOV: 'ernte' }),
  },
  {
    id: 'mangold',
    name: 'Mangold',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'salat',
    name: 'Salat',
    feeder: 'Schwachzehrer',
    light: 'Halbschatten',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', MAI: 'ernte', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'rote-bete',
    name: 'Rote Bete',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({
      APR: 'säen',
      MAI: 'pflanzen',
      JUN: 'ernte',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
  },
  {
    id: 'erbsen',
    name: 'Erbsen',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'radieschen',
    name: 'Radieschen',
    feeder: 'Schwachzehrer',
    light: 'Halbschatten',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', MAI: 'ernte', JUN: 'ernte' }),
  },
  {
    id: 'lauch',
    name: 'Lauch',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', SEP: 'ernte', OKT: 'ernte', NOV: 'ernte' }),
  },
  {
    id: 'hokkaido',
    name: 'Hokkaido',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'gurken',
    name: 'Gurken',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'himbeeren',
    name: 'Himbeeren',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ JUN: 'ernte', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
]

/** Look up a plant by its id. Returns undefined if no such plant exists. */
export function findPlantById(id: string): Plant | undefined {
  return PLANTS.find((p) => p.id === id)
}
