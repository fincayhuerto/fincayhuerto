import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getCategory } from '@/lib/data'
import { getProductsByCategory } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'

/** Categorías destacadas en la portada para recomendaciones. */
const FEATURED_CATEGORY_SLUGS = ['huerto', 'jardin', 'herramientas'] as const

/**
 * Recomendaciones agrupadas por categoría/necesidad. Reutiliza la capa de
 * productos de Amazon (cacheada por categoría), de modo que muestra datos
 * reales cuando la API está activa y el catálogo provisional como fallback.
 */
export async function RecommendedByCategory() {
  const groups = await Promise.all(
    FEATURED_CATEGORY_SLUGS.map(async (slug) => {
      const category = getCategory(slug)
      const products = (await getProductsByCategory(slug)).slice(0, 4)
      return { slug, category, products }
    }),
  )

  const visible = groups.filter((g) => g.category && g.products.length > 0)
  if (visible.length === 0) return null

  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Recomendados para ti"
          title="Recomendaciones por categoría"
          description="Una selección de productos por cada necesidad de tu huerto y jardín."
        />
        <div className="mt-10 space-y-14">
          {visible.map(({ slug, category, products }) => (
            <div key={slug}>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  <span className="mr-2" aria-hidden="true">
                    {category!.icon}
                  </span>
                  {category!.name}
                </h3>
                <Link
                  href={`/categoria/${slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                >
                  Ver todo
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard
                    key={`${slug}-${product.slug}`}
                    product={product}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
