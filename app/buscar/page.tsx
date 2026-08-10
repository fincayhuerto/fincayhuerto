import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { searchCategories, searchProducts } from '@/lib/products'
import { buildAffiliateSearchUrl } from '@/lib/data/seed-products'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Busca productos, herramientas y soluciones para tu huerto y jardín.',
  robots: { index: false },
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim()

  const [productResults, categoryResults] = query
    ? await Promise.all([
        searchProducts(query),
        Promise.resolve(searchCategories(query)),
      ])
    : [[], []]

  const total = productResults.length + categoryResults.length

  return (
    <>
      <PageHero
        eyebrow="Resultados de búsqueda"
        title={query ? `Resultados para "${query}"` : 'Buscar'}
        description={
          query
            ? `Hemos encontrado ${total} resultado${total === 1 ? '' : 's'}.`
            : 'Escribe en el buscador para encontrar productos y categorías.'
        }
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Buscar' }]}
      />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {categoryResults.length > 0 && (
          <div className="mb-10">
            <h2 className="mb-4 font-serif text-xl font-bold text-foreground">
              Categorías
            </h2>
            <div className="flex flex-wrap gap-3">
              {categoryResults.map((c) => (
                <Link
                  key={c.slug}
                  href={`/categoria/${c.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
                >
                  <span aria-hidden="true">{c.icon}</span>
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        )}

        {productResults.length > 0 ? (
          <div>
            <h2 className="mb-4 font-serif text-xl font-bold text-foreground">
              Productos
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {productResults.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        ) : (
          query && (
            <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center">
              <p className="text-muted-foreground">
                No hemos encontrado productos para{' '}
                <span className="font-medium text-foreground">
                  &ldquo;{query}&rdquo;
                </span>{' '}
                en nuestra selección. Puedes buscarlo directamente en Amazon.es
                o explorar nuestras{' '}
                <Link href="/" className="font-medium text-primary underline">
                  categorías
                </Link>
                .
              </p>
              <a
                href={buildAffiliateSearchUrl(query)}
                rel="nofollow sponsored noopener"
                target="_blank"
                className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Buscar &ldquo;{query}&rdquo; en Amazon
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          )
        )}
      </section>
    </>
  )
}
