import 'server-only'

import { amazonConfig, isAmazonConfigured } from './config'
import {
  isEligibilityBlocked,
  markEligible,
  markNotEligible,
} from './eligibility'

/**
 * Cliente server-only de la Amazon Creators API.
 *
 * Flujo:
 *  1. Se obtiene un token OAuth 2.0 (client_credentials) vía Login with Amazon.
 *     El token se cachea en memoria durante su vida útil (~1 h).
 *  2. Se llama a la operación SearchItems con el token y el header x-marketplace.
 *
 * Toda la comunicación ocurre en el servidor. Las claves nunca llegan al
 * navegador.
 */

type TokenCache = {
  token: string
  /** Marca de tiempo (ms) en la que el token deja de ser válido. */
  expiresAt: number
}

let cachedToken: TokenCache | null = null

/** Estructura mínima esperada de un ítem devuelto por la API. */
export type AmazonItem = Record<string, unknown>

async function getAccessToken(): Promise<string | null> {
  // Reutiliza el token si aún es válido (con 60 s de margen).
  if (cachedToken && cachedToken.expiresAt - 60_000 > Date.now()) {
    return cachedToken.token
  }

  try {
    const res = await fetch(amazonConfig.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        grant_type: 'client_credentials',
        client_id: amazonConfig.clientId,
        client_secret: amazonConfig.clientSecret,
        scope: amazonConfig.scope,
      }),
      // El token no debe cachearse a nivel de fetch: lo gestionamos nosotros.
      cache: 'no-store',
    })

    if (!res.ok) {
      console.log(
        `[v0] Amazon token error: ${res.status} ${res.statusText}`,
      )
      return null
    }

    const data = (await res.json()) as {
      access_token?: string
      expires_in?: number
    }

    if (!data.access_token) {
      console.log('[v0] Amazon token response sin access_token')
      return null
    }

    cachedToken = {
      token: data.access_token,
      expiresAt: Date.now() + (data.expires_in ?? 3600) * 1000,
    }

    return cachedToken.token
  } catch (error) {
    console.log(
      `[v0] Amazon token fetch falló: ${
        error instanceof Error ? error.message : 'error desconocido'
      }`,
    )
    return null
  }
}

/**
 * Ejecuta la operación SearchItems de la Creators API.
 * Devuelve la lista de ítems en crudo, o null si algo falla (para que la capa
 * superior use el fallback).
 */
export async function searchItems(
  keywords: string,
  options: { itemCount?: number } = {},
): Promise<AmazonItem[] | null> {
  if (!isAmazonConfigured()) return null

  // Si sabemos que la cuenta no es elegible, no gastamos una llamada: usamos el
  // fallback directamente hasta que expire el enfriamiento.
  if (isEligibilityBlocked()) return null

  const token = await getAccessToken()
  if (!token) return null

  try {
    const res = await fetch(
      `${amazonConfig.apiBase}/catalog/v1/searchItems`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          'x-marketplace': amazonConfig.marketplace,
        },
        body: JSON.stringify({
          marketplace: amazonConfig.marketplace,
          partnerTag: amazonConfig.partnerTag,
          partnerType: 'Associates',
          keywords,
          itemCount: options.itemCount ?? 10,
          // La Creators API espera los recursos en lowerCamelCase con puntos.
          // Los precios viven bajo "offersV2" (no "offers").
          resources: [
            'images.primary.large',
            'itemInfo.title',
            'itemInfo.features',
            'itemInfo.byLineInfo',
            'offersV2.listings.price',
            'offersV2.listings.dealDetails',
            'customerReviews.count',
            'customerReviews.starRating',
          ],
        }),
        // Sin caché HTTP: la capa superior (lib/products) cachea con unstable_cache.
        cache: 'no-store',
      },
    )

    if (!res.ok) {
      const errorBody = await res.text().catch(() => '')

      // 403 AssociateNotEligible: la cuenta aún no cumple los requisitos de
      // Amazon. Activamos el enfriamiento para no repetir llamadas inútiles.
      // La recuperación es automática cuando expire.
      if (
        res.status === 403 &&
        /AssociateNotEligible|eligibility/i.test(errorBody)
      ) {
        markNotEligible()
      }

      console.log(
        `[v0] Amazon searchItems error: ${res.status} ${res.statusText} :: ${errorBody.slice(0, 300)}`,
      )
      return null
    }

    // Respuesta correcta: la cuenta es elegible. Reanudamos el uso normal.
    markEligible()

    const data = (await res.json()) as {
      searchResult?: { items?: AmazonItem[] }
      SearchResult?: { Items?: AmazonItem[] }
    }

    // La API puede devolver las claves en distintas capitalizaciones según la
    // versión; contemplamos ambas.
    const items = data.searchResult?.items ?? data.SearchResult?.Items ?? null

    return items ?? []
  } catch (error) {
    console.log(
      `[v0] Amazon searchItems fetch falló: ${
        error instanceof Error ? error.message : 'error desconocido'
      }`,
    )
    return null
  }
}
