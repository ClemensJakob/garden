import { Link } from 'react-router-dom'

interface GardenButtonProps {
  to: string
  children: React.ReactNode
  /** Extra Tailwind classes to merge in (e.g. for the floating action button). */
  className?: string
}

/**
 * A navigation button styled with the garden's off-white parchment colour
 * (`patch-num`) and dark-brown text (`patch-text`). No border.
 *
 * Pass `className` to extend or override styles for special variants
 * (e.g. the floating season-plan FAB).
 */
export default function GardenButton({ to, children, className = '' }: GardenButtonProps) {
  return (
    <Link
      to={to}
      className={`inline-flex w-fit items-center gap-1 rounded bg-patch-num px-3 py-1.5 text-sm font-semibold text-patch-text shadow-sm hover:opacity-90 transition-opacity ${className}`}
    >
      {children}
    </Link>
  )
}
