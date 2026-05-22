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
      <main className="flex flex-col items-center gap-4 p-6">
        <h1 className="text-2xl font-semibold">Beet nicht gefunden</h1>
        <p className="text-gray-500">Beet #{numberParam} existiert nicht.</p>
        <Link
          to="/"
          className="rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors"
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
    <main className="flex flex-col gap-3 bg-gray-50 p-4 min-h-screen">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex w-fit items-center gap-1 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white"
      >
        ‹ {patch.label}
      </Link>

      {/* Header card */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold">{patch.label}</h1>
            <p className="text-sm text-gray-500">Beet</p>
          </div>
          <span className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white">
            {plants.length} {plants.length === 1 ? 'Pflanze' : 'Pflanzen'}
          </span>
        </div>
      </section>

      {/* Bepflanzung */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Bepflanzung
        </h2>
        {plants.length === 0 ? (
          <p className="mt-2 text-sm text-gray-500">Keine Pflanzen.</p>
        ) : (
          <ul className="mt-2 divide-y divide-gray-100">
            {plants.map((plant) => (
              <li key={plant.id} className="flex items-center justify-between gap-3 py-2">
                <div>
                  <p className="text-base font-bold">{plant.name}</p>
                  <p className="text-sm text-gray-500">
                    {plant.feeder} · {plant.light}
                  </p>
                </div>
                <span aria-hidden="true" className="text-gray-300">
                  ›
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Saison-Plan */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
          Saison-Plan
        </h2>
        <SeasonPlan plants={plants} />
      </section>
    </main>
  )
}
