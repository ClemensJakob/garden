import type { Plant, SeasonStatus } from '../domain/types'
import { SEASON_MONTHS } from '../domain/types'

interface SeasonPlanProps {
  plants: readonly Plant[]
}

/** Tailwind background classes by status — black/dark/light gray to match the mockup. */
function cellClass(status: SeasonStatus, isCurrent: boolean): string {
  const base = isCurrent ? 'border-2 border-black' : 'border border-transparent'
  switch (status) {
    case 'säen':
      return `${base} bg-black`
    case 'pflanzen':
      return `${base} bg-gray-700`
    case 'ernte':
      return `${base} bg-gray-300`
    case 'idle':
    default:
      return `${base} bg-gray-100`
  }
}

/** Capture the current month index (0-based into SEASON_MONTHS), or -1 if outside the season. */
function currentSeasonIndex(): number {
  // SEASON_MONTHS = ['MÄR', ..., 'NOV'] — month 2 (March) → index 0.
  const m = new Date().getMonth() // 0 = Jan
  if (m < 2 || m > 10) return -1
  return m - 2
}

/**
 * Renders the SAISON-PLAN section: a header row with month abbreviations
 * (MÄR–NOV), one row per plant showing its monthly status, and a legend.
 *
 * The component is purely presentational and reads everything from the
 * Plant aggregates passed in.
 */
export default function SeasonPlan({ plants }: SeasonPlanProps) {
  const currentIdx = currentSeasonIndex()

  if (plants.length === 0) {
    return (
      <p className="text-sm text-gray-500">Noch keine Pflanzen für den Saison-Plan.</p>
    )
  }

  return (
    <div>
      {/* Month header */}
      <div
        className="grid items-center gap-1 text-[10px] font-semibold tracking-wider text-gray-400"
        style={{ gridTemplateColumns: `5rem repeat(${SEASON_MONTHS.length}, minmax(0, 1fr))` }}
      >
        <span aria-hidden="true" />
        {SEASON_MONTHS.map((m, i) => (
          <span
            key={m}
            className={`text-center ${i === currentIdx ? 'text-black' : ''}`}
          >
            {m}
          </span>
        ))}
      </div>

      {/* One row per plant */}
      {plants.map((plant) => (
        <div
          key={plant.id}
          className="mt-2 grid items-center gap-1"
          style={{ gridTemplateColumns: `5rem repeat(${SEASON_MONTHS.length}, minmax(0, 1fr))` }}
        >
          <span className="truncate text-sm font-semibold text-gray-900">
            {plant.name.slice(0, 3)}
          </span>
          {SEASON_MONTHS.map((month, i) => (
            <span
              key={month}
              className={`h-5 rounded-sm ${cellClass(plant.seasonPlan[month], i === currentIdx)}`}
              aria-label={`${plant.name} ${month}: ${plant.seasonPlan[month]}`}
            />
          ))}
        </div>
      ))}

      {/* Legend */}
      <div className="mt-3 flex justify-end gap-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 bg-black" /> Säen
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 bg-gray-700" /> Pflanzen
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 bg-gray-300" /> Ernte
        </span>
      </div>
    </div>
  )
}
