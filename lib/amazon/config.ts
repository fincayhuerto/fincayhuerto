/**
 * Configuración central de la integración con la Amazon Creators API.
 *
 * Todos los valores sensibles se leen desde variables de entorno del servidor
 * (nunca con prefijo NEXT_PUBLIC_) y sólo se usan dentro de módulos server-only.
 */

/** ¿Están presentes las credenciales mínimas para llamar a la API? */
export function isAmazonConfigured(): boolean {
  return Boolean(
    process.env.AMAZON_CREATORS_CLIENT_ID &&
      process.env.AMAZON_CREATORS_CLIENT_SECRET &&
      process.env.AMAZON_PARTNER_TAG,
  )
}

export const amazonConfig = {
  clientId: process.env.AMAZON_CREATORS_CLIENT_ID ?? '',
  clientSecret: process.env.AMAZON_CREATORS_CLIENT_SECRET ?? '',
  /** Tracking ID de afiliado, p. ej. "fincayhuerto-21". */
  partnerTag: process.env.AMAZON_PARTNER_TAG ?? '',
  /** Marketplace objetivo. Por defecto España. */
  marketplace: process.env.AMAZON_MARKETPLACE ?? 'www.amazon.es',
  /** Endpoint de token de Login with Amazon (client_credentials). */
  tokenEndpoint:
    process.env.AMAZON_TOKEN_ENDPOINT ?? 'https://api.amazon.com/auth/o2/token',
  /** Endpoint base de la Creators API. */
  apiBase:
    process.env.AMAZON_CREATORS_API_BASE ?? 'https://creatorsapi.amazon',
  /** Scope solicitado en el flujo client_credentials. */
  scope: process.env.AMAZON_CREATORS_SCOPE ?? 'creatorsapi::default',
} as const

/**
 * Tiempo de revalidación de la caché (en segundos) para las respuestas de
 * producto. 6 horas es un buen equilibrio entre frescura de precios y no
 * agotar la cuota de la API.
 */
export const PRODUCTS_REVALIDATE_SECONDS = Number(
  process.env.AMAZON_REVALIDATE_SECONDS ?? 60 * 60 * 6,
)

/**
 * Palabras clave de búsqueda asociadas a cada categoría de la web. Se usan para
 * consultar la API cuando el usuario visita una página de categoría.
 */
export const categoryKeywords: Record<string, string> = {
  huerto: 'huerto urbano cultivo hortalizas',
  jardin: 'jardín plantas flores césped',
  herramientas: 'herramientas jardinería podar',
  riego: 'riego goteo manguera programador',
  semillas: 'semillas hortalizas huerto',
  maquinaria: 'motocultor desbrozadora maquinaria jardín',
}
