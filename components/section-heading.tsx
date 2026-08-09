import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
  align = 'left',
}: {
  eyebrow?: string
  title: string
  description?: string
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted-foreground text-pretty">
          {description}
        </p>
      )}
    </div>
  )
}
