import type { Metadata } from 'next'
import { products } from '@/lib/data'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

export const metadata: Metadata = {
  title: 'Ofertas',
  description:
    'Las mejores ofertas y productos recomendados para tu huerto, jardín y finca.',
  alternates: { canonical: '/ofertas' },
}

export default function OfertasPage() {
  return (
    <>
      <PageHero
        eyebrow="Ofertas"
        title="Ofertas destacadas"
        description="Una selección de productos recomendados con buena relación calidad-precio. Iremos actualizando esta página con nuevas ofertas."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Ofertas' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}
