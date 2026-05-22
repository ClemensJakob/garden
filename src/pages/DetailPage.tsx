import { Link, useParams } from 'react-router-dom'

export default function DetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-semibold">Item {id}</h1>
      <p className="text-gray-500">Detail view for item #{id}.</p>
      <Link
        to="/"
        className="rounded-lg border border-gray-200 px-4 py-2 hover:bg-gray-50 transition-colors"
      >
        ← Back to list
      </Link>
    </main>
  )
}
