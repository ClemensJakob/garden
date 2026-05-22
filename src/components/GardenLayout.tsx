import { PATCHES } from '../domain/patches'
import { STORAGE_UNITS } from '../domain/storageUnits'
import PatchTile from './PatchTile'
import StorageUnitTile from './StorageUnitTile'

function patch(n: number) {
  return PATCHES.find((p) => p.number === n)!
}

/**
 * The garden layout: a 4-column × 14-row CSS grid that places every
 * Patch and StorageUnit at its fixed position.
 *
 * Grid positions are expressed directly as Tailwind utility classes here.
 * Column 1 — wide left column (~40%)
 * Column 2 — narrow spacer / path
 * Columns 3–4 — right-side patches
 */
export default function GardenLayout() {
  return (
    <div
      className="grid w-full h-screen max-w-md gap-2 grid-cols-12 grid-rows-[repeat(22,minmax(0,1fr))] bg-garden-bg p-2"
      role="region"
      aria-label="Garten-Layout"
    >
      <PatchTile patch={patch(11)}     className="col-start-1 col-span-5 row-start-1 row-span-1" />
      <PatchTile patch={patch(10)}  className="col-start-1 col-span-5 row-start-2 row-span-2" />
      <PatchTile patch={patch(9)}   className="col-start-1 col-span-5 row-start-4 row-span-2" />
      <PatchTile patch={patch(8)}   className="col-start-1 col-span-5 row-start-6 row-span-2" />
      <PatchTile patch={patch(7)}   className="col-start-1 col-span-5 row-start-8 row-span-2" />
      <PatchTile patch={patch(6)}   className="col-start-1 col-span-5 row-start-10 row-span-2" />
      <PatchTile patch={patch(5)}   className="col-start-1 col-span-5 row-start-12 row-span-2" />
      <PatchTile patch={patch(4)}   className="col-start-1 col-span-5 row-start-14 row-span-2" />
      <PatchTile patch={patch(3)}   className="col-start-1 col-span-5 row-start-16 row-span-2" />
      <PatchTile patch={patch(2)}   className="col-start-1 col-span-5 row-start-18 row-span-2" />
      <PatchTile patch={patch(1)}   className="col-start-1 col-span-5 row-start-20 row-span-2" />

      {/*Mitte*/}
      <PatchTile patch={patch(12)} className="col-start-6 col-span-4 row-start-1" />
      <PatchTile patch={patch(13)} className="col-start-7 col-span-4 row-start-5 row-span-11" />

      {/*Rechts*/}
      <PatchTile patch={patch(14)} className="col-start-11 col-span-3 row-start-5 row-span-11" />
      <PatchTile patch={patch(15)} className="col-start-10 col-span-4 row-start-1" />
      <PatchTile patch={patch(16)} className="col-start-10 col-span-3 row-start-2 row-span-3" />


      <PatchTile patch={patch(17)} className="col-start-7 col-span-6 row-start-20 row-span-2" />
      <StorageUnitTile unit={STORAGE_UNITS.find((u) => u.id === 'schuppen')!} className="col-start-10 col-span-3 row-start-17 row-span-2" />
      <StorageUnitTile unit={STORAGE_UNITS.find((u) => u.id === 'kiste')!} className="col-start-7 col-span-3 row-start-17 row-span-2" />
    </div>
  )
}
