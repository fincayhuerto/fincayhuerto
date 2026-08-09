import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { categories, getCategory, getProductsByCategory } from '@/lib/data'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }))
}

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

  const categoryProducts = getProductsByCategory(slug)

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
