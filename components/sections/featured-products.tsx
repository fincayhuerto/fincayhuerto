import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/product-card'
import { SectionHeading } from '@/components/section-heading'

export async function FeaturedProducts() {
  const featured = await getFeaturedProducts(8)
  return (
    <section className="bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Productos recomendados"
          title="Los favoritos de la comunidad"
          description="Una selección de productos bien valorados para tu huerto, jardín y finca."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
