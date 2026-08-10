import type { Product } from '@/lib/data'
import { amazonConfig } from './config'
import type { AmazonItem } from './client'

/**
 * Traduce un ítem crudo de la Amazon Creators API al tipo `Product` que usa la
 * interfaz. El mapeo es defensivo: contempla tanto la capitalización estilo
 * PA-API (PascalCase) como camelCase, y tolera campos ausentes.
 */

/** Lee de forma segura una propiedad de un objeto desconocido. */
function get(obj: unknown, key: string): unknown {
  if (obj && typeof obj === 'object' && key in obj) {
    return (obj as Record<string, unknown>)[key]
  }
  return undefined
}

/** Devuelve el primer valor definido de una lista de rutas anidadas. */
function pick(item: AmazonItem, paths: string[][]): unknown {
  for (const path of paths) {
    let current: unknown = item
    for (const key of path) {
      current = get(current, key)
      if (current === undefined) break
    }
    if (current !== undefined && current !== null) return current
  }
  return undefined
}

function asString(value: unknown): string | undefined {
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  return undefined
}

function asNumber(value: unknown): number | undefined {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const n = Number.parseFloat(value.replace(',', '.'))
    return Number.isFinite(n) ? n : undefined
  }
  return undefined
}

/** Genera un slug estable a partir del ASIN o del título. */
function toSlug(asin: string | undefined, title: string): string {
  if (asin) return asin.toLowerCase()
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60)
}

/** Formatea un precio numérico al formato español "24,99 €". */
function formatPrice(amount: number, currency?: string): string {
  const symbol = currency === 'USD' ? '$' : '€'
  const formatted = amount.toLocaleString('es-ES', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
  return `${formatted} ${symbol}`
}

/**
 * Construye la URL de afiliado. Si la API devuelve una `detailPageURL`, se le
 * añade el tag; en su defecto se compone desde el ASIN y el marketplace.
 */
function buildAffiliateUrl(item: AmazonItem, asin: string | undefined): string {
  const detailUrl = asString(
    pick(item, [['detailPageURL'], ['DetailPageURL'], ['url']]),
  )

  const base =
    detailUrl ??
    (asin
      ? `https://${amazonConfig.marketplace}/dp/${asin}`
      : `https://${amazonConfig.marketplace}`)

  try {
    const url = new URL(base)
    url.searchParams.set('tag', amazonConfig.partnerTag)
    return url.toString()
  } catch {
    return base
  }
}

export function mapItemToProduct(
  item: AmazonItem,
  category: string,
): Product | null {
  const asin = asString(pick(item, [['asin'], ['ASIN']]))

  const title = asString(
    pick(item, [
      ['itemInfo', 'title', 'displayValue'],
      ['ItemInfo', 'Title', 'DisplayValue'],
      ['title'],
    ]),
  )
  if (!title) return null

  const features = pick(item, [
    ['itemInfo', 'features', 'displayValues'],
    ['ItemInfo', 'Features', 'DisplayValues'],
  ])
  const description = Array.isArray(features)
    ? (features as unknown[]).map(asString).filter(Boolean).slice(0, 2).join(' ')
    : (asString(
        pick(item, [
          ['itemInfo', 'byLineInfo', 'brand', 'displayValue'],
          ['ItemInfo', 'ByLineInfo', 'Brand', 'DisplayValue'],
        ]),
      ) ?? 'Producto recomendado disponible en Amazon.')

  const image =
    asString(
      pick(item, [
        ['images', 'primary', 'large', 'url'],
        ['Images', 'Primary', 'Large', 'URL'],
        ['image'],
      ]),
    ) ?? '/placeholder.svg'

  // Los precios pueden venir bajo "offersV2" (Creators API, con objeto `money`
  // anidado) o bajo "offers" (PA-API clásica). Contemplamos ambas variantes.
  const priceAmount = asNumber(
    pick(item, [
      ['offersV2', 'listings', 0, 'price', 'money', 'amount'],
      ['offersV2', 'listings', 0, 'price', 'amount'],
      ['offers', 'listings', 0, 'price', 'amount'],
      ['Offers', 'Listings', 0, 'Price', 'Amount'],
    ] as unknown as string[][]),
  )
  const currency = asString(
    pick(item, [
      ['offersV2', 'listings', 0, 'price', 'money', 'currency'],
      ['offersV2', 'listings', 0, 'price', 'currency'],
      ['offers', 'listings', 0, 'price', 'currency'],
      ['Offers', 'Listings', 0, 'Price', 'Currency'],
    ] as unknown as string[][]),
  )
  const displayPrice = asString(
    pick(item, [
      ['offersV2', 'listings', 0, 'price', 'money', 'displayAmount'],
      ['offersV2', 'listings', 0, 'price', 'displayAmount'],
      ['offers', 'listings', 0, 'price', 'displayAmount'],
      ['Offers', 'Listings', 0, 'Price', 'DisplayAmount'],
    ] as unknown as string[][]),
  )

  const price =
    displayPrice ??
    (priceAmount !== undefined
      ? formatPrice(priceAmount, currency)
      : 'Ver precio en Amazon')

  const savingBasis = asNumber(
    pick(item, [
      ['offersV2', 'listings', 0, 'price', 'savingBasis', 'money', 'amount'],
      ['offersV2', 'listings', 0, 'price', 'savingBasis', 'amount'],
      ['offers', 'listings', 0, 'savingBasis', 'amount'],
      ['Offers', 'Listings', 0, 'SavingBasis', 'Amount'],
    ] as unknown as string[][]),
  )
  const hasDiscount =
    priceAmount !== undefined &&
    savingBasis !== undefined &&
    savingBasis > priceAmount

  const rating =
    asNumber(
      pick(item, [
        ['customerReviews', 'starRating', 'value'],
        ['CustomerReviews', 'StarRating', 'Value'],
      ]),
    ) ?? 0

  const reviews =
    asNumber(
      pick(item, [
        ['customerReviews', 'count'],
        ['CustomerReviews', 'Count'],
      ]),
    ) ?? 0

  return {
    slug: toSlug(asin, title),
    name: title,
    description,
    category,
    rating,
    reviews,
    price,
    originalPrice:
      hasDiscount && savingBasis !== undefined
        ? formatPrice(savingBasis, currency)
        : undefined,
    discount:
      hasDiscount && priceAmount !== undefined && savingBasis !== undefined
        ? Math.round((1 - priceAmount / savingBasis) * 100)
        : undefined,
    image,
    affiliateUrl: buildAffiliateUrl(item, asin),
  }
}

/** Mapea una lista de ítems, descartando los que no se pueden convertir. */
export function mapItemsToProducts(
  items: AmazonItem[],
  category: string,
): Product[] {
  return items
    .map((item) => mapItemToProduct(item, category))
    .filter((p): p is Product => p !== null)
}
