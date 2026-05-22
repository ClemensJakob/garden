import { Link, useParams } from 'react-router-dom'
import { usePatchDetails } from '../hooks/usePatchDetails'
import { findPlantById } from '../domain/plants'
import SeasonPlan from '../components/SeasonPlan'
import type { Plant } from '../domain/types'

/**
 * Patch detail page (`/patches/:number`).
 *
 * Layout follows the second mockup: back button, header card with name
 * and plant count badge, "Bepflanzung" list, and "Saison-Plan" section.
 */
export default function DetailPage() {
  const { number: numberParam } = useParams<{ number: string }>()
  const patchNumber = numberParam ? Number.parseInt(numberParam, 10) : undefined
  const patch = usePatchDetails(patchNumber)

  if (!patch) {
    return (
      <main className="flex flex-col items-center gap-3 p-4 bg-garden-bg min-h-screen">
        <h1 className="text-lg font-semibold text-patch-text">Beet nicht gefunden</h1>
        <p className="text-sm text-patch-text/60">Beet #{numberParam} existiert nicht.</p>
        <Link
          to="/"
          className="rounded border border-patch-border px-3 py-1 text-sm text-patch-text hover:bg-patch-hover transition-colors"
        >
          ← Zurück
        </Link>
      </main>
    )
  }

  const plants: Plant[] = patch.bedding
    .map((b) => findPlantById(b.plantId))
    .filter((p): p is Plant => p !== undefined)

  return (
    <main className="flex flex-col gap-2 bg-garden-bg p-3 min-h-screen">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-1 rounded bg-patch-border px-3 py-1 text-xs font-semibold text-patch-text"
      >
        ‹ Garten
      </Link>

      {/* Header card */}
      <section className="rounded border border-patch-border bg-patch p-3 shadow-sm">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h1 className="text-lg font-bold text-patch-text">{patch.label}</h1>
          </div>
          <span className="rounded bg-patch-border px-2 py-0.5 text-xs font-semibold text-patch-text">
            {plants.length} {plants.length === 1 ? 'Pflanze' : 'Pflanzen'}
          </span>
        </div>
      </section>

      {/* Bepflanzung */}
      <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
        <h2 className="text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
          Bepflanzung
        </h2>
        {plants.length === 0 ? (
          <p className="mt-1 text-xs text-patch-text/60">Keine Pflanzen.</p>
        ) : (
          <ul className="mt-1 divide-y divide-patch-border/30">
            {plants.map((plant) => (
              <li key={plant.id} className="flex items-center justify-between gap-2 py-1.5">
                <div>
                  <p className="text-sm font-bold text-patch-text">{plant.name}</p>
                  <p className="text-xs text-patch-text/60">
                    {plant.feeder} · {plant.light}
                  </p>
                </div>
                <span aria-hidden="true" className="text-patch-border">
                  ›
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saison-Plan */}
      <section className="rounded border border-patch-border bg-white p-3 shadow-sm">
        <h2 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-patch-text/50">
          Saison-Plan
        </h2>
        <SeasonPlan plants={plants} />
      </section>
    </main>
  )
}
