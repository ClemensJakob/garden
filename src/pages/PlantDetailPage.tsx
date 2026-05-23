import { Link, useLocation, useParams } from 'react-router-dom'
import { findPlantById, PLANTS } from '../domain/plants'
import SeasonPlan from '../components/SeasonPlan'
import GardenButton from '../components/GardenButton'
import type { Plant, PlantId, SeasonActivity, SeasonStatus } from '../domain/types'
import { SEASON_STATUS_ORDER } from '../domain/types'

/** Human-readable German label per activity status. */
const STATUS_LABEL: Record<SeasonStatus, string> = {
  vorziehen: 'Vorziehen',
  aussaat: 'Aussaat',
  pflanzen: 'Pflanzen',
  ernte: 'Ernte',
}

interface BackState {
  /** Optional patch number the user came from (for the back link). */
  fromPatchNumber?: number
}

/**
 * Plant detail page (`/plants/:id`).
 *
 * Shows everything we know about a single plant from the catalog:
 * feeder type, spacing recommendations, companions and notes, plus
 * the season-plan row.
 *
 * The "back" link prefers returning to the patch the user navigated
 * from (via router `state.fromPatchNumber`); otherwise it goes home.
 */
export default function PlantDetailPage() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const state = (location.state ?? {}) as BackState

  const plant = id ? findPlantById(id) : undefined

  const back =
    state.fromPatchNumber !== undefined
      ? { to: `/patches/${state.fromPatchNumber}`, label: `‹ Beet ${state.fromPatchNumber}` }
      : { to: '/', label: '‹ Garten' }

  if (!plant) {
    return (
      <main className="flex flex-col items-center gap-3 p-4 bg-garden-bg min-h-screen">
        <h1 className="text-lg font-semibold text-patch-text">Pflanze nicht gefunden</h1>
        <p className="text-sm text-patch-text/60">Pflanze „{id}“ existiert nicht.</p>
        <GardenButton to={back.to}>{back.label}</GardenButton>
      </main>
    )
  }

  return (
    <main className="flex flex-col gap-2 bg-garden-bg p-3 min-h-screen">
      {/* Back button */}
      <GardenButton to={back.to}>{back.label}</GardenButton>

      {/* Header */}
      <section className="rounded border border-patch-border bg-patch p-3 shadow-sm">
        <h1 className="text-lg font-bold text-patch-text">{plant.name}</h1>
        <p className="mt-0.5 text-xs text-patch-text/60">{plant.feeder}</p>
      </section>

      {/* Spacing */}
      <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
          Abstände
        </h2>
        <dl className="mt-1 grid grid-cols-2 gap-y-1 text-sm">
          <dt className="text-patch-text/60">Reihenabstand</dt>
          <dd className="text-right font-semibold text-patch-text">{plant.rowSpacing} cm</dd>
          <dt className="text-patch-text/60">Pflanzabstand</dt>
          <dd className="text-right font-semibold text-patch-text">{plant.plantSpacing} cm</dd>
        </dl>
      </section>

      {/* Companions */}
      <CompanionsSection
        title="Gute Nachbarn"
        ids={plant.goodCompanions}
        emptyText="Keine guten Nachbarn vermerkt."
        fromPatchNumber={state.fromPatchNumber}
      />
      <CompanionsSection
        title="Schlechte Nachbarn"
        ids={plant.badCompanions}
        emptyText="Keine schlechten Nachbarn vermerkt."
        fromPatchNumber={state.fromPatchNumber}
      />

      {/* Activities — explicit listing of which months a plant is
          vorgezogen, gesät, gepflanzt and geerntet. A plant may have
          any of these activities in multiple months. */}
      <ActivitiesSection activities={plant.seasonActivities} />

      {/* Notes */}
      <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
          Besonderheiten
        </h2>
        {plant.notes ? (
          <p className="mt-1 text-sm text-patch-text">{plant.notes}</p>
        ) : (
          <p className="mt-1 text-xs text-patch-text/60">Keine Besonderheiten.</p>
        )}
      </section>

      {/* Saison-Plan (single-plant) */}
      <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
        <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
          Saison-Plan
        </h2>
        <SeasonPlan plants={[plant]} />
      </section>
    </main>
  )
}

interface CompanionsSectionProps {
  title: string
  ids: readonly PlantId[]
  emptyText: string
  fromPatchNumber?: number
}

/**
 * Resolve a list of companion ids against the plant catalog and render
 * them as links to the respective plant detail pages. Unknown ids are
 * silently skipped to keep the UI clean.
 */
function CompanionsSection({ title, ids, emptyText, fromPatchNumber }: CompanionsSectionProps) {
  const resolved: Plant[] = ids
    .map((cid) => PLANTS.find((p) => p.id === cid))
    .filter((p): p is Plant => p !== undefined)

  return (
    <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
        {title}
      </h2>
      {resolved.length === 0 ? (
        <p className="mt-1 text-xs text-patch-text/60">{emptyText}</p>
      ) : (
        <ul className="mt-1 flex flex-wrap gap-1">
          {resolved.map((p) => (
            <li key={p.id}>
              <Link
                to={`/plants/${p.id}`}
                state={{ fromPatchNumber }}
                className="inline-block rounded bg-patch-border/40 px-2 py-0.5 text-xs font-semibold text-patch-text hover:bg-patch-border transition-colors"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/**
 * Renders one row per `SeasonActivity` on the plant: the activity
 * label (Vorziehen / Aussaat / Pflanzen / Ernte) followed by the
 * months in which it takes place. Activities the plant does not
 * have are omitted entirely.
 *
 * This makes the multi-month nature of each activity textually
 * explicit — complementing the visual SeasonPlan calendar below.
 */
function ActivitiesSection({ activities }: { activities: readonly SeasonActivity[] }) {
  const byStatus = new Map<SeasonStatus, SeasonActivity>()
  for (const a of activities) byStatus.set(a.status, a)
  const ordered = SEASON_STATUS_ORDER.flatMap((s) => {
    const a = byStatus.get(s)
    return a ? [a] : []
  })

  return (
    <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
      <h2 className="text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
        Anbau-Zeitplan
      </h2>
      {ordered.length === 0 ? (
        <p className="mt-1 text-xs text-patch-text/60">Keine Anbauzeiten hinterlegt.</p>
      ) : (
        <dl className="mt-1 grid grid-cols-[6rem_1fr] items-center gap-y-1 text-sm">
          {ordered.map((a) => (
            <ActivityRow key={a.status} activity={a} />
          ))}
        </dl>
      )}
    </section>
  )
}

function ActivityRow({ activity }: { activity: SeasonActivity }) {
  return (
    <>
      <dt className="text-patch-text/60">{STATUS_LABEL[activity.status]}</dt>
      <dd
        className="flex flex-wrap justify-end gap-1"
        aria-label={`${STATUS_LABEL[activity.status]}: ${activity.months.join(', ')}`}
      >
        {activity.months.map((m) => (
          <span
            key={m}
            className="rounded bg-patch-border/40 px-1.5 py-0.5 text-xs font-semibold text-patch-text"
          >
            {m}
          </span>
        ))}
      </dd>
    </>
  )
}
