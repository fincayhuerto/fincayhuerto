import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategory } from '@/lib/data'
import { getProductsByCategory } from '@/lib/products'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

/**
 * Prerenderiza las categorías conocidas y las revalida periódicamente (ISR),
 * de modo que los productos de Amazon se refrescan sin reconstruir la web.
 */
export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }))
}

/** Revalida la página cada 6 horas para refrescar los productos de Amazon. */
export const revalidate = 21600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) return { title: 'Categoría no encontrada' }
  return {
    title: category.name,
    description: category.description,
    alternates: { canonical: `/categoria/${category.slug}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = getCategory(slug)
  if (!category) notFound()

  const categoryProducts = await getProductsByCategory(slug)

  return (
    <>
      <PageHero
        eyebrow={`${category.icon} Categoría`}
        title={category.name}
        description={category.description}
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: category.name },
        ]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Pronto añadiremos productos recomendados en esta categoría.
          </p>
        )}
      </section>
    </>
  )
}
