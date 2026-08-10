import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

type Crumb = { label: string; href?: string }

export function PageHero({
  title,
  description,
  eyebrow,
  breadcrumbs,
}: {
  title: string
  description?: string
  eyebrow?: string
  breadcrumbs?: Crumb[]
}) {
  return (
    <section className="border-b border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Migas de pan" className="mb-4">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1">
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-primary"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-foreground">{crumb.label}</span>
                  )}
                  {i < breadcrumbs.length - 1 && (
                    <ChevronRight className="size-4" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <p className="text-sm font-semibold uppercase tracking-wide text-accent-foreground">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 max-w-3xl font-serif text-3xl font-bold text-foreground text-balance sm:text-4xl md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
