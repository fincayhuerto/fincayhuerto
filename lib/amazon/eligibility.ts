import 'server-only'

/**
 * Interruptor de elegibilidad (circuit breaker) para la Amazon Creators API.
 *
 * Amazon devuelve 403 `AssociateNotEligible` hasta que la cuenta de afiliado
 * cumple los requisitos (p. ej. las 3 ventas cualificadas). Cuando detectamos
 * ese estado, dejamos de llamar a la API durante un periodo de enfriamiento
 * para no malgastar cuota ni añadir latencia inútil.
 *
 * El estado vive en memoria del proceso (por instancia serverless). Combinado
 * con la caché de Next.js (`unstable_cache`), es suficiente para evitar
 * llamadas repetidas. La recuperación es automática: al expirar el enfriamiento
 * se permite una nueva llamada de sondeo y, si Amazon ya responde, el sistema
 * reanuda el uso de datos reales sin intervención.
 */

/** Duración del enfriamiento tras un 403 de no elegibilidad (por defecto 1 h). */
const COOLDOWN_MS = Number(
  process.env.AMAZON_ELIGIBILITY_COOLDOWN_MS ?? 60 * 60 * 1000,
)

const state = {
  /** Instante (ms epoch) hasta el que NO se debe llamar a Amazon. */
  blockedUntil: 0,
}

/** ¿Estamos dentro del periodo de enfriamiento por no elegibilidad? */
export function isEligibilityBlocked(): boolean {
  return Date.now() < state.blockedUntil
}

/** Marca la cuenta como no elegible e inicia el enfriamiento. */
export function markNotEligible(): void {
  state.blockedUntil = Date.now() + COOLDOWN_MS
  console.log(
    `[v0] Amazon no elegible (AssociateNotEligible). Se pausan las llamadas hasta ${new Date(
      state.blockedUntil,
    ).toISOString()}.`,
  )
}

/** Marca la cuenta como elegible y limpia el enfriamiento. */
export function markEligible(): void {
  if (state.blockedUntil !== 0) {
    console.log('[v0] Amazon vuelve a responder: se reanudan las llamadas.')
  }
  state.blockedUntil = 0
}
