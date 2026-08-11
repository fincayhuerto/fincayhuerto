import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { comparisons } from '@/lib/data'
import { getComparisonProducts } from '@/lib/products'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }))
}

/** Revalida cada 6 horas para refrescar los productos de Amazon. */
export const revalidate = 21600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) return { title: 'Comparativa no encontrada' }
  return {
    title: comparison.title,
    description: comparison.excerpt,
    alternates: { canonical: `/comparativas/${comparison.slug}` },
  }
}

export default async function ComparativaDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const comparison = comparisons.find((c) => c.slug === slug)
  if (!comparison) notFound()

  // Productos obtenidos con la misma capa de productos de Amazon (API → seed →
  // demo) a partir del término de búsqueda de la comparativa.
  const topProducts = await getComparisonProducts(comparison.searchTerm, 4)

  return (
    <>
      <PageHero
        eyebrow={comparison.category}
        title={comparison.title}
        description={comparison.excerpt}
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Comparativas', href: '/comparativas' },
          { label: comparison.title },
        ]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="prose-fyh space-y-4 text-base leading-relaxed text-muted-foreground">
          <p>
            En esta comparativa analizamos los aspectos clave que debes tener en
            cuenta antes de comprar: relación calidad-precio, durabilidad,
            comodidad de uso y opiniones de otros usuarios.
          </p>
          <p>
            A continuación encontrarás una selección de productos destacados. El
            contenido detallado de cada comparativa se ampliará próximamente.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <h2 className="mb-6 font-serif text-2xl font-bold text-foreground">
          Productos destacados
        </h2>
        {topProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Pronto añadiremos los productos de esta comparativa.
          </p>
        )}
      </section>
    </>
  )
}
