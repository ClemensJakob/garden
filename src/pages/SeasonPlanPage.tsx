import SeasonPlan from '../components/SeasonPlan'
import GardenButton from '../components/GardenButton'
import { PLANTS } from '../domain/plants'

const PLANTS_SORTED = [...PLANTS].sort((a, b) => a.name.localeCompare(b.name, 'de'))

/**
 * Full-garden season plan page (`/season-plan`).
 *
 * Shows a back button to the garden layout and a scrollable list view
 * of the season plan for all plants.
 */
export default function SeasonPlanPage() {
  return (
    <main className="flex flex-col gap-3 bg-garden-bg p-3 min-h-screen">
      {/* Back button */}
      <GardenButton to="/">‹ Garten</GardenButton>

      {/* Header */}
      <section className="rounded border border-patch-border bg-patch p-3 shadow-sm">
        <h1 className="text-lg font-bold text-patch-text">Saison-Plan</h1>
        <p className="text-xs text-patch-text/60 mt-0.5">Alle Pflanzen im Überblick</p>
      </section>

      {/* Season plan list */}
      <section className="rounded border border-patch-border bg-white p-3 shadow-sm overflow-x-auto">
        <SeasonPlan plants={PLANTS_SORTED} />
      </section>
    </main>
  )
}
