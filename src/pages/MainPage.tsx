import GardenLayout from '../components/GardenLayout'

/**
 * The home screen — a top-down view of the garden showing every patch
 * (Beet) and storage unit at its fixed position.
 */
export default function MainPage() {
  return (
    <main className="flex flex-col justify-center items-center gap-6 bg-gray-50 p-2 min-h-screen">
      <h1 className="sr-only">Garden</h1>
      <GardenLayout />
    </main>
  )
}
