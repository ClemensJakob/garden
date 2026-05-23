import { useParams } from 'react-router-dom'
import GardenButton from '../components/GardenButton'

/**
 * Storage unit detail page (`/storage/:id`).
 *
 * Placeholder page — not yet implemented.
 * Shows the storage unit id in the header and a back button to the garden.
 */
export default function StorageDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <main className="flex flex-col gap-2 bg-garden-bg p-3 min-h-screen">
      {/* Back button */}
      <GardenButton to="/">‹ Garten</GardenButton>

      {/* Header card */}
      <section className="rounded border border-patch-border bg-patch p-3 shadow-sm">
        <h1 className="text-lg font-bold text-patch-text capitalize">{id}</h1>
      </section>

      {/* Placeholder content */}
      <section className="rounded border border-patch-border bg-white p-6 shadow-sm flex items-center justify-center">
        <p className="text-sm text-patch-text/60">Noch nicht implementiert</p>
      </section>
    </main>
  )
}
