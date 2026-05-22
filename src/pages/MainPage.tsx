import { Link } from 'react-router-dom'

const ITEMS = [1, 2, 3, 4, 5]

export default function MainPage() {
  return (
    <main className="flex flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-semibold">Garden</h1>
      <p className="text-gray-500">Select an item to view its details.</p>
      <ul className="flex flex-col gap-3 w-full max-w-sm">
        {ITEMS.map((id) => (
          <li key={id}>
            <Link
              to={`/${id}`}
              className="block rounded-lg border border-gray-200 px-4 py-3 text-center hover:bg-gray-50 transition-colors"
            >
              Item {id}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
