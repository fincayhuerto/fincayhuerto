import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'
import { articles } from '@/lib/data'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Guías y consejos sobre huerto, jardín y finca: cómo empezar, qué herramientas necesitas, cuándo plantar y cómo ahorrar agua.',
  alternates: { canonical: '/blog' },
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Aprende a cultivar mejor"
        description="Guías prácticas, consejos y calendarios para tu huerto y jardín."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Blog' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.slug}>
              <Link href={`/blog/${article.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                  <Image
                    src={article.image || '/placeholder.svg'}
                    alt={article.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden="true" />
                  <span>{article.readingTime} de lectura</span>
                </div>
                <h2 className="mt-2 font-serif text-xl font-semibold leading-snug text-foreground text-balance transition-colors group-hover:text-primary">
                  {article.title}
                </h2>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {article.excerpt}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
