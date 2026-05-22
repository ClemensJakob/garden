import type { Plant, SeasonStatus } from '../domain/types'
import { SEASON_MONTHS } from '../domain/types'

interface SeasonPlanProps {
  plants: readonly Plant[]
}

/** Tailwind background classes by status — semantic garden colours. */
function statusColor(status: SeasonStatus): string {
  switch (status) {
    case 'vorziehen':
      return 'bg-sky-400'
    case 'aussaat':
      return 'bg-amber-400'
    case 'pflanzen':
      return 'bg-emerald-500'
    case 'ernte':
      return 'bg-orange-500'
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
 * Renders a single month cell. When a month has multiple statuses we
 * split the cell into equal vertical slices, one per status, in the
 * order [aussaat, pflanzen, ernte]. An idle (empty) month renders as
 * a single grey block.
 */
function MonthCell({
  statuses,
  isCurrent,
  ariaLabel,
}: {
  statuses: readonly SeasonStatus[]
  isCurrent: boolean
  ariaLabel: string
}) {
  const border = isCurrent ? 'border-2 border-black' : 'border border-transparent'

  if (statuses.length === 0) {
    return (
      <span
        className={`h-5 rounded-sm bg-gray-100 ${border}`}
        aria-label={ariaLabel}
      />
    )
  }

  // Stable status order so visual layout is predictable across plants.
  const order: readonly SeasonStatus[] = ['vorziehen', 'aussaat', 'pflanzen', 'ernte']
  const active = order.filter((s) => statuses.includes(s))

  return (
    <span
      className={`flex h-5 overflow-hidden rounded-sm ${border}`}
      aria-label={ariaLabel}
    >
      {active.map((s) => (
        <span key={s} className={`flex-1 ${statusColor(s)}`} />
      ))}
    </span>
  )
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
            {plant.name}
          </span>
          {SEASON_MONTHS.map((month, i) => {
            const statuses = plant.seasonPlan[month]
            const label =
              statuses.length === 0
                ? `${plant.name} ${month}: idle`
                : `${plant.name} ${month}: ${statuses.join(', ')}`
            return (
              <MonthCell
                key={month}
                statuses={statuses}
                isCurrent={i === currentIdx}
                ariaLabel={label}
              />
            )
          })}
        </div>
      ))}

      {/* Legend */}
      <div className="mt-3 flex flex-wrap justify-end gap-3 text-[11px] text-gray-500">
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-sky-400" /> Vorziehen
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-amber-400" /> Aussaat
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-emerald-500" /> Pflanzen
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-sm bg-orange-500" /> Ernte
        </span>
      </div>
    </div>
  )
}
