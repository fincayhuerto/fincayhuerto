/**
 * Catálogo inicial de productos REALES de Amazon.es para FincaYHuerto.
 *
 * Este catálogo es el FALLBACK mientras la Amazon Creators API devuelve
 * `403 AssociateNotEligible`. Cuando la API pase a estar disponible, se
 * convierte en fuente secundaria automáticamente (ver `lib/products.ts`).
 *
 * REGLAS IMPORTANTES
 * ------------------
 * - Aquí SOLO se guardan datos verificables de productos reales.
 * - El `asin` es obligatorio y debe ser un ASIN real de Amazon.es.
 * - `title` es el nombre real del producto.
 * - `price`, `rating`, `reviewCount` e `imageUrl` son OPCIONALES: si no se
 *   pueden verificar, se dejan sin definir. La tarjeta mostrará entonces
 *   "Ver precio en Amazon" y ocultará la valoración; la Creators API los
 *   rellenará cuando esté activa.
 * - NUNCA se inventan ASIN, precios, valoraciones ni imágenes.
 * - Los enlaces de afiliado se generan automáticamente a partir del ASIN y del
 *   Partner Tag de las variables de entorno (`AMAZON_PARTNER_TAG`), nunca a mano.
 */

import type { Product } from '@/lib/data'

/** Categorías válidas del sitio (deben coincidir con `lib/data.ts`). */
export type SeedCategory =
  | 'huerto'
  | 'jardin'
  | 'herramientas'
  | 'riego'
  | 'semillas'
  | 'maquinaria'

export type SeedProduct = {
  /** Identificador interno estable (por defecto, el propio ASIN). */
  id: string
  /** ASIN REAL de Amazon.es. Obligatorio. */
  asin: string
  /** Nombre real del producto. */
  title: string
  /** Categoría del sitio. */
  category: SeedCategory
  /** Subcategoría o descripción corta opcional. */
  subcategory?: string
  /** URL de imagen real (opcional hasta tener la API). */
  imageUrl?: string
  /** Precio numérico verificado (opcional). */
  price?: number
  /** Moneda ISO, p. ej. "EUR" (opcional). */
  currency?: string
  /** Valoración media verificada 0-5 (opcional). */
  rating?: number
  /** Número de valoraciones verificado (opcional). */
  reviewCount?: number
  /** Producto destacado: se muestra primero dentro de su categoría. */
  featured?: boolean
  /** Producto popular / más vendido: se muestra tras los destacados. */
  popular?: boolean
  /** Ranking de popularidad si está disponible (menor = más popular). */
  popularityRank?: number
}

/**
 * CATÁLOGO INICIAL — pega aquí tus productos reales.
 *
 * Mínimo imprescindible por producto: `id`, `asin`, `title` y `category`.
 * Marca algunos con `featured: true` y/o `popular: true` para controlar el orden.
 *
 * Ejemplo de formato (NO son datos reales, es solo la plantilla):
 *
 *   {
 *     id: 'B0XXXXXXXX',
 *     asin: 'B0XXXXXXXX',
 *     title: 'Tijeras de podar profesionales Bahco PX-M2',
 *     category: 'herramientas',
 *     subcategory: 'Poda',
 *     featured: true,
 *     popular: true,
 *     popularityRank: 1,
 *   },
 *
 * Distribución objetivo (100 productos):
 *   huerto 20 · jardin 20 · herramientas 20 · riego 15 · semillas 15 · maquinaria 10
 */
export const seedProducts: SeedProduct[] = [
  // ← Pega aquí tus 100 productos reales de Amazon.es.
]

/* -------------------------------------------------------------------------- */
/*  Generación de enlaces de afiliado                                          */
/* -------------------------------------------------------------------------- */

function marketplaceHost(): string {
  return process.env.AMAZON_MARKETPLACE ?? 'www.amazon.es'
}

/** URL limpia del producto en Amazon (sin tag). */
export function buildAmazonUrl(asin: string): string {
  return `https://${marketplaceHost()}/dp/${asin}`
}

/**
 * URL de afiliado: producto + Partner Tag leído de la variable de entorno.
 * Nunca se escribe el tag a mano; si no existe, devuelve la URL sin tag.
 */
export function buildAffiliateUrl(asin: string): string {
  const url = new URL(buildAmazonUrl(asin))
  const tag = process.env.AMAZON_PARTNER_TAG
  if (tag) url.searchParams.set('tag', tag)
  return url.toString()
}

/* -------------------------------------------------------------------------- */
/*  Conversión al tipo `Product` que usa la interfaz                           */
/* -------------------------------------------------------------------------- */

function formatPrice(amount: number, currency?: string): string {
  const symbol = currency === 'USD' ? '$' : '€'
  const formatted = amount.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatted} ${symbol}`
}

/**
 * Convierte un `SeedProduct` al `Product` que consumen las tarjetas.
 * Los datos no verificados se degradan con elegancia:
 *   - sin precio  → "Ver precio en Amazon"
 *   - sin rating  → 0 (la tarjeta oculta la valoración)
 *   - sin imagen  → placeholder
 */
export function seedToProduct(seed: SeedProduct): Product {
  return {
    slug: seed.asin.toLowerCase(),
    name: seed.title,
    description:
      seed.subcategory ?? 'Producto recomendado disponible en Amazon.',
    category: seed.category,
    rating: seed.rating ?? 0,
    reviews: seed.reviewCount ?? 0,
    price:
      typeof seed.price === 'number'
        ? formatPrice(seed.price, seed.currency)
        : 'Ver precio en Amazon',
    image: seed.imageUrl ?? '/placeholder.svg',
    affiliateUrl: buildAffiliateUrl(seed.asin),
  }
}

/* -------------------------------------------------------------------------- */
/*  Orden y consultas                                                          */
/* -------------------------------------------------------------------------- */

/** Ordena: destacados primero, luego populares, luego el resto. */
function sortByPriority(a: SeedProduct, b: SeedProduct): number {
  const rank = (p: SeedProduct) => (p.featured ? 0 : p.popular ? 1 : 2)
  const diff = rank(a) - rank(b)
  if (diff !== 0) return diff
  // Dentro del mismo grupo, respeta popularityRank si existe.
  const ra = a.popularityRank ?? Number.MAX_SAFE_INTEGER
  const rb = b.popularityRank ?? Number.MAX_SAFE_INTEGER
  return ra - rb
}

/** Productos de una categoría, ya ordenados y convertidos a `Product`. */
export function getSeedProductsByCategory(category: string): Product[] {
  return seedProducts
    .filter((p) => p.category === category)
    .sort(sortByPriority)
    .map(seedToProduct)
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/** Búsqueda por término libre sobre el catálogo inicial. */
export function searchSeedProducts(term: string): Product[] {
  const q = normalize(term.trim())
  if (!q) return []
  return seedProducts
    .filter((p) =>
      [p.title, p.subcategory ?? '', p.category].some((field) =>
        normalize(field).includes(q),
      ),
    )
    .sort(sortByPriority)
    .map(seedToProduct)
}

/** Productos destacados de todo el catálogo (para la home). */
export function getFeaturedSeedProducts(limit = 8): Product[] {
  return [...seedProducts]
    .sort(sortByPriority)
    .slice(0, limit)
    .map(seedToProduct)
}

/** ¿Hay algún producto en el catálogo inicial? */
export function hasSeedProducts(): boolean {
  return seedProducts.length > 0
}
