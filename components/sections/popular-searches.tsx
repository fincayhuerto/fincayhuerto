import Link from 'next/link'
import { TrendingUp } from 'lucide-react'
import { popularSearches } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function PopularSearches() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Lo más buscado"
        title="Las búsquedas del momento"
        description="Lo que otros hortelanos y jardineros están buscando ahora mismo."
      />
      <ul className="mt-8 flex flex-wrap gap-3">
        {popularSearches.map((term) => (
          <li key={term}>
            <Link
              href={`/buscar?q=${encodeURIComponent(term)}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
            >
              <TrendingUp
                className="size-4 text-accent-foreground"
                aria-hidden="true"
              />
              {term}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
