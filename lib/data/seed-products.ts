/**
 * Catálogo PROVISIONAL de FincaYHuerto.
 *
 * Sirve únicamente para que la web tenga contenido y enlaces mientras la Amazon
 * Creators API devuelve `403 AssociateNotEligible`. Cuando la API pase a estar
 * disponible, se convierte en fuente secundaria automáticamente (la fuente
 * principal es la API; ver `lib/products.ts`).
 *
 * REGLAS DE INTEGRIDAD DE DATOS (mientras la API dé 403)
 * ------------------------------------------------------
 * - NO se inventan precios, valoraciones, número de opiniones, marcas, ASIN ni
 *   imágenes de productos concretos.
 * - Cada entrada es un TIPO de producto basado en una búsqueda real de
 *   Amazon.es. El enlace es una búsqueda de afiliado, no un producto concreto.
 * - Los enlaces de afiliado se generan a partir del `AMAZON_PARTNER_TAG` de las
 *   variables de entorno, nunca escrito a mano ni expuesto al navegador.
 * - La imagen es una ilustración GENÉRICA de la categoría (no de un producto
 *   concreto). La API rellenará imágenes reales cuando esté activa.
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
  /** Identificador interno estable (único por categoría + tipo). */
  id: string
  /** Nombre descriptivo del tipo de producto. */
  title: string
  /** Categoría del sitio. */
  category: SeedCategory
  /** Subcategoría / agrupación temática. */
  subcategory: string
  /** Término de búsqueda de afiliado en Amazon.es. */
searchTerm: string
/** ASIN de Amazon para enlazar directamente al producto. */
asin?: string
}

/* -------------------------------------------------------------------------- */
/*  Datos de origen: tipos de producto por categoría (búsquedas reales)         */
/*  Formato: [nombre del tipo de producto, subcategoría]                        */
/* -------------------------------------------------------------------------- */

const CATALOG: Record<
  SeedCategory,
  Array<[title: string, subcategory: string, asin?: string]>
> = 
{
    huerto: [
      ['Semillas de tomate', 'Semillas'],
      ['Semillas de pimiento', 'Semillas'],
      ['Semillas de lechuga', 'Semillas'],
      ['Semilleros', 'Germinación'],
      ['Bandejas de cultivo', 'Germinación'],
      ['Sustrato universal', 'Sustratos y abonos'],
      ['Tierra para huerto', 'Sustratos y abonos'],
      ['Abono orgánico', 'Sustratos y abonos'],
      ['Compost', 'Sustratos y abonos'],
      ['Guantes de jardinería', 'Protección'],
      ['Plantadores', 'Plantación'],
      ['Tutores para plantas', 'Plantación'],
      ['Malla de sombreo', 'Protección de cultivos'],
      ['Malla antiheladas', 'Protección de cultivos'],
      ['Pulverizador', 'Tratamientos'],
      ['Tijeras de cosecha', 'Herramientas de mano'],
      ['Azada', 'Herramientas de mano'],
      ['Horca', 'Herramientas de mano'],
      ['Rastrillo', 'Herramientas de mano'],
      ['Carretilla', 'Transporte'],
      ['Tijeras cortasetos', 'Poda'],
      ['Sierra de poda', 'Poda'],
      ['Manguera', 'Riego'],
      ['Pistola de riego', 'Riego'],
      ['Aspersor', 'Riego'],
      ['Programador de riego', 'Riego'],
      ['Regadera', 'Riego'],
      ['Guantes de jardinería', 'Protección'],
      ['Escoba de jardín', 'Limpieza'],
      ['Rastrillo', 'Herramientas de mano'],
      ['Pala', 'Herramientas de mano'],
      ['Soplador de hojas', 'Limpieza'],
      ['Cortasetos', 'Poda'],
      ['Abono para césped', 'Cuidado del césped'],
      ['Semillas de césped', 'Cuidado del césped'],
      ['Herbicida', 'Tratamientos'],
      ['Macetas', 'Macetas y jardineras'],
      ['Jardinera', 'Macetas y jardineras'],
    ],
      jardin: [
  ['Bellota 3628 INOX-CE MB - Tijera Recolectora', 'Poda'],
      ],
    herramientas: [
      ['Azada', 'Herramientas de huerto'],
      ['Pala', 'Herramientas de huerto'],
      ['Pico', 'Herramientas de huerto'],
      ['Rastrillo', 'Herramientas de huerto'],
      ['Horca', 'Herramientas de huerto'],
      ['Tijeras de podar', 'Poda'],
      ['Sierra de poda', 'Poda'],
      ['Serrucho', 'Corte'],
      ['Taladro', 'Herramienta eléctrica'],
      ['Atornillador', 'Herramienta eléctrica'],
      ['Destornillador', 'Herramientas de mano'],
      ['Alicates', 'Herramientas de mano'],
      ['Llave inglesa', 'Herramientas de mano'],
      ['Juego de llaves', 'Herramientas de mano'],
      ['Martillo', 'Herramientas de mano'],
      ['Cutter', 'Corte'],
      ['Carretilla', 'Transporte'],
      ['Guantes', 'Protección'],
      ['Banco de trabajo', 'Taller'],
      ['Caja de herramientas', 'Almacenaje'],
    ],
    riego: [
      ['Manguera de jardín', 'Mangueras'],
      ['Carrete portamanguera', 'Mangueras'],
      ['Pistola de riego', 'Accesorios de manguera'],
      ['Aspersor', 'Aspersión'],
      ['Programador de riego', 'Programadores'],
      ['Programador digital', 'Programadores'],
      ['Riego por goteo', 'Riego por goteo'],
      ['Kit de riego por goteo', 'Riego por goteo'],
      ['Tubo de riego', 'Riego por goteo'],
      ['Gotero', 'Riego por goteo'],
      ['Conectores de riego', 'Conexiones'],
      ['Electroválvula', 'Conexiones'],
      ['Bomba de agua', 'Bombas'],
      ['Regadera', 'Riego manual'],
      ['Depósito de agua', 'Almacenamiento de agua'],
    ],
    semillas: [
      ['Semillas de tomate', 'Semillas de hortalizas'],
      ['Semillas de pimiento', 'Semillas de hortalizas'],
      ['Semillas de lechuga', 'Semillas de hortalizas'],
      ['Semillas de cebolla', 'Semillas de hortalizas'],
      ['Semillas de zanahoria', 'Semillas de hortalizas'],
      ['Semillas de calabacín', 'Semillas de hortalizas'],
      ['Semillas de pepino', 'Semillas de hortalizas'],
      ['Semillas de berenjena', 'Semillas de hortalizas'],
      ['Semillas de espinaca', 'Semillas de hortalizas'],
      ['Semillas de acelga', 'Semillas de hortalizas'],
      ['Semillas de rábano', 'Semillas de hortalizas'],
      ['Semillas de judía', 'Semillas de hortalizas'],
      ['Semillas de guisante', 'Semillas de hortalizas'],
      ['Semillas de calabaza', 'Semillas de hortalizas'],
      ['Semillas de brócoli', 'Semillas de hortalizas'],
    ],
    maquinaria: [
      ['Cortacésped', 'Cuidado del césped'],
      ['Desbrozadora', 'Corte y desbroce'],
      ['Cortasetos', 'Poda'],
      ['Motosierra', 'Corte de leña'],
      ['Soplador', 'Limpieza'],
      ['Motosierra de poda', 'Poda'],
      ['Mini motosierra', 'Poda'],
      ['Motocultor', 'Labranza'],
      ['Biotrituradora', 'Trituración'],
      ['Aspirador de hojas', 'Limpieza'],
    ],
  }

/**
 * Sufijo de búsqueda por categoría para mejorar la relevancia en Amazon.es.
 * No se añade si el título ya contiene la raíz del sufijo.
 */
const SEARCH_SUFFIX: Record<SeedCategory, string> = {
  huerto: 'huerto',
  jardin: 'jardín',
  herramientas: 'herramienta',
  riego: 'riego',
  semillas: 'huerto',
  maquinaria: 'jardín',
}

/** Imagen ILUSTRATIVA de la categoría (no de un producto concreto). */
const CATEGORY_IMAGE: Record<SeedCategory, string> = {
  huerto: '/images/cat-huerto.png',
  jardin: '/images/cat-jardin.png',
  herramientas: '/images/product-herramientas.png',
  riego: '/images/product-riego.png',
  semillas: '/images/product-semillas.png',
  maquinaria: '/images/cat-maquinaria.png',
}

/* -------------------------------------------------------------------------- */
/*  Utilidades                                                                  */
/* -------------------------------------------------------------------------- */

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

function slugify(value: string): string {
  return normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/** Construye el término de búsqueda añadiendo el sufijo de categoría si aporta. */
function buildSearchTerm(title: string, category: SeedCategory): string {
  const suffix = SEARCH_SUFFIX[category]
  const alreadyIncluded = normalize(title).includes(normalize(suffix))
  return alreadyIncluded ? title : `${title} ${suffix}`
}

/* -------------------------------------------------------------------------- */
/*  Construcción del catálogo                                                   */
/* -------------------------------------------------------------------------- */

function buildSeedProducts(): SeedProduct[] {
  const out: SeedProduct[] = []
  for (const category of Object.keys(CATALOG) as SeedCategory[]) {
    for (const [title, subcategory, asin] of CATALOG[category]) {
      out.push({
        id: `${category}-${slugify(title)}`,
        title,
        category,
        subcategory,
        searchTerm: buildSearchTerm(title, category),
        asin,
      })
    }
  }
  return out
}

export const seedProducts: SeedProduct[] = buildSeedProducts()

/* -------------------------------------------------------------------------- */
/*  Generación de enlaces de afiliado                                          */
/* -------------------------------------------------------------------------- */

function marketplaceHost(): string {
  return process.env.AMAZON_MARKETPLACE ?? 'www.amazon.es'
}

/**
 * URL de afiliado de una BÚSQUEDA en Amazon.es + Partner Tag de la variable de
 * entorno. Si no hay tag configurado, devuelve la URL sin tag.
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

/**
 * Convierte un `SeedProduct` provisional al `Product` que consumen las tarjetas.
 * NO incluye precio, valoración ni opiniones: son datos que no se pueden
 * verificar sin la API y no se inventan.
 *   - price  → '' (la tarjeta oculta el precio)
 *   - rating → 0  (la tarjeta oculta la valoración)
 *   - image  → ilustración GENÉRICA de la categoría (no de un producto)
 */
export function seedToProduct(seed: SeedProduct): Product {
  return {
    slug: seed.id,
    name: seed.title,
    description: seed.subcategory,
    category: seed.category,
    rating: 0,
    reviews: 0,
    price: '',
    image: CATEGORY_IMAGE[seed.category],
    affiliateUrl: seed.asin
  ? (() => {
      const url = new URL(`https://${marketplaceHost()}/dp/${encodeURIComponent(seed.asin)}`)
      const tag = process.env.AMAZON_PARTNER_TAG
      if (tag) url.searchParams.set('tag', tag)
      return url.toString()
    })()
  : buildAffiliateSearchUrl(seed.searchTerm),
  }
}

/* -------------------------------------------------------------------------- */
/*  Consultas                                                                   */
/* -------------------------------------------------------------------------- */

/** Productos de una categoría, convertidos a `Product`. */
export function getSeedProductsByCategory(category: string): Product[] {
  return seedProducts
    .filter((p) => p.category === category)
    .map(seedToProduct)
}

/** Búsqueda por término libre sobre el catálogo provisional. */
export function searchSeedProducts(term: string): Product[] {
  const q = normalize(term.trim())
  if (!q) return []
  return seedProducts
    .filter((p) =>
      [p.title, p.subcategory, p.searchTerm, p.category].some((field) =>
        normalize(field).includes(q),
      ),
    )
    .map(seedToProduct)
}

/** Productos para la home (una muestra representativa de cada categoría). */
export function getFeaturedSeedProducts(limit = 8): Product[] {
  const categoriesOrder = Object.keys(CATALOG) as SeedCategory[]
  const picks: SeedProduct[] = []
  // Toma el primer producto de cada categoría de forma rotatoria.
  let index = 0
  while (picks.length < limit && picks.length < seedProducts.length) {
    for (const category of categoriesOrder) {
      const list = seedProducts.filter((p) => p.category === category)
      if (list[index]) picks.push(list[index])
      if (picks.length >= limit) break
    }
    index += 1
    if (index > 30) break
  }
  return picks.map(seedToProduct)
}

/** ¿Hay algún producto en el catálogo provisional? */
export function hasSeedProducts(): boolean {
  return seedProducts.length > 0
}

/** Total de entradas del catálogo provisional (para verificación). */
export function seedProductCount(): number {
  return seedProducts.length
}
