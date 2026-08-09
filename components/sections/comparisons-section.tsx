import Link from 'next/link'
import { ArrowRight, BarChart3 } from 'lucide-react'
import { comparisons } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function ComparisonsSection() {
  return (
    <section className="bg-primary/[0.03] py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Comparativas"
            title="Comparativas que te ayudan a elegir"
            description="Analizamos los productos más populares para que compres con seguridad."
          />
          <Link
            href="/comparativas"
            className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Ver comparativas
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {comparisons.map((comparison) => (
            <Link
              key={comparison.slug}
              href={`/comparativas/${comparison.slug}`}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg hover:shadow-primary/5"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                <BarChart3 className="size-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-foreground">
                  {comparison.category}
                </p>
                <h3 className="mt-1 font-serif text-lg font-semibold text-foreground text-balance">
                  {comparison.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {comparison.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
