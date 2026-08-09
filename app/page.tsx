import { Hero } from '@/components/sections/hero'
import { CategoriesSection } from '@/components/sections/categories-section'
import { FeaturedProducts } from '@/components/sections/featured-products'
import { PopularSearches } from '@/components/sections/popular-searches'
import { ComparisonsSection } from '@/components/sections/comparisons-section'
import { BlogSection } from '@/components/sections/blog-section'
import { FinalCta } from '@/components/sections/final-cta'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoriesSection />
      <FeaturedProducts />
      <PopularSearches />
      <ComparisonsSection />
      <BlogSection />
      <FinalCta />
    </>
  )
}
