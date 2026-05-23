import GardenLayout from '../components/GardenLayout'

/**
 * The home screen — a top-down view of the garden showing every patch
 * (Beet) and storage unit at its fixed position.
 */
export default function MainPage() {
  return (
    <main className="flex h-[100dvh] items-center justify-center bg-garden-bg">
      <h1 className="sr-only">Garden</h1>
      <GardenLayout />
    </main>
  )
}
