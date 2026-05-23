/**
 * Domain types for the garden management app.
 *
 * Aggregate roots: Plant, Patch, StorageUnit.
 * Value objects: Bedding (on Patch), Tool (on StorageUnit).
 *
 * A Patch is a fixed physical bed identified by its `number`. Patches may
 * carry one or more plants in their `bedding`. The Bedding value object
 * references a Plant by id and adds patch-specific metadata (e.g. when it
 * was planted). Plants live in their own catalog and are reused across
 * patches.
 *
 * Grid positions (GridArea) are a presentation concern and live in
 * `src/layout/gardenLayout.ts`, not in the domain types.
 */

// ---------- Plant ----------

export type PlantId = string

/** Nutrient need of a plant (used to plan rotation). */
export type Feeder = 'Starkzehrer' | 'Mittelzehrer' | 'Schwachzehrer'

/**
 * Botanical family — used both for crop rotation reasoning and for
 * visual styling (each family has a characteristic accent color in
 * the garden layout).
 *
 * The set is intentionally pragmatic — only families actually present
 * in this garden are modelled. New families can be added as the plant
 * catalog grows.
 *
 * - `nachtschatten`     — Solanaceae (Tomate, Paprika, Aubergine, Kartoffel, Physalis)
 * - `kuerbisgewaechs`   — Cucurbitaceae (Kürbis, Zucchini, Gurke, Hokkaido)
 * - `kreuzbluetler`     — Brassicaceae (Kohl, Rucola, Senf, Radieschen)
 * - `huelsenfruechtler` — Fabaceae (Bohnen, Erbsen, Edamame)
 * - `doldenbluetler`    — Apiaceae (Karotten)
 * - `gaensefussgewaechs`— Amaranthaceae (Rote Bete, Mangold)
 * - `lauchgewaechs`     — Alliaceae (Zwiebel, Lauch)
 * - `korbbluetler`      — Asteraceae (Salat, Artischocke, Tagetes, Zinnien)
 * - `rosengewaechs`     — Rosaceae (Erdbeeren, Himbeeren)
 * - `knoeterich`        — Polygonaceae (Rhabarber)
 * - `kraut`             — herb-like fillers (Blumenstauden as a placeholder)
 */
export type PlantFamily =
  | 'nachtschatten'
  | 'kuerbisgewaechs'
  | 'kreuzbluetler'
  | 'huelsenfruechtler'
  | 'doldenbluetler'
  | 'gaensefussgewaechs'
  | 'lauchgewaechs'
  | 'korbbluetler'
  | 'rosengewaechs'
  | 'knoeterich'
  | 'kraut'

/**
 * A semantic accent color for a plant or family. Maps to a Tailwind
 * color class group in the layout — kept as a small token set rather
 * than raw hex values so that styling remains centralised.
 */
export type AccentColor =
  | 'tomato'        // warm red
  | 'pumpkin'       // pumpkin orange
  | 'leaf'          // leafy green (kale, kohl)
  | 'pea'           // fresh light green (peas, beans)
  | 'carrot'        // carrot orange
  | 'beet'          // deep magenta (beetroot)
  | 'onion'         // onion / leek pale green-purple
  | 'lettuce'       // soft yellow-green
  | 'strawberry'    // strawberry pink
  | 'rhubarb'       // rhubarb pink-red
  | 'bloom'         // flower pink/magenta (zinnia, blumenstauden)

/** Default accent color per family. Plants may override via `Plant.accentColor`. */
export const FAMILY_ACCENT: Record<PlantFamily, AccentColor> = {
  nachtschatten: 'tomato',
  kuerbisgewaechs: 'pumpkin',
  kreuzbluetler: 'leaf',
  huelsenfruechtler: 'pea',
  doldenbluetler: 'carrot',
  gaensefussgewaechs: 'beet',
  lauchgewaechs: 'onion',
  korbbluetler: 'lettuce',
  rosengewaechs: 'strawberry',
  knoeterich: 'rhubarb',
  kraut: 'bloom',
}

/** Months covered by the season plan in the mockup. */
export type SeasonMonth =
  | 'MÄR'
  | 'APR'
  | 'MAI'
  | 'JUN'
  | 'JUL'
  | 'AUG'
  | 'SEP'
  | 'OKT'
  | 'NOV'

export const SEASON_MONTHS: readonly SeasonMonth[] = [
  'MÄR',
  'APR',
  'MAI',
  'JUN',
  'JUL',
  'AUG',
  'SEP',
  'OKT',
  'NOV',
] as const

/**
 * What is happening with a plant in a given month. A month can hold
 * multiple statuses simultaneously (e.g. a late aussaat overlapping
 * with an early ernte).
 *
 * - `vorziehen`: indoor pre-cultivation (Vorziehen) before outdoor planting
 * - `aussaat`:   direct sowing into the bed (Aussaat)
 * - `pflanzen`:  setting out young plants into the bed (Pflanzen)
 * - `ernte`:     harvest (Ernte)
 */
export type SeasonStatus = 'vorziehen' | 'aussaat' | 'pflanzen' | 'ernte'

/** Stable display order for activities — used by the UI legend and listings. */
export const SEASON_STATUS_ORDER: readonly SeasonStatus[] = [
  'vorziehen',
  'aussaat',
  'pflanzen',
  'ernte',
] as const

/**
 * A SeasonActivity is a value object on a Plant describing one
 * recurring activity (vorziehen, aussaat, pflanzen or ernte) and
 * the months in which it takes place.
 *
 * This makes "a plant can be vorgezogen / gesät / gepflanzt /
 * geerntet across multiple months" first-class in the domain —
 * rather than spreading the concept across per-month buckets.
 *
 * Invariants (enforced by `seasonActivity` factory in plants.ts):
 *   - `months` is non-empty
 *   - `months` contains no duplicates
 *   - `months` is sorted in calendar order (MÄR → NOV)
 */
export interface SeasonActivity {
  readonly status: SeasonStatus
  readonly months: readonly SeasonMonth[]
}

/**
 * Per-month list of statuses. An empty array means the month is idle.
 * The renderer is responsible for splitting a month cell visually when
 * multiple statuses are present.
 *
 * This is a derived, presentation-friendly view of a Plant's
 * `seasonActivities` — see `toSeasonPlan` in plants.ts.
 */
export type SeasonPlan = Record<SeasonMonth, readonly SeasonStatus[]>

export interface Plant {
  readonly id: PlantId
  readonly name: string
  /**
   * Short display name shown on the Patch tile. When present, this is
   * used instead of `name` in dense UI contexts (e.g. the garden layout).
   * Falls back to `name` when absent.
   *
   * Examples: "Bohnen" for "Stangenbohnen", "Erbsen" for "Zuckererbsen",
   * "Stauden" for "Blumenstauden".
   */
  readonly displayName?: string
  readonly feeder: Feeder
  /**
   * Botanical family. Drives both crop-rotation reasoning (plants of
   * the same family shouldn't follow each other on a bed) and the
   * default visual accent of beds growing this plant.
   */
  readonly family: PlantFamily
  /**
   * Optional override of the family's default accent color — for
   * plants whose visual identity differs from the family default
   * (e.g. Erdbeeren render pink even though Rosaceae could lean red).
   */
  readonly accentColor?: AccentColor
  /**
   * Visual short-form glyph for the plant. A single character (emoji
   * is fine) used as a quick identifier next to the plant name in
   * dense UI like the patch tile. Optional — falls back to a generic
   * leaf glyph in the renderer.
   */
  readonly icon?: string
  /**
   * Canonical season model: which activities the plant requires and
   * in which months. A plant may have at most one activity per
   * SeasonStatus (e.g. exactly one "ernte" entry listing all harvest
   * months), but is free to combine all four statuses.
   */
  readonly seasonActivities: readonly SeasonActivity[]
  /** Distance between rows, in centimetres. */
  readonly rowSpacing: number
  /** Distance between plants within a row, in centimetres. */
  readonly plantSpacing: number
  /** Plants known to thrive next to this one. */
  readonly goodCompanions: readonly PlantId[]
  /** Plants known to harm this one when planted nearby. */
  readonly badCompanions: readonly PlantId[]
  /** Free-form remarks ("Besonderheiten"). */
  readonly notes: string
}

/**
 * Resolve a plant's effective accent color: explicit override wins,
 * otherwise the family default. Pure function — safe to call in
 * render paths.
 */
export function plantAccent(plant: Plant): AccentColor {
  return plant.accentColor ?? FAMILY_ACCENT[plant.family]
}

// ---------- Patch ----------

/**
 * A bedding is a value object on a Patch describing one plant occupying
 * (part of) the patch, plus contextual metadata.
 *
 * Naming: matches the German UI term "Bepflanzung" used in the mockup.
 */
export interface Bedding {
  readonly plantId: PlantId
  readonly plantedAt?: Date
  readonly note?: string
}

/**
 * Visual variant of a patch tile. Most patches use the default white
 * card; a few special ones (Kompost, Kräuter, Beerenobst) get distinct
 * styling while remaining first-class Patches in the domain.
 */
export type PatchVariant = 'default' | 'kompost' | 'kraeuter' | 'beere'

export interface Patch {
  readonly number: number
  readonly label: string
  readonly variant: PatchVariant
  readonly bedding: readonly Bedding[]
}

// ---------- StorageUnit ----------

export type StorageUnitId = string

/** A tool stored in a StorageUnit. Value object — has no identity outside its unit. */
export interface Tool {
  readonly name: string
}

export interface StorageUnit {
  readonly id: StorageUnitId
  readonly label: string
  readonly tools: readonly Tool[]
}
