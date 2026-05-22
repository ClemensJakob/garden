import { Link } from 'react-router-dom'
import type { StorageUnit } from '../domain/types'

interface StorageUnitTileProps {
  unit: StorageUnit
  className?: string
}

/**
 * A storage unit (Schuppen, Kiste) rendered as a tile in the garden grid.
 *
 * Storage units are clickable and link to the (yet-to-be-built)
 * `/storage/:id` route. Visually they are gray and don't carry a
 * numbered badge.
 *
 * The grid position is provided via the `className` prop from GardenLayout,
 * keeping the domain object free of presentation concerns.
 */
export default function StorageUnitTile({ unit, className = '' }: StorageUnitTileProps) {
  return (
    <Link
      to={`/storage/${unit.id}`}
      className={`flex items-center justify-center border border-storage-border bg-storage-bg px-3 py-4 text-center text-sm text-storage-text shadow-sm transition-shadow hover:shadow-md ${className}`}
      aria-label={unit.label}
    >
      {unit.label}
    </Link>
  )
}
