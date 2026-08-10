'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Leaf, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { label: 'Inicio', href: '/' },
  { label: 'Huerto', href: '/categoria/huerto' },
  { label: 'Jardín', href: '/categoria/jardin' },
  { label: 'Herramientas', href: '/categoria/herramientas' },
  { label: 'Riego', href: '/categoria/riego' },
  { label: 'Semillas', href: '/categoria/semillas' },
  { label: 'Maquinaria', href: '/categoria/maquinaria' },
  { label: 'Ofertas', href: '/ofertas' },
  { label: 'Comparativas', href: '/comparativas' },
  { label: 'Blog', href: '/blog' },
]

export function SiteHeader() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setOpen(false)
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Leaf className="size-5" aria-hidden="true" />
          </span>
          <span className="font-serif text-xl font-bold tracking-tight text-primary">
            FincaYHuerto
          </span>
        </Link>

        {/* Buscador de escritorio */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="ml-auto hidden max-w-xs flex-1 items-center md:flex"
        >
          <label htmlFor="site-search" className="sr-only">
            Buscar productos
          </label>
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="site-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>
        </form>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="ml-auto inline-flex size-10 items-center justify-center rounded-lg text-primary hover:bg-secondary lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Navegación de escritorio */}
      <nav
        aria-label="Principal"
        className="hidden border-t border-border/60 bg-background lg:block"
      >
        <ul className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex h-11 items-center rounded-md px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-nav"
        className={cn(
          'lg:hidden overflow-hidden border-t border-border bg-background transition-[max-height] duration-300',
          open ? 'max-h-[32rem]' : 'max-h-0',
        )}
      >
        <div className="space-y-4 px-4 py-4 sm:px-6">
          <form onSubmit={handleSearch} role="search" className="relative">
            <label htmlFor="mobile-search" className="sr-only">
              Buscar productos
            </label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              id="mobile-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="h-11 w-full rounded-full border border-border bg-card pl-9 pr-4 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </form>
          <ul className="grid gap-1">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  )
}
