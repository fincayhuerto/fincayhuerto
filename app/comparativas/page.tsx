import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { comparisons } from '@/lib/data'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Comparativas',
  description:
    'Comparativas de tijeras de podar, sistemas de riego, herramientas de huerto y motocultores para ayudarte a elegir.',
  alternates: { canonical: '/comparativas' },
}

export default function ComparativasPage() {
  return (
    <>
      <PageHero
        eyebrow="Comparativas"
        title="Comparativas que te ayudan a elegir"
        description="Analizamos y comparamos los productos más populares para tu huerto, jardín y finca."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Comparativas' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/comparativas/${comparison.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <BarChart3 className="size-6" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                  {comparison.category}
                </p>
                <h2 className="mt-1 font-serif text-lg font-semibold text-foreground text-balance">
                  {comparison.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {comparison.excerpt}
                </p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Ver comparativa
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
