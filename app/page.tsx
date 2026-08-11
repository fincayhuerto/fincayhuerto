import { Hero } from '@/components/sections/hero'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { PopularSearches } from '@/components/sections/popular-searches'
import { OffersSection } from '@/components/sections/offers-section'
import { RecommendedByCategory } from '@/components/sections/recommended-by-category'
import { ComparisonsSection } from '@/components/sections/comparisons-section'
import { BlogSection } from '@/components/sections/blog-section'
import { FinalCta } from '@/components/sections/final-cta'

/** Revalida cada 6 horas para refrescar los productos de Amazon en la portada. */
export const revalidate = 21600

export default function HomePage() {
  return (
    <>
      {/* 1. Hero + buscador */}
      <Hero />
      {/* 2. Categorías principales */}
      <CategoriesSection />
      {/* 3. Productos destacados */}
      <FeaturedProducts />
      {/* 4. Productos populares / lo más buscado */}
      <PopularSearches />
      {/* 5. Ofertas (solo si Amazon devuelve ofertas verificadas) */}
      <OffersSection />
      {/* 6. Recomendados por categoría / necesidad */}
      <RecommendedByCategory />
      {/* 7. Comparativas */}
      <ComparisonsSection />
      {/* 8. Guías del blog */}
      <BlogSection />
      {/* 9. CTA final */}
      <FinalCta />
    </>
  )
}
