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

/**
 * Per-month list of statuses. An empty array means the month is idle.
 * The renderer is responsible for splitting a month cell visually when
 * multiple statuses are present.
 */
export type SeasonPlan = Record<SeasonMonth, readonly SeasonStatus[]>

export interface Plant {
  readonly id: PlantId
  readonly name: string
  readonly feeder: Feeder
  readonly seasonPlan: SeasonPlan
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
