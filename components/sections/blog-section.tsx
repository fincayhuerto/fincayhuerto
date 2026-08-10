import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock } from 'lucide-react'
import { articles } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function BlogSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Blog"
          title="Aprende a cultivar mejor"
          description="Guías prácticas y consejos para sacar el máximo partido a tu huerto."
        />
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Ver todos los artículos
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <article key={article.slug}>
            <Link href={`/blog/${article.slug}`} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-border">
                <Image
                  src={article.image || '/placeholder.svg'}
                  alt={article.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock className="size-3.5" aria-hidden="true" />
                <span>{article.readingTime} de lectura</span>
              </div>
              <h3 className="mt-2 font-serif text-lg font-semibold leading-snug text-foreground text-balance transition-colors group-hover:text-primary">
                {article.title}
              </h3>
              <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            </Link>
          </article>
        ))}
      </div>
    </section>
  )
}
