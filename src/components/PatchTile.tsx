import {Link} from 'react-router-dom'
import type {AccentColor, Patch, PatchVariant} from '../domain/types'
import {findPlantById, patchAccent} from '../domain/plants'

interface PatchTileProps {
    patch: Patch
    className?: string
}

/**
 * Static map: AccentColor → literal Tailwind classes.
 *
 * Why static literals? Tailwind's JIT scans source files for class
 * names verbatim. A computed class like `bg-accent-${color}-bg` would
 * silently fall out of the bundle. Listing every concrete combination
 * here keeps the build honest.
 *
 * The classes paint a soft tint on top of the soil base and lift the
 * border into the accent color, so each bed reads as "this is the
 * tomato bed" / "this is the strawberry bed" at a glance.
 */
const ACCENT_CLASSES: Record<AccentColor, string> = {
    tomato:     'bg-accent-tomato-bg     border-accent-tomato-border',
    pumpkin:    'bg-accent-pumpkin-bg    border-accent-pumpkin-border',
    leaf:       'bg-accent-leaf-bg       border-accent-leaf-border',
    pea:        'bg-accent-pea-bg        border-accent-pea-border',
    carrot:     'bg-accent-carrot-bg     border-accent-carrot-border',
    beet:       'bg-accent-beet-bg       border-accent-beet-border',
    onion:      'bg-accent-onion-bg      border-accent-onion-border',
    lettuce:    'bg-accent-lettuce-bg    border-accent-lettuce-border',
    strawberry: 'bg-accent-strawberry-bg border-accent-strawberry-border',
    rhubarb:    'bg-accent-rhubarb-bg    border-accent-rhubarb-border',
    bloom:      'bg-accent-bloom-bg      border-accent-bloom-border',
}

/** Tailwind classes per visual variant — renders a Patch as a tile in the layout. */
function variantClasses(variant: PatchVariant): string {
    switch (variant) {
        case 'kompost':
            return 'bg-kompost-bg text-kompost-text border-kompost-border'
        case 'kraeuter':
            return 'bg-kraeuter-bg text-kraeuter-text border-2 border-dashed border-kraeuter-border rounded-full'
        case 'beere':
            return 'bg-beere-bg text-beere-text border-beere-border'
        case 'default':
        default:
            return 'border text-patch-text hover:brightness-95'
    }
}

export default function PatchTile({patch, className}: PatchTileProps) {
    const isSpecial = patch.variant !== 'default'
    const showBadge = !isSpecial
    const accent = isSpecial ? undefined : patchAccent(patch.bedding)
    const accentClasses = accent
        ? ACCENT_CLASSES[accent]
        : 'bg-patch border-patch-border' // neutral soil for empty / unknown beds
    return (
        <Link
            to={`/patches/${patch.number}`}
            className={`relative flex items-center justify-center text-center text-sm shadow-sm transition-all hover:shadow-md hover:-translate-y-px rounded-md ${variantClasses(patch.variant)} ${!isSpecial ? accentClasses : ''} ${className}`}
            aria-label={`${patch.label} (Beet ${patch.number})`}
        >
            {showBadge && (
                <span
                    className="absolute left-1 top-0 text-xs font-normal text-patch-border"
                    aria-hidden="true"
                >
                    {patch.number}
                </span>
            )}
            {isSpecial ? (
                <span className="font-medium [hyphens:auto] break-words">{patch.label}</span>
            ) : (
                (() => {
                    const plants = patch.bedding
                    const alwaysSingleCol = patch.number === 13 || patch.number === 14
                    const useColumns = !alwaysSingleCol && plants.length > 3
                    return (
                        <div className={`w-full px-0.5 ${useColumns ? 'grid grid-cols-2 gap-x-1 gap-y-0.5' : 'flex flex-col gap-0.5'}`}>
                            {plants.length === 0 ? (
                                <span className="text-patch-border/60 [hyphens:auto] break-words col-span-2">{patch.label}</span>
                            ) : (
                                plants.map((b) => {
                                    const plant = findPlantById(b.plantId)
                                    return (
                                        <span key={b.plantId} className="[hyphens:auto] break-words">
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
