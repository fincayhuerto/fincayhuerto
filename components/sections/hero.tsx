'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Search } from 'lucide-react'

export function Hero() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    router.push(`/buscar?q=${encodeURIComponent(q)}`)
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-huerto.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/40" />
      </div>

      <div className="relative mx-auto flex max-w-7xl flex-col items-start px-4 py-20 sm:px-6 md:py-28 lg:px-8 lg:py-32">
        <span className="inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-medium uppercase tracking-wide text-primary-foreground ring-1 ring-primary-foreground/20">
          Huerto · Jardín · Finca
        </span>
        <h1 className="mt-5 max-w-2xl font-serif text-4xl font-bold leading-tight text-primary-foreground text-balance sm:text-5xl md:text-6xl">
          Todo para tu huerto, jardín y finca
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/85 text-pretty">
          Descubre herramientas, productos y soluciones para cuidar tu huerto y
          jardín.
        </p>

        <form
          onSubmit={handleSearch}
          role="search"
          className="mt-8 w-full max-w-xl"
        >
          <label htmlFor="hero-search" className="sr-only">
            ¿Qué estás buscando?
          </label>
          <div className="flex flex-col gap-3 rounded-2xl bg-card p-2 shadow-xl sm:flex-row sm:items-center sm:rounded-full">
            <div className="relative flex-1">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground"
                aria-hidden="true"
              />
              <input
                id="hero-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="¿Qué estás buscando?"
                className="h-12 w-full rounded-full bg-transparent pl-12 pr-4 text-base text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
