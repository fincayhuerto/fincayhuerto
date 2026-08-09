import type { Metadata } from 'next'
import Link from 'next/link'
import { categories, products } from '@/lib/data'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

export const metadata: Metadata = {
  title: 'Buscar',
  description: 'Busca productos, herramientas y soluciones para tu huerto y jardín.',
  robots: { index: false },
}

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q = '' } = await searchParams
  const query = q.trim()
  const term = normalize(query)

  const productResults = term
    ? products.filter((p) =>
        [p.name, p.description, p.category].some((field) =>
          normalize(field).includes(term),
        ),
      )
    : []

  const categoryResults = term
    ? categories.filter((c) =>
        [c.name, c.description].some((field) =>
          normalize(field).includes(term),
        ),
      )
    : []

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
                </span>
                . Prueba con otro término o explora nuestras{' '}
                <Link href="/" className="font-medium text-primary underline">
                  categorías
                </Link>
                .
              </p>
            </div>
          )
        )}
      </section>
    </>
  )
}
