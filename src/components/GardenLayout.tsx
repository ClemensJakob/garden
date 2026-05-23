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
      className="grid h-[100dvh] w-full max-w-md grid-cols-12 grid-rows-[repeat(22,minmax(0,1fr))] gap-2 bg-garden-bg p-2 mx-auto"
      role="region"
      aria-label="Garten-Layout"
    >
      <PatchTile patch={patch(11)} className="col-span-5 col-start-1 row-span-1 row-start-1" />
      <PatchTile patch={patch(10)} className="col-span-5 col-start-1 row-span-1 row-start-2" />
      <PatchTile patch={patch(9)} className="col-span-5 col-start-1 row-span-2 row-start-3" />
      <PatchTile patch={patch(8)} className="col-span-5 col-start-1 row-span-2 row-start-5" />
      <PatchTile patch={patch(7)} className="col-span-5 col-start-1 row-span-2 row-start-7" />
      <PatchTile patch={patch(6)} className="col-span-5 col-start-1 row-span-2 row-start-9" />
      <PatchTile patch={patch(5)} className="col-span-5 col-start-1 row-span-2 row-start-11" />
      <PatchTile patch={patch(4)} className="col-span-5 col-start-1 row-span-2 row-start-13" />
      <PatchTile patch={patch(3)} className="col-span-5 col-start-1 row-span-2 row-start-15" />
      <PatchTile patch={patch(2)} className="col-span-5 col-start-1 row-span-2 row-start-17" />
      <PatchTile patch={patch(1)} className="col-span-5 col-start-1 row-span-2 row-start-19" />

      {/*Mitte*/}
      <PatchTile patch={patch(12)} className="col-span-4 col-start-6 row-start-1" />
      <PatchTile
        id="tomatenbeet"
        patch={patch(13)}
        className="col-span-3 col-start-7 row-span-11 row-start-5"
      />

      {/*Rechts*/}
      <PatchTile
        id="gemuesehuegel"
        patch={patch(14)}
        className="col-span-3 col-start-10 row-span-11 row-start-5"
      />
      <PatchTile patch={patch(15)} className="col-span-4 col-start-10 row-start-1" />
      <PatchTile patch={patch(16)} className="col-span-3 col-start-10 row-span-3 row-start-2" />

      {/*Unten*/}
      <PatchTile patch={patch(17)} className="col-span-6 col-start-7 row-span-2 row-start-19" />
      <StorageUnitTile
        unit={STORAGE_UNITS.find((u) => u.id === 'schuppen')!}
        className="col-span-3 col-start-10 row-span-2 row-start-17"
      />
      <StorageUnitTile
        unit={STORAGE_UNITS.find((u) => u.id === 'kiste')!}
        className="col-span-3 col-start-7 row-span-2 row-start-17"
      />
    </div>
  )
}
