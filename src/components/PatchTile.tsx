import {Link} from 'react-router-dom'
import type {Patch, PatchVariant} from '../domain/types'
import {findPlantById} from '../domain/plants'

interface PatchTileProps {
    patch: Patch
    className?: string
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
            return 'bg-patch border-patch-border text-patch-text hover:bg-patch-hover'
    }
}

export default function PatchTile({patch, className}: PatchTileProps) {
    const isSpecial = patch.variant !== 'default'
    const showBadge = !isSpecial
    return (
        <Link
            to={`/patches/${patch.number}`}
            className={`relative flex items-center justify-center border text-center text-xs shadow-sm transition-shadow hover:shadow-md ${variantClasses(patch.variant)} ${className}`}
            aria-label={`${patch.label} (Beet ${patch.number})`}
        >
            {showBadge && (
                <span
                    className="absolute left-1 top-0 text-[10px] font-normal text-patch-border"
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
                                plants.map((b) => (
                                    <span key={b.plantId} className="[hyphens:auto] break-words">{findPlantById(b.plantId)?.name}</span>
                                ))
                            )}
                        </div>
                    )
                })()
            )}
        </Link>
    )
}
