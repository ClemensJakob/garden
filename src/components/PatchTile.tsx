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
            return 'bg-black text-white border-black'
        case 'kraeuter':
            return 'bg-gray-100 text-gray-800 border-2 border-dashed border-gray-400 rounded-full'
        case 'beere':
            return 'bg-gray-300 text-gray-800 border-gray-300'
        case 'default':
        default:
            return 'bg-white text-gray-900 border-gray-200'
    }
}

export default function PatchTile({patch, className}: PatchTileProps) {
    const showBadge = patch.variant === 'default' || patch.variant === 'beere'
    return (
        <Link
            to={`/patches/${patch.number}`}
            className={`relative flex items-center justify-center border text-center text-xs shadow-sm transition-shadow hover:shadow-md ${variantClasses(patch.variant)} ${className}`}
            aria-label={`${patch.label} (Beet ${patch.number})`}
        >

            
            {showBadge && (
                <span
                    className="absolute left-1 top-0 text-[10px] font-normal text-gray-400"
                    aria-hidden="true"
                >
          {patch.number}
        </span>
            )}
            <div className="flex flex-col">{patch.bedding
                .map((b) => <span>{findPlantById(b.plantId)?.name}</span>)
            }</div>
        </Link>
    )
}
