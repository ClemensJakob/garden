import type {
  AccentColor,
  Bedding,
  Plant,
  PlantId,
  SeasonActivity,
  SeasonMonth,
  SeasonPlan,
  SeasonStatus,
} from './types'
import { plantAccent, SEASON_MONTHS, SEASON_STATUS_ORDER } from './types'

/**
 * A single status or a list of statuses for a given month. The helper
 * normalises both shapes into the canonical `SeasonStatus[]`.
 */
type MonthInput = SeasonStatus | readonly SeasonStatus[]

/**
 * Build a list of `SeasonActivity` value objects from a partial
 * month-keyed map (the shape used in the plant catalog for legibility).
 *
 * The catalog form is "what happens this month?" — convenient to write.
 * The domain form is "for each activity, in which months does it
 * happen?" — which is what we want first-class on the Plant aggregate
 * so that "Pflanzen können in mehreren Monaten vorgezogen, gesät,
 * gepflanzt und geerntet werden" is explicitly modelled.
 *
 * Months are sorted in calendar order (MÄR → NOV). Activities are
 * sorted in the canonical status order (Vorziehen → Aussaat →
 * Pflanzen → Ernte). Activities with no months are dropped.
 */
function seasonActivities(
  partial: Partial<Record<SeasonMonth, MonthInput>>
): readonly SeasonActivity[] {
  const monthsByStatus = new Map<SeasonStatus, SeasonMonth[]>()

  for (const month of SEASON_MONTHS) {
    const value = partial[month]
    if (value === undefined) continue
    const statuses = Array.isArray(value)
      ? (value as readonly SeasonStatus[])
      : [value as SeasonStatus]
    for (const status of statuses) {
      const existing = monthsByStatus.get(status)
      if (existing) {
        existing.push(month)
      } else {
        monthsByStatus.set(status, [month])
      }
    }
  }

  return SEASON_STATUS_ORDER.flatMap((status) => {
    const months = monthsByStatus.get(status)
    return months && months.length > 0 ? [{ status, months }] : []
  })
}

/**
 * Derive the per-month presentation view from a Plant's canonical
 * `seasonActivities`. Used by the SeasonPlan calendar component.
 *
 * Within a single month, statuses are emitted in `SEASON_STATUS_ORDER`
 * so the visual layout is stable across plants.
 */
export function toSeasonPlan(activities: readonly SeasonActivity[]): SeasonPlan {
  const plan = SEASON_MONTHS.reduce(
    (acc, month) => {
      acc[month] = []
      return acc
    },
    {} as Record<SeasonMonth, SeasonStatus[]>
  )

  for (const status of SEASON_STATUS_ORDER) {
    for (const activity of activities) {
      if (activity.status !== status) continue
      for (const month of activity.months) {
        plan[month].push(status)
      }
    }
  }

  return plan as SeasonPlan
}

/**
 * Catalog of all plants known to the garden. Plants are reusable:
 * a plant can be referenced by multiple patches via their bedding[].
 *
 * Spacing values (rowSpacing, plantSpacing) are in centimetres and
 * follow common German "Hausgarten" recommendations. Companions are
 * referenced by PlantId and must point at entries in this catalog.
 */
export const PLANTS: readonly Plant[] = [
  {
    id: 'tomaten',
    name: 'Tomaten',
    feeder: 'Starkzehrer',
    family: 'nachtschatten',
    icon: '🍅',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 120,
    plantSpacing: 120,
    goodCompanions: ['karotten', 'salat', 'pfluecksalat', 'tagetes', 'zwiebel', 'lauch', 'paprika'],
    badCompanions: ['kartoffeln', 'gurken', 'erbsen'],
    notes:
      'Geizen für höhere Erträge. Regenschutz hält Kraut- und Braunfäule fern. Tief pflanzen — der Stamm wurzelt nach.',
  },
  {
    id: 'zucchini',
    name: 'Zucchini',
    feeder: 'Starkzehrer',
    family: 'kuerbisgewaechs',
    icon: '🥒',
    accentColor: 'leaf',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 120,
    plantSpacing: 100,
    goodCompanions: ['bohnen', 'zwiebel', 'rote-bete'],
    badCompanions: ['gurken', 'kuerbis', 'hokkaido'],
    notes: 'Braucht viel Platz und Wasser. Regelmäßig ernten, sonst stockt der Wuchs.',
  },
  {
    id: 'bohnen',
    name: 'Bohnen',
    feeder: 'Schwachzehrer',
    family: 'huelsenfruechtler',
    icon: '🫛',
    seasonActivities: seasonActivities({
      MAI: 'aussaat',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 10,
    goodCompanions: ['gurken', 'salat', 'rote-bete', 'karotten', 'zucchini'],
    badCompanions: ['zwiebel', 'lauch', 'erbsen', 'zuckererbsen', 'paprika'],
    notes: 'Stickstoffsammler — verbessern den Boden. Erst nach den Eisheiligen säen.',
  },
  {
    id: 'karotten',
    name: 'Karotten',
    feeder: 'Mittelzehrer',
    family: 'doldenbluetler',
    icon: '🥕',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 30,
    plantSpacing: 5,
    //      'erbsen' ergänzt (erbsen.good enthält karotten); 'mangold' ergänzt (mangold.good enthält karotten);
    //      'edamame' ergänzt (edamame.good enthält karotten); 'zuckererbsen' ergänzt (zuckererbsen.good enthält karotten)
    goodCompanions: ['zwiebel', 'lauch', 'tomaten', 'radieschen', 'pfluecksalat', 'bohnen', 'erbsen', 'mangold', 'edamame', 'zuckererbsen'],
    badCompanions: ['rote-bete'],
    notes:
      'Mit Zwiebeln in Mischkultur gegen Möhrenfliege. Lockerer, steinfreier Boden für gerade Wurzeln.',
  },
  {
    id: 'pfluecksalat',
    name: 'Pflücksalat',
    feeder: 'Schwachzehrer',
    family: 'korbbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      MAI: 'ernte',
      JUN: 'ernte',
      JUL: 'ernte',
      AUG: 'ernte',
    }),
    rowSpacing: 25,
    plantSpacing: 25,
    goodCompanions: ['radieschen', 'karotten', 'tomaten', 'erdbeeren'],
    badCompanions: [],
    notes: 'Mehrfach pflückbar — nur die äußeren Blätter ernten. Schosst bei Hitze schnell.',
  },
  {
    id: 'gruenkohl',
    name: 'Grünkohl',
    feeder: 'Starkzehrer',
    family: 'kreuzbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      OKT: 'ernte',
      NOV: 'ernte',
    }),
    rowSpacing: 50,
    plantSpacing: 40,
    goodCompanions: ['salat', 'rote-bete', 'erbsen', 'kartoffeln'],
    badCompanions: ['weisskohl', 'spitzkohl', 'kohlrabi', 'rucola'],
    notes: 'Erst nach dem ersten Frost wirklich aromatisch. Vor Kohlweißling mit Netz schützen.',
  },
  {
    id: 'mangold',
    name: 'Mangold',
    feeder: 'Mittelzehrer',
    family: 'gaensefussgewaechs',
    icon: '🥬',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 30,
    goodCompanions: ['karotten', 'radieschen', 'salat'],
    badCompanions: ['rote-bete'],
    notes: 'Zwei-Jahres-Pflanze — überwintert mild. Äußere Blätter laufend ernten.',
  },
  {
    id: 'salat',
    name: 'Salat',
    feeder: 'Schwachzehrer',
    family: 'korbbluetler',
    icon: '🥗',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      MAI: 'ernte',
      JUN: 'ernte',
      JUL: 'ernte',
    }),
    rowSpacing: 30,
    plantSpacing: 25,
    goodCompanions: ['radieschen', 'karotten', 'erdbeeren', 'tomaten', 'gruenkohl', 'gurken'],
    badCompanions: [],
    notes: 'Lückenfüller zwischen Starkzehrern. Bei Hitze beschatten oder früh am Tag ernten.',
  },
  {
    id: 'rote-bete',
    name: 'Rote Bete',
    feeder: 'Mittelzehrer',
    family: 'gaensefussgewaechs',
    icon: '🟣',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUN: 'ernte',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 30,
    plantSpacing: 8,
    goodCompanions: ['zucchini', 'bohnen', 'gruenkohl', 'zwiebel'],
    badCompanions: ['karotten', 'mangold'],
    notes: 'Aus jedem Knäuel keimen mehrere Pflanzen — vereinzeln nicht vergessen.',
  },
  {
    id: 'erbsen',
    name: 'Erbsen',
    feeder: 'Schwachzehrer',
    family: 'huelsenfruechtler',
    icon: '🟢',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      JUN: 'ernte',
      JUL: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 5,
    goodCompanions: ['karotten', 'radieschen', 'gurken', 'gruenkohl'],
    badCompanions: ['bohnen', 'zwiebel', 'lauch', 'tomaten', 'paprika'],
    notes: 'Stickstoffsammler. Niedrige Sorten brauchen kein Gerüst, hohe schon.',
  },
  {
    id: 'radieschen',
    name: 'Radieschen',
    feeder: 'Schwachzehrer',
    family: 'kreuzbluetler',
    icon: '🔴',
    accentColor: 'tomato',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      MAI: 'ernte',
      JUN: 'ernte',
    }),
    rowSpacing: 15,
    plantSpacing: 2,
    goodCompanions: ['salat', 'pfluecksalat', 'karotten', 'erbsen'],
    badCompanions: ['gurken'],
    notes: 'Ideale Markiersaat — keimen schnell und zeigen die Reihe an. Gleichmäßig wässern, sonst platzen sie.',
  },
  {
    id: 'lauch',
    name: 'Lauch',
    feeder: 'Mittelzehrer',
    family: 'lauchgewaechs',
    icon: '🧅',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      SEP: 'ernte',
      OKT: 'ernte',
      NOV: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 15,
    goodCompanions: ['karotten', 'tomaten', 'erdbeeren'],
    //      'stangenbohnen' ergänzt (stangenbohnen.bad enthält lauch)
    badCompanions: ['bohnen', 'erbsen', 'edamame', 'zuckererbsen', 'stangenbohnen'],
    notes: 'Tief in Pflanzlöcher setzen und einschlämmen — gibt einen langen weißen Schaft.',
  },
  {
    id: 'hokkaido',
    name: 'Hokkaido',
    feeder: 'Starkzehrer',
    family: 'kuerbisgewaechs',
    icon: '🎃',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 100,
    goodCompanions: ['bohnen'],
    badCompanions: ['gurken', 'kuerbis', 'zucchini'],
    notes: 'Einer der robustesten Kürbisse. Ernten, wenn der Stiel verholzt ist.',
  },
  {
    id: 'gurken',
    name: 'Gurken',
    feeder: 'Starkzehrer',
    family: 'kuerbisgewaechs',
    icon: '🥒',
    accentColor: 'leaf',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 100,
    plantSpacing: 40,
    //      'zuckererbsen' ergänzt (zuckererbsen.good enthält gurken); 'edamame' ergänzt (edamame.good enthält gurken)
    goodCompanions: ['bohnen', 'erbsen', 'salat', 'zuckererbsen', 'edamame'],
    badCompanions: ['tomaten', 'radieschen', 'zucchini', 'hokkaido'],
    notes: 'Wärmeliebend — keine kalten Füße! Mulchen hält den Boden gleichmäßig feucht.',
  },
  {
    id: 'himbeeren',
    name: 'Himbeeren',
    feeder: 'Mittelzehrer',
    family: 'rosengewaechs',
    // Unicode has no raspberry codepoint — grape cluster is the closest
    // visual match for a drupelet/berry cluster.
    icon: '🍇',
    seasonActivities: seasonActivities({
      JUN: 'ernte',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 50,
    goodCompanions: ['tagetes'],
    badCompanions: ['erdbeeren', 'kartoffeln'],
    notes:
      'Sommersorten an zweijährigen Ruten — nach der Ernte zurückschneiden. Herbsthimbeeren komplett bodennah abschneiden.',
  },

  // ---------- Plants added for the 2026 plan ----------

  {
    id: 'artischoke',
    name: 'Artischocke',
    feeder: 'Starkzehrer',
    family: 'korbbluetler',
    icon: '🌿',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 120,
    plantSpacing: 80,
    goodCompanions: ['bohnen', 'erbsen'],
    badCompanions: [],
    notes: 'In milden Lagen mehrjährig — gut mit Laub abdecken im Winter. Knospen ernten, bevor sie sich öffnen.',
  },
  {
    id: 'aubergine',
    name: 'Aubergine',
    feeder: 'Starkzehrer',
    family: 'nachtschatten',
    icon: '🍆',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 80,
    plantSpacing: 60,
    goodCompanions: ['bohnen', 'tagetes', 'paprika'],
    badCompanions: ['kartoffeln'],
    notes: 'Wärmeliebend — Gewächshaus oder geschützter Standort. Junge Früchte glänzend ernten.',
  },
  {
    id: 'paprika',
    name: 'Paprika',
    feeder: 'Starkzehrer',
    family: 'nachtschatten',
    icon: '🫑',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 60,
    plantSpacing: 40,
    goodCompanions: ['tomaten', 'aubergine', 'tagetes', 'salat'],
    badCompanions: ['erbsen', 'bohnen'],
    notes: 'Königsblüte (erste Blüte) entfernen für mehr Ertrag. Liebt warme, geschützte Lagen.',
  },
  {
    id: 'zinnien',
    name: 'Zinnien',
    feeder: 'Schwachzehrer',
    family: 'korbbluetler',
    icon: '🌸',
    accentColor: 'bloom',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 30,
    plantSpacing: 25,
    goodCompanions: ['tomaten', 'gurken', 'zucchini'],
    badCompanions: [],
    notes: 'Lockt Bestäuber an. Verblühtes regelmäßig ausputzen für Nachblüte.',
  },
  {
    id: 'kohlrabi',
    name: 'Kohlrabi',
    feeder: 'Mittelzehrer',
    family: 'kreuzbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      APR: 'pflanzen',
      JUN: 'ernte',
      JUL: 'ernte',
    }),
    rowSpacing: 130,
    plantSpacing: 25,
    goodCompanions: ['salat', 'erbsen', 'rote-bete', 'tomaten'],
    badCompanions: ['weisskohl', 'gruenkohl', 'spitzkohl', 'schwarzkohl'],
    notes: 'Schnell erntereif (8–10 Wochen). Knollen jung ernten, bevor sie holzig werden.',
  },
  {
    id: 'senfsaat',
    name: 'Senfsaat',
    feeder: 'Schwachzehrer',
    family: 'kreuzbluetler',
    icon: '🌱',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      MAI: 'ernte',
      JUN: 'ernte',
    }),
    rowSpacing: 20,
    plantSpacing: 10,
    goodCompanions: [],
    badCompanions: ['weisskohl', 'gruenkohl', 'spitzkohl', 'kohlrabi'],
    notes: 'Hervorragende Gründüngung. Vor der Blüte einarbeiten — Achtung: Kreuzblütler.',
  },
  {
    id: 'tagetes',
    name: 'Tagetes',
    feeder: 'Schwachzehrer',
    family: 'korbbluetler',
    icon: '🌼',
    accentColor: 'pumpkin',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 25,
    plantSpacing: 20,
    goodCompanions: ['tomaten', 'paprika', 'aubergine', 'kartoffeln'],
    badCompanions: [],
    notes: 'Vertreibt Nematoden im Boden — ideal als Begleitpflanze in Gemüsebeeten.',
  },
  {
    id: 'pimentos',
    name: 'Pimentos',
    feeder: 'Starkzehrer',
    family: 'nachtschatten',
    icon: '🌶️',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 60,
    plantSpacing: 40,
    goodCompanions: ['tomaten', 'tagetes', 'salat'],
    badCompanions: ['erbsen', 'bohnen'],
    notes: 'Spanische Mini-Paprika. Grün geerntet mild, rot reif fruchtig — gelegentlich überraschend scharf.',
  },
  {
    id: 'erdbeeren',
    name: 'Erdbeeren',
    feeder: 'Mittelzehrer',
    family: 'rosengewaechs',
    icon: '🍓',
    accentColor: 'strawberry',
    seasonActivities: seasonActivities({
      MAI: 'ernte',
      JUN: 'ernte',
      JUL: 'ernte',
    }),
    rowSpacing: 70,
    plantSpacing: 30,
    goodCompanions: ['salat', 'pfluecksalat', 'lauch', 'zwiebel', 'yas-salat', 'rucola'],
    badCompanions: ['weisskohl', 'gruenkohl', 'spitzkohl', 'himbeeren'],
    notes: 'Nach 3 Jahren Standortwechsel. Stroh unter die Früchte legen — schützt vor Fäulnis.',
  },
  {
    id: 'physalis',
    name: 'Physalis',
    feeder: 'Mittelzehrer',
    family: 'nachtschatten',
    icon: '🟡',
    accentColor: 'pumpkin',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 80,
    plantSpacing: 60,
    goodCompanions: ['bohnen', 'tomaten'],
    badCompanions: ['kartoffeln'],
    notes: 'Ernten, wenn die Lampions papierartig trocken sind und Früchte herabfallen.',
  },
  {
    id: 'zuckererbsen',
    name: 'Zuckererbsen',
    displayName: 'Erbsen',
    feeder: 'Schwachzehrer',
    family: 'huelsenfruechtler',
    icon: '🟢',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      JUN: 'ernte',
      JUL: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 5,
    goodCompanions: ['karotten', 'radieschen', 'gurken'],
    badCompanions: ['bohnen', 'zwiebel', 'lauch'],
    notes: 'Mit ganzer Hülse essbar. Frühzeitig Rankhilfe stellen.',
  },
  {
    id: 'rucola',
    name: 'Rucola',
    feeder: 'Schwachzehrer',
    family: 'kreuzbluetler',
    icon: '🌿',
    seasonActivities: seasonActivities({
      MÄR: 'aussaat',
      APR: 'aussaat',
      MAI: 'ernte',
      JUN: 'ernte',
      SEP: ['aussaat', 'ernte'],
      OKT: 'ernte',
    }),
    rowSpacing: 20,
    plantSpacing: 1,
    goodCompanions: ['salat', 'radieschen', 'erdbeeren'],
    badCompanions: ['weisskohl', 'gruenkohl', 'spitzkohl'],
    notes: 'Wird bei Hitze schnell schärfer und schießt — Sommerpause einlegen, im Herbst neu säen.',
  },
  {
    id: 'edamame',
    name: 'Edamame',
    feeder: 'Schwachzehrer',
    family: 'huelsenfruechtler',
    icon: '🟢',
    seasonActivities: seasonActivities({
      MAI: 'aussaat',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 5,
    goodCompanions: ['gurken', 'salat', 'karotten'],
    badCompanions: ['zwiebel', 'lauch'],
    notes: 'Junge Sojabohnen mit Hülse ernten und kurz in Salzwasser kochen.',
  },
  {
    id: 'kartoffeln',
    name: 'Kartoffeln',
    feeder: 'Starkzehrer',
    family: 'nachtschatten',
    icon: '🥔',
    accentColor: 'leaf',
    seasonActivities: seasonActivities({
      MÄR: 'pflanzen',
      APR: 'pflanzen',
      JUN: 'ernte',
      JUL: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 30,
    goodCompanions: ['bohnen', 'tagetes', 'gruenkohl'],
    badCompanions: ['tomaten', 'aubergine', 'physalis', 'himbeeren'],
    notes: 'Vorgekeimte Knollen pflanzen. Häufeln sobald Triebe 20 cm hoch sind.',
  },
  {
    id: 'schwarzkohl',
    name: 'Schwarzkohl',
    feeder: 'Starkzehrer',
    family: 'kreuzbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      MAI: 'vorziehen',
      JUL: 'pflanzen',
      OKT: 'ernte',
      NOV: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 50,
    goodCompanions: ['salat', 'rote-bete', 'erbsen'],
    badCompanions: ['weisskohl', 'spitzkohl', 'kohlrabi', 'gruenkohl', 'gruenkohl-herbst'],
    notes: 'Italienischer Palmkohl. Frosthart und nach Frost milder im Geschmack.',
  },
  {
    id: 'gruenkohl-herbst',
    name: 'Grünkohl',
    feeder: 'Starkzehrer',
    family: 'kreuzbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      MAI: 'vorziehen',
      JUL: 'pflanzen',
      OKT: 'ernte',
      NOV: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 50,
    goodCompanions: ['salat', 'rote-bete', 'erbsen', 'kartoffeln'],
    badCompanions: ['weisskohl', 'spitzkohl', 'kohlrabi', 'schwarzkohl'],
    notes: 'Spätsatz für die Winterernte. Erst nach dem ersten Frost pflücken — wird dadurch süßer.',
  },
  {
    id: 'blumenstauden',
    name: 'Blumenstauden',
    displayName: 'Stauden',
    feeder: 'Schwachzehrer',
    family: 'kraut',
    icon: '🌷',
    seasonActivities: seasonActivities({
      JUN: 'ernte',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 40,
    plantSpacing: 30,
    goodCompanions: ['tomaten', 'gurken'],
    badCompanions: [],
    notes: 'Mehrjährig — im Herbst zurückschneiden. Gemischter Bestand für lange Blütezeit.',
  },
  {
    id: 'kuerbis',
    name: 'Kürbis',
    feeder: 'Starkzehrer',
    family: 'kuerbisgewaechs',
    icon: '🎃',
    seasonActivities: seasonActivities({
      APR: 'vorziehen',
      MAI: 'pflanzen',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 200,
    plantSpacing: 400,
    goodCompanions: ['bohnen'],
    badCompanions: ['gurken', 'zucchini', 'hokkaido'],
    notes: 'Ranken können viele Quadratmeter belegen. Auf Stroh legen, damit die Frucht nicht fault.',
  },
  {
    id: 'weisskohl',
    name: 'Weißkohl',
    feeder: 'Starkzehrer',
    family: 'kreuzbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      AUG: 'ernte',
      SEP: 'ernte',
      OKT: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 50,
    goodCompanions: ['rote-bete', 'salat', 'erbsen', 'bohnen'],
    badCompanions: ['gruenkohl', 'spitzkohl', 'kohlrabi', 'erdbeeren', 'rucola', 'schwarzkohl'],
    notes: '4-jährige Anbaupause auf demselben Beet (Kohlhernie). Mit Netz vor Kohlweißling schützen.',
  },
  {
    id: 'zwiebel',
    name: 'Zwiebel',
    feeder: 'Mittelzehrer',
    family: 'lauchgewaechs',
    icon: '🧅',
    seasonActivities: seasonActivities({
      MÄR: 'pflanzen',
      APR: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
    }),
    rowSpacing: 25,
    plantSpacing: 10,
    goodCompanions: ['karotten', 'rote-bete', 'erdbeeren', 'tomaten'],
    badCompanions: ['bohnen', 'erbsen', 'edamame', 'zuckererbsen', 'stangenbohnen'],
    notes: 'Trocken ernten und nachtrocknen — dann monatelang lagerbar.',
  },
  {
    id: 'rhabarber',
    name: 'Rhabarber',
    feeder: 'Starkzehrer',
    family: 'knoeterich',
    icon: '🌱',
    seasonActivities: seasonActivities({
      APR: 'ernte',
      MAI: 'ernte',
      JUN: 'ernte',
    }),
    rowSpacing: 120,
    plantSpacing: 100,
    goodCompanions: ['salat'],
    badCompanions: [],
    notes: 'Mehrjährig — Standort gut wählen. Ab Johanni (24. Juni) Ernteschluss, damit die Pflanze regenerieren kann.',
  },
  {
    id: 'spitzkohl',
    name: 'Spitzkohl',
    feeder: 'Starkzehrer',
    family: 'kreuzbluetler',
    icon: '🥬',
    seasonActivities: seasonActivities({
      MÄR: 'vorziehen',
      MAI: 'pflanzen',
      JUL: 'ernte',
      AUG: 'ernte',
    }),
    rowSpacing: 150,
    plantSpacing: 50,
    goodCompanions: ['salat', 'rote-bete', 'erbsen', 'bohnen'],
    badCompanions: ['weisskohl', 'gruenkohl', 'kohlrabi', 'rucola'],
    notes: 'Zarter und schneller als Weißkohl. Ideal für Frühjahrsanbau.',
  },
  {
    id: 'stangenbohnen',
    name: 'Stangenbohnen',
    displayName: 'Bohnen',
    feeder: 'Schwachzehrer',
    family: 'huelsenfruechtler',
    icon: '🫛',
    seasonActivities: seasonActivities({
      MAI: 'aussaat',
      JUL: 'ernte',
      AUG: 'ernte',
      SEP: 'ernte',
    }),
    rowSpacing: 80,
    plantSpacing: 15,
    goodCompanions: ['gurken', 'salat', 'rote-bete'],
    badCompanions: ['zwiebel', 'lauch', 'erbsen'],
    notes: 'Brauchen 2 m hohe Stangen oder ein Bohnentipi. Erst nach den Eisheiligen säen.',
  },
]

/** Look up a plant by its id. Returns undefined if no such plant exists. */
export function findPlantById(id: PlantId): Plant | undefined {
  return PLANTS.find((p) => p.id === id)
}

/**
 * Derive the dominant accent color of a Patch from its bedding.
 *
 * Rule: the first plant in the bedding wins. Empty beds and beds whose
 * first plant cannot be resolved have no accent (returns undefined),
 * letting the renderer fall back to the neutral soil look.
 *
 * The "first plant wins" rule keeps the visual stable while editing —
 * reordering bedding deliberately changes the bed's identity, which
 * is the right mental model for a gardener thinking about lead crops.
 */
export function patchAccent(bedding: readonly Bedding[]): AccentColor | undefined {
  const lead = bedding[0]
  if (!lead) return undefined
  const plant = findPlantById(lead.plantId)
  if (!plant) return undefined
  return plantAccent(plant)
}
