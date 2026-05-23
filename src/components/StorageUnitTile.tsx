import { Link } from 'react-router-dom'
import type { StorageUnit } from '../domain/types'

interface StorageUnitTileProps {
  unit: StorageUnit
  className?: string
}

/**
 * Per-unit visual treatment.
 *
 * Kiste and Schuppen are conceptually similar (both are tool stores) but
 * physically very different objects in the garden — the Kiste is a grey
 * metal/stone crate, the Schuppen is a wooden shed. Mapping each id to
 * its own concrete Tailwind class string keeps the JIT compiler happy
 * (no dynamic class names) and makes the visual contract explicit.
 *
 * The Schuppen also carries a faint vertical-stripe gradient to suggest
 * wooden planks without resorting to a raster texture.
 */
const UNIT_CLASSES: Record<string, string> = {
  kiste:
    'bg-storage-kiste-bg border-storage-kiste-border text-storage-kiste-text',
  schuppen:
    'bg-storage-schuppen-bg border-storage-schuppen-border text-storage-schuppen-text',
}

/**
 * Inline style hooks for unit-specific texture effects that Tailwind
 * doesn't express well (repeating gradients with custom stops). Keeping
 * them in JS avoids polluting the global CSS layer.
 */
const UNIT_STYLE: Record<string, React.CSSProperties> = {
  // Vertical wood-plank seams for the Schuppen.
  schuppen: {
    backgroundImage:
      'repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 1px, transparent 1px 14px), repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 14px)',
    backgroundPosition: '0 0, 7px 0',
  },
  // Subtle horizontal banding for the Kiste — like sheet metal ribs.
  kiste: {
    backgroundImage:
      'repeating-linear-gradient(180deg, rgba(0,0,0,0.06) 0 1px, transparent 1px 8px)',
  },
}

/**
 * A storage unit (Schuppen, Kiste) rendered as a tile in the garden grid.
 *
 * Storage units are clickable and link to the (yet-to-be-built)
 * `/storage/:id` route. Each unit has its own material — Kiste reads
 * grey/metal, Schuppen reads warm wood — so they don't blur into one
 * generic brown rectangle on the garden map.
 */
export default function StorageUnitTile({ unit, className = '' }: StorageUnitTileProps) {
  const unitClasses = UNIT_CLASSES[unit.id] ?? UNIT_CLASSES.kiste
  const unitStyle = UNIT_STYLE[unit.id]
  return (
    <Link
      to={`/storage/${unit.id}`}
      style={unitStyle}
      className={`flex items-center justify-center rounded-md border-2 px-3 py-4 text-center text-sm font-medium shadow-sm transition-all hover:shadow-md hover:-translate-y-px ${unitClasses} ${className}`}
      aria-label={unit.label}
    >
      {unit.label}
    </Link>
  )
}
