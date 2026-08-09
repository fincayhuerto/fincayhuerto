import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export function StarRating({
  rating,
  reviews,
  className,
}: {
  rating: number
  reviews?: number
  className?: string
}) {
  const rounded = Math.round(rating)
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div
        className="flex items-center gap-0.5"
        role="img"
        aria-label={`Valoración de ${rating} sobre 5`}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={cn(
              'size-4',
              i < rounded
                ? 'fill-accent text-accent'
                : 'fill-muted text-muted-foreground/40',
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">
        {rating.toFixed(1)}
        {typeof reviews === 'number' && (
          <span className="ml-1 text-muted-foreground/70">
            ({reviews.toLocaleString('es-ES')})
          </span>
        )}
      </span>
    </div>
  )
}
