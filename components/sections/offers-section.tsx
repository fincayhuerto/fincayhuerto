import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getOffers } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'

/**
 * Ofertas en la portada. Solo se renderiza si la Amazon Creators API devuelve
 * ofertas con descuentos verificados; en caso contrario no aparece (no se
 * inventan rebajas). La página /ofertas siempre muestra su propio estado.
 */
export async function OffersSection() {
  const offers = await getOffers(4)
  if (offers.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Ofertas"
          title="Ofertas verificadas de Amazon"
          description="Descuentos reales obtenidos directamente de Amazon, actualizados automáticamente."
        />
        <Link
          href="/ofertas"
          className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-card px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Ver todas las ofertas
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {offers.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </section>
  )
}
