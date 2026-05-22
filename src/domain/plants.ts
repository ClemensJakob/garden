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

  // ---------- Plants added for the 2026 plan ----------

  {
    id: 'artischoke',
    name: 'Artischoke',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'yas-salat',
    name: 'Yas-Salat',
    feeder: 'Schwachzehrer',
    light: 'Halbschatten',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', MAI: 'ernte', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'aubergine',
    name: 'Aubergine',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'paprika',
    name: 'Paprika',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'zinnien',
    name: 'Zinnien',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'kohlrabi',
    name: 'Kohlrabi',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'pflanzen', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'senfsaat',
    name: 'Senfsaat',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', MAI: 'ernte', JUN: 'ernte' }),
  },
  {
    id: 'tagetes',
    name: 'Tagetes',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'pimentos',
    name: 'Pimentos',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'erdbeeren',
    name: 'Erdbeeren',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MAI: 'ernte', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'physalis',
    name: 'Physalis',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', AUG: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'zuckererbsen',
    name: 'Zuckererbsen',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'rucola',
    name: 'Rucola',
    feeder: 'Schwachzehrer',
    light: 'Halbschatten',
    seasonPlan: seasonPlan({ MÄR: 'säen', APR: 'säen', MAI: 'ernte', JUN: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'edamame',
    name: 'Edamame',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MAI: 'säen', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'kartoffeln-fruehling',
    name: 'Kartoffeln (Frühling)',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'pflanzen', APR: 'pflanzen', JUN: 'ernte', JUL: 'ernte' }),
  },
  {
    id: 'schwarzkohl-herbst',
    name: 'Schwarzkohl (Herbst)',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MAI: 'säen', JUL: 'pflanzen', OKT: 'ernte', NOV: 'ernte' }),
  },
  {
    id: 'gruenkohl-herbst',
    name: 'Grünkohl (Herbst)',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MAI: 'säen', JUL: 'pflanzen', OKT: 'ernte', NOV: 'ernte' }),
  },
  {
    id: 'blumenstauden',
    name: 'Blumenstauden',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ JUN: 'ernte', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
  {
    id: 'kuerbis',
    name: 'Kürbis',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'säen', MAI: 'pflanzen', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'weisskohl',
    name: 'Weißkohl',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', AUG: 'ernte', SEP: 'ernte', OKT: 'ernte' }),
  },
  {
    id: 'zwiebel',
    name: 'Zwiebel',
    feeder: 'Mittelzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'pflanzen', APR: 'pflanzen', JUL: 'ernte', AUG: 'ernte' }),
  },
  {
    id: 'rhabarber',
    name: 'Rhabarber',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ APR: 'ernte', MAI: 'ernte', JUN: 'ernte' }),
  },
  {
    id: 'spitzkohl',
    name: 'Spitzkohl',
    feeder: 'Starkzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MÄR: 'säen', MAI: 'pflanzen', JUL: 'ernte', AUG: 'ernte' }),
  },
  {
    id: 'stangenbohnen',
    name: 'Stangenbohnen',
    feeder: 'Schwachzehrer',
    light: 'Sonne',
    seasonPlan: seasonPlan({ MAI: 'säen', JUL: 'ernte', AUG: 'ernte', SEP: 'ernte' }),
  },
]

/** Look up a plant by its id. Returns undefined if no such plant exists. */
export function findPlantById(id: string): Plant | undefined {
  return PLANTS.find((p) => p.id === id)
}
