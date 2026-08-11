'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import type { Product } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

type SortKey = 'relevancia' | 'nombre' | 'precio-asc' | 'precio-desc' | 'valoracion'

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'relevancia', label: 'Relevancia' },
  { value: 'nombre', label: 'Nombre (A-Z)' },
  { value: 'precio-asc', label: 'Precio: menor a mayor' },
  { value: 'precio-desc', label: 'Precio: mayor a menor' },
  { value: 'valoracion', label: 'Mejor valorados' },
]

/** Extrae un número de precio de una cadena tipo "24,99 €" (0 si no hay). */
function priceValue(price: string): number {
  if (!price) return 0
  const match = price.replace(/\./g, '').replace(',', '.').match(/[\d.]+/)
  return match ? Number.parseFloat(match[0]) : 0
}

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

/**
 * Explorador de productos de una categoría: filtro de texto en cliente y
 * ordenación. Recibe los productos ya resueltos por la capa de productos
 * (Amazon API → catálogo provisional → demo) desde el servidor.
 */
export function CategoryBrowser({ products }: { products: Product[] }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortKey>('relevancia')

  const visible = useMemo(() => {
    const q = normalize(query.trim())
    let list = q
      ? products.filter((p) =>
          [p.name, p.description].some((f) => normalize(f).includes(q)),
        )
      : [...products]

    switch (sort) {
      case 'nombre':
        list.sort((a, b) => a.name.localeCompare(b.name, 'es'))
        break
      case 'precio-asc':
        list.sort((a, b) => priceValue(a.price) - priceValue(b.price))
        break
      case 'precio-desc':
        list.sort((a, b) => priceValue(b.price) - priceValue(a.price))
        break
      case 'valoracion':
        list.sort((a, b) => b.rating - a.rating)
        break
      default:
        break
    }
    return list
  }, [products, query, sort])

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <label htmlFor="category-filter" className="sr-only">
            Filtrar productos
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="category-filter"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filtrar en esta categoría…"
            className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            className="size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <label htmlFor="category-sort" className="sr-only">
            Ordenar productos
          </label>
          <select
            id="category-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="h-11 rounded-full border border-border bg-card px-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">
        {visible.length} producto{visible.length === 1 ? '' : 's'}
      </p>

      {visible.length > 0 ? (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No hay productos que coincidan con tu filtro.
        </p>
      )}
    </div>
  )
}
