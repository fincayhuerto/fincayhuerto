/**
 * Catálogo inicial de productos de Amazon.es para FincaYHuerto.
 *
 * Este catálogo es el FALLBACK mientras la Amazon Creators API devuelve
 * `403 AssociateNotEligible`. Cuando la API pase a estar disponible, se
 * convierte en fuente secundaria automáticamente (ver `lib/products.ts`).
 *
 * REGLAS DE INTEGRIDAD DE DATOS
 * -----------------------------
 * - Los ASIN provienen de la lista curada por el propietario del sitio; no se
 *   inventan aquí.
 * - NUNCA se inventan precios, valoraciones, imágenes ni marcas. Los datos que
 *   no se pueden verificar sin la API se dejan sin definir y la tarjeta los
 *   degrada con elegancia ("Ver precio en Amazon" / "Valoración en Amazon" /
 *   imagen de categoría). La Creators API los rellenará cuando esté activa.
 * - Las entradas sin ASIN verificable usan una BÚSQUEDA de afiliado en
 *   Amazon.es (`searchTerm`), nunca un ASIN inventado.
 * - Los enlaces de afiliado se generan a partir del `AMAZON_PARTNER_TAG` de las
 *   variables de entorno, nunca escrito a mano ni expuesto al navegador.
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
  /** Identificador interno estable (ASIN, o slug de búsqueda). */
  id: string
  /** ASIN real de Amazon.es. Ausente en entradas basadas en búsqueda. */
  asin?: string
  /** Término de búsqueda de afiliado (para entradas sin ASIN verificable). */
  searchTerm?: string
  /** Nombre del producto o de la búsqueda. */
  title: string
  /** Marca verificada (opcional; nunca inventada). */
  brand?: string
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
  /** Disponibilidad verificada (opcional). */
  availability?: string
  /** Origen del dato. */
  source: 'seed-asin' | 'seed-search'
  /** Producto destacado: se muestra primero dentro de su categoría. */
  featured?: boolean
  /** Producto popular / más vendido: se muestra tras los destacados. */
  popular?: boolean
  /** Ranking de popularidad si está disponible (menor = más popular). */
  popularityRank?: number
}

/* -------------------------------------------------------------------------- */
/*  Datos de origen (curados por el propietario del sitio)                     */
/* -------------------------------------------------------------------------- */

/** ASIN reales de Amazon.es agrupados por categoría. */
const ASINS_BY_CATEGORY: Record<SeedCategory, string[]> = {
  huerto: [
    'B0C8543T5J',
    'B09J1C9S5F',
    'B08RNR6CKL',
    'B0DKJHGHBG',
    'B0CN31NZZJ',
    'B0BGQHPSGZ',
    'B0D3QNZZYB',
    'B07NKDXBJV',
    'B08NYMD29T',
    'B0CQRL6HD7',
    'B00IRFPV0Y',
    'B0CRZ2CZJK',
    'B0BLYVXWF3',
    'B0DX12LPSV',
    'B0DL8T2CW5',
    'B0D59K7G31',
    'B0DPQG5Y73',
    'B0FDBMPCY6',
    'B0B6WDXTWK',
    'B0F88FVS4R',
  ],
  jardin: [
    'B0BS9NHJZN',
    'B0CY4S8R6V',
    'B0DPFD457G',
    'B0DNRC11Q8',
    'B0DRSPLYDT',
    'B0F4DHRCVF',
    'B0F38NW8ZL',
    'B0CLVJ3P6W',
    'B0DDX8W4W1',
    'B0CW1QPT3J',
    'B082RBZMRS',
    'B08SVTH466',
    'B07NJNMFVZ',
    'B0BR5Z3HMK',
    'B093H1M865',
    'B0D4LVPGBB',
    'B00VK1YMJS',
    'B0166OI3K2',
    'B0166M18WE',
    'B0173F8WJK',
  ],
  herramientas: [
    'B00F2NHCI8',
    'B09GYS9BTG',
    'B00ZFSMNX4',
    'B092QMSR4Z',
    'B0DWT64PDN',
    'B0D8TKHSW2',
    'B09KPLPL61',
    'B0D5H5SKZF',
    'B0CYLW9Q6C',
    'B0CPS5MP95',
    'B0DRP3J5KY',
    'B076BDCC9R',
    'B0DC5HQWS4',
    'B0DRWLTSBX',
    'B07MJ5LBNG',
    'B0CXJ5KSX3',
    'B0F7ZXM5FL',
    'B0C2MYGR2G',
    'B08N4R626B',
    'B0001E3W8C',
  ],
  riego: [
    'B09JWRSCGJ',
    'B0B719XTZZ',
    'B0C9DJS549',
    'B0CPPCZRSN',
    'B0DRFYLPX4',
    'B08HVJSH8M',
    'B07PDS3HB4',
    'B0DV4JPXVN',
    'B0BWKBFBSS',
    'B0D2DGGP63',
    'B0DT4DZ7RC',
    'B0DV4JX6LX',
    'B0GCJCT6TD',
    'B0F3Z4XKFH',
  ],
  semillas: [
    'B093WJK67T',
    'B0DKTL5FQG',
    'B0DGTBCFCM',
    'B0BVZDXVMG',
    'B0CYM3XJDN',
    'B0D8L537HM',
    'B0DQVGFXM4',
    'B0BPJV4YYR',
    'B09LQYRNK4',
    'B01HMLGB0M',
    'B0DPGNL19X',
  ],
  maquinaria: [
    'B093PG1N2C',
    'B0CXCGTYJ7',
    'B0CLCK1P2K',
    'B0CKTFDDFW',
    'B0BPCLNSFL',
    'B0CR3TJMG4',
    'B0BVZ7Y6J5',
    'B073Q66272',
    'B0DP4PH2J3',
    'B0DK5FTJG2',
  ],
}

/**
 * Entradas de BÚSQUEDA de afiliado (sin ASIN verificable) para completar la
 * distribución objetivo sin inventar ASIN. Cada una enlaza a la búsqueda real
 * de Amazon.es con el Partner Tag.
 */
const SEARCH_ENTRIES: Array<{
  category: SeedCategory
  title: string
  searchTerm: string
}> = [
  {
    category: 'riego',
    title: 'Programador de riego automático',
    searchTerm: 'programador de riego automatico jardin',
  },
  {
    category: 'semillas',
    title: 'Semillas de tomate',
    searchTerm: 'semillas de tomate huerto',
  },
  {
    category: 'semillas',
    title: 'Semillas de lechuga',
    searchTerm: 'semillas de lechuga huerto',
  },
  {
    category: 'semillas',
    title: 'Semillas de pimiento',
    searchTerm: 'semillas de pimiento huerto',
  },
  {
    category: 'semillas',
    title: 'Semillas de albahaca y aromáticas',
    searchTerm: 'semillas aromaticas albahaca huerto',
  },
]

/* -------------------------------------------------------------------------- */
/*  Etiquetas e imágenes de categoría (placeholder honesto, no del producto)   */
/* -------------------------------------------------------------------------- */

/** Etiqueta genérica y honesta por categoría (no es una marca ni un modelo). */
const CATEGORY_LABEL: Record<SeedCategory, string> = {
  huerto: 'Artículo de huerto',
  jardin: 'Artículo de jardín',
  herramientas: 'Herramienta de jardinería',
  riego: 'Producto de riego',
  semillas: 'Semillas para el huerto',
  maquinaria: 'Maquinaria de jardín',
}

/** Imagen ilustrativa de la categoría usada como placeholder (no del producto). */
const CATEGORY_IMAGE: Record<SeedCategory, string> = {
  huerto: '/images/cat-huerto.png',
  jardin: '/images/cat-jardin.png',
  herramientas: '/images/product-herramientas.png',
  riego: '/images/product-riego.png',
  semillas: '/images/product-semillas.png',
  maquinaria: '/images/cat-maquinaria.png',
}

/* -------------------------------------------------------------------------- */
/*  Construcción del catálogo (con deduplicación de ASIN)                      */
/* -------------------------------------------------------------------------- */

function buildSeedProducts(): SeedProduct[] {
  const out: SeedProduct[] = []
  const seenAsins = new Set<string>()

  for (const category of Object.keys(ASINS_BY_CATEGORY) as SeedCategory[]) {
    ASINS_BY_CATEGORY[category].forEach((asin, index) => {
      const normalized = asin.trim().toUpperCase()
      // Regla 8/9: elimina duplicados; conserva la primera categoría asignada.
      if (seenAsins.has(normalized)) return
      seenAsins.add(normalized)

      out.push({
        id: normalized,
        asin: normalized,
        title: `${CATEGORY_LABEL[category]} · Ref. ${normalized}`,
        category,
        source: 'seed-asin',
        // El primer producto de cada categoría se marca como destacado
        // únicamente para dar un orden estable, sin afirmar nada del producto.
        featured: index === 0,
        popular: index < 4,
        popularityRank: index,
      })
    })
  }

  // Entradas basadas en búsqueda de afiliado (sin ASIN).
  SEARCH_ENTRIES.forEach((entry, index) => {
    out.push({
      id: `search-${entry.category}-${index}`,
      searchTerm: entry.searchTerm,
      title: entry.title,
      category: entry.category,
      source: 'seed-search',
      popularityRank: 100 + index,
    })
  })

  return out
}

export const seedProducts: SeedProduct[] = buildSeedProducts()

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
 * URL de afiliado de un producto: `/dp/{ASIN}` + Partner Tag de la variable de
 * entorno. Si no hay tag configurado, devuelve la URL sin tag.
 */
export function buildAffiliateUrl(asin: string): string {
  const url = new URL(buildAmazonUrl(asin))
  const tag = process.env.AMAZON_PARTNER_TAG
  if (tag) url.searchParams.set('tag', tag)
  return url.toString()
}

/**
 * URL de afiliado de una BÚSQUEDA en Amazon.es + Partner Tag de la variable de
 * entorno. Se usa para entradas sin ASIN y para búsquedas del usuario sin
 * coincidencias en el catálogo.
 */
export function buildAffiliateSearchUrl(term: string): string {
  const url = new URL(`https://${marketplaceHost()}/s`)
  url.searchParams.set('k', term)
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
 *   - sin imagen  → imagen ilustrativa de la categoría
 */
export function seedToProduct(seed: SeedProduct): Product {
  const affiliateUrl = seed.asin
    ? buildAffiliateUrl(seed.asin)
    : buildAffiliateSearchUrl(seed.searchTerm ?? seed.title)

  const description =
    seed.source === 'seed-search'
      ? 'Explora las mejores opciones disponibles ahora en Amazon.es.'
      : 'Producto real de Amazon.es. Consulta nombre, precio y valoraciones actualizados en Amazon.'

  return {
    slug: (seed.asin ?? seed.id).toLowerCase(),
    name: seed.title,
    description: seed.subcategory ?? description,
    category: seed.category,
    rating: seed.rating ?? 0,
    reviews: seed.reviewCount ?? 0,
    price:
      typeof seed.price === 'number'
        ? formatPrice(seed.price, seed.currency)
        : 'Ver precio en Amazon',
    image: seed.imageUrl ?? CATEGORY_IMAGE[seed.category],
    affiliateUrl,
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
      [p.title, p.subcategory ?? '', p.searchTerm ?? '', p.category].some(
        (field) => normalize(field).includes(q),
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

/** Total de entradas del catálogo inicial (para verificación). */
export function seedProductCount(): number {
  return seedProducts.length
}
