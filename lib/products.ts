import 'server-only'

import { unstable_cache } from 'next/cache'
import {
  categories,
  getProductsByCategory as getLocalProductsByCategory,
  products as localProducts,
  type Category,
  type Product,
} from '@/lib/data'
import { searchItems } from '@/lib/amazon/client'
import { mapItemsToProducts } from '@/lib/amazon/mapper'
import {
  PRODUCTS_REVALIDATE_SECONDS,
  categoryKeywords,
  isAmazonConfigured,
} from '@/lib/amazon/config'
import {
  getSeedProductsByCategory,
  hasSeedProducts,
  searchSeedProducts,
} from '@/lib/data/seed-products'

/**
 * Fachada única de acceso a productos.
 *
 * Las páginas y componentes importan SOLO desde aquí. Internamente decide entre
 * la Amazon Creators API (con caché) y el catálogo local de `lib/data.ts` como
 * fallback, de modo que la interfaz nunca se rompe aunque la API falle o no esté
 * configurada.
 */

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Productos de una categoría. Cacheado por slug con revalidación temporal.
 */
export const getProductsByCategory = unstable_cache(
  async (slug: string): Promise<Product[]> => {
    if (!isAmazonConfigured()) {
      return getLocalProductsByCategory(slug)
    }

    const keywords = categoryKeywords[slug] ?? slug
    const items = await searchItems(keywords, { itemCount: 10 })

    if (items && items.length > 0) {
      const mapped = mapItemsToProducts(items, slug)
      if (mapped.length > 0) return mapped
    }

    // Fallback 1: catálogo inicial de productos reales (seed).
    if (hasSeedProducts()) {
      const seeded = getSeedProductsByCategory(slug)
      if (seeded.length > 0) return seeded
    }

    // Fallback 2: catálogo de demostración local.
    return getLocalProductsByCategory(slug)
  },
  ['products-by-category'],
  { revalidate: PRODUCTS_REVALIDATE_SECONDS, tags: ['amazon-products'] },
)

/**
 * Búsqueda de productos por término libre. Cacheado por término normalizado.
 */
export const searchProducts = unstable_cache(
  async (term: string): Promise<Product[]> => {
    const query = term.trim()
    if (!query) return []

    if (isAmazonConfigured()) {
      const items = await searchItems(query, { itemCount: 12 })
      if (items && items.length > 0) {
        const mapped = mapItemsToProducts(items, 'busqueda')
        if (mapped.length > 0) return mapped
      }
    }

    // Fallback 1: búsqueda en el catálogo inicial de productos reales (seed).
    if (hasSeedProducts()) {
      const seeded = searchSeedProducts(query)
      if (seeded.length > 0) return seeded
    }

    // Fallback 2: búsqueda sobre el catálogo de demostración local.
    const normalized = normalize(query)
    return localProducts.filter((p) =>
      [p.name, p.description, p.category].some((field) =>
        normalize(field).includes(normalized),
      ),
    )
  },
  ['search-products'],
  { revalidate: PRODUCTS_REVALIDATE_SECONDS, tags: ['amazon-products'] },
)

/**
 * Búsqueda de categorías (siempre local: son fijas y forman la navegación).
 */
export function searchCategories(term: string): Category[] {
  const normalized = normalize(term.trim())
  if (!normalized) return []
  return categories.filter((c) =>
    [c.name, c.description].some((field) =>
      normalize(field).includes(normalized),
    ),
  )
}
