import type { Metadata } from 'next'
import Link from 'next/link'
import { Tag } from 'lucide-react'
import { getOffers } from '@/lib/products'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'

export const metadata: Metadata = {
  title: 'Ofertas',
  description:
    'Ofertas verificadas de productos para tu huerto, jardín y finca, obtenidas directamente de Amazon.',
  alternates: { canonical: '/ofertas' },
}

/** Revalida cada 6 horas para refrescar las ofertas de Amazon. */
export const revalidate = 21600

export default async function OfertasPage() {
  const offers = await getOffers(12)

  return (
    <>
      <PageHero
        eyebrow="Ofertas"
        title="Ofertas destacadas"
        description="Mostramos únicamente ofertas cuyos precios y descuentos proceden directamente de Amazon. No inventamos rebajas: si ahora no hay ofertas verificadas, aparecerán automáticamente en cuanto Amazon las publique."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Ofertas' }]}
      />
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {offers.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {offers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
              <Tag className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 font-serif text-xl font-bold text-foreground">
              No hay ofertas verificadas ahora mismo
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Las ofertas se muestran automáticamente cuando Amazon publica
              descuentos reales. Mientras tanto, explora nuestras categorías
              para encontrar los productos que necesitas.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explorar categorías
            </Link>
          </div>
        )}
      </section>
    </>
  )
}
