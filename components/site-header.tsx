'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Leaf, Menu, Search, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { TopBar } from '@/components/nav/top-bar'
import { DesktopNav } from '@/components/nav/desktop-nav'
import { MobileNav } from '@/components/nav/mobile-nav'

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
      <TopBar />

      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2">
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

      {/* Navegación de escritorio con mega-menú */}
      <DesktopNav />

      {/* Menú móvil */}
      <div
        id="mobile-nav"
        className={cn(
          'overflow-y-auto border-t border-border bg-background transition-[max-height] duration-300 lg:hidden',
          open ? 'max-h-[80vh]' : 'max-h-0',
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
          <MobileNav onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </header>
  )
}
