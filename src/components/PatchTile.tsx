import {Link} from 'react-router-dom'
import type {Patch, PatchVariant} from '../domain/types'
import {findPlantById} from '../domain/plants'

interface PatchTileProps {
    patch: Patch
    className?: string
}

/**
 * Stand-in emoji for the Beere (raspberry) tile. Unicode has no
 * dedicated raspberry codepoint, so we use the grape cluster as the
 * closest visual analogue — both are drupelet/berry clusters.
 */
const BEERE_ICON = '🍇'

/**
 * Tailwind classes per visual variant — renders a Patch as a tile in
 * the layout. Default patches all share the same soil color: the lawn
 * is the visual carrier, beds are uniform soil, and the *contents*
 * (plant icons + names) tell each bed apart.
 */
function variantClasses(variant: PatchVariant): string {
    switch (variant) {
        case 'kompost':
            // Kompost: dark earth, sharp rectangular footprint, no border.
            return 'bg-kompost-bg text-kompost-text'
        case 'kraeuter':
            // Kräuter is the only round bed — a true circle floating on
            // the lawn. The grid cell is rectangular; aspect-square +
            // auto margins center the disc inside whatever cell
            // GardenLayout assigns.
            return 'bg-kraeuter-bg text-kraeuter-text border-2 border-dashed border-kraeuter-border rounded-full aspect-square m-auto h-full max-w-full'
        case 'beere':
            // Berry patch: raspberry blush, square corners, borderless.
            return 'bg-beere-bg text-beere-text'
        case 'default':
        default:
            // Soil bed: uniform color, square corners, borderless.
            // The lawn around it provides the visual separation.
            return 'bg-patch text-patch-text hover:brightness-95'
    }
}

export default function PatchTile({patch, className}: PatchTileProps) {
    const isSpecial = patch.variant !== 'default'
    const showBadge = !isSpecial

    // Default patches get a soft inset shadow so they read as a sunken
    // soil bed nestled into the lawn rather than a flat card.
    const soilShadow = !isSpecial
        ? 'shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_-2px_4px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.1)]'
        : 'shadow-sm'

    // The Kräuter circle is the only variant that wants rounded corners;
    // every other patch is a straight-edged rectangle that tiles into
    // the lawn.
    const shape = patch.variant === 'kraeuter' ? '' : 'rounded-none'

    return (
      <Link
        to={`/patches/${patch.number}`}
        className={`relative flex items-center justify-center text-center text-sm transition-all hover:-translate-y-px hover:shadow-md ${shape} ${variantClasses(patch.variant)} ${soilShadow} ${className}`}
        aria-label={`${patch.label} (Beet ${patch.number})`}
      >
        {showBadge && (
          <div
            className="bg-patch-num absolute -left-1.5 -top-1 rounded-lg w-[0.75rem] text-xs font-normal text-patch-border"
            aria-hidden="true"
          >
            {patch.number}
          </div>
        )}
        {isSpecial ? (
          patch.variant === 'beere' ? (
            <span className="flex items-center gap-1 break-words font-medium [hyphens:auto]">
              <span aria-hidden="true">{BEERE_ICON}</span>
              {patch.label}
            </span>
          ) : (
            <span className="break-words font-medium [hyphens:auto]">{patch.label}</span>
          )
        ) : (
          (() => {
            const plants = patch.bedding
            const alwaysSingleCol = patch.number === 13 || patch.number === 14
            const useColumns = !alwaysSingleCol && plants.length > 3
            return (
              <div
                className={`w-full px-0.5 ${useColumns ? 'grid grid-cols-2 gap-x-1 gap-y-0.5' : 'flex flex-col items-center gap-0.5'}`}
              >
                {plants.length === 0 ? (
                  <span className="col-span-2 break-words text-patch-border/60 [hyphens:auto]">
                    {patch.label}
                  </span>
                ) : (
                  plants.map((b) => {
                    const plant = findPlantById(b.plantId)
                    return (
                      <span key={b.plantId} className="flex items-center break-words [hyphens:auto]">
                        {plant?.icon && (
                          <span className="mr-0.5" aria-hidden="true">
                            {plant.icon}
                          </span>
                        )}
                        {plant?.name}
                      </span>
                    )
                  })
                )}
              </div>
            )
          })()
        )}
      </Link>
    )
}
