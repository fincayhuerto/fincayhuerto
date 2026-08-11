'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems, type NavItem } from '@/components/nav/nav-model'

function hasMenu(item: NavItem) {
  return item.type === 'mega' || item.type === 'list'
}

export function DesktopNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function cancelClose() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current)
      closeTimer.current = null
    }
  }

  function scheduleClose() {
    cancelClose()
    closeTimer.current = setTimeout(() => setOpenIndex(null), 140)
  }

  function open(index: number) {
    cancelClose()
    setOpenIndex(index)
  }

  const activeItem = openIndex !== null ? navItems[openIndex] : null

  return (
    <nav
      aria-label="Principal"
      className="relative hidden border-t border-border/60 bg-background lg:block"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <ul className="mx-auto flex max-w-7xl items-center gap-1 px-4 sm:px-6 lg:px-8">
        {navItems.map((item, index) => {
          const menu = hasMenu(item)
          const isOpen = openIndex === index
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                onMouseEnter={() => (menu ? open(index) : setOpenIndex(null))}
                onFocus={() => (menu ? open(index) : setOpenIndex(null))}
                aria-expanded={menu ? isOpen : undefined}
                className={cn(
                  'inline-flex h-12 items-center gap-1 rounded-md px-3 text-sm font-medium transition-colors',
                  isOpen
                    ? 'bg-secondary text-primary'
                    : 'text-foreground/80 hover:bg-secondary hover:text-primary',
                )}
              >
                {item.label}
                {menu && (
                  <ChevronDown
                    className={cn(
                      'size-3.5 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          )
        })}
      </ul>

      {/* Panel del mega-menú */}
      {activeItem && hasMenu(activeItem) && (
        <div
          className="absolute inset-x-0 top-full z-50 border-b border-border bg-background shadow-xl shadow-primary/5 duration-200 animate-in fade-in slide-in-from-top-1"
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {activeItem.type === 'mega' ? (
              <div className="flex gap-6">
                {/* Bloque destacado de la categoría */}
                <Link
                  href={activeItem.href}
                  className="group relative hidden w-56 shrink-0 overflow-hidden rounded-2xl border border-border xl:block"
                >
                  <Image
                    src={activeItem.image || '/placeholder.svg'}
                    alt={activeItem.label}
                    fill
                    sizes="224px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-4 text-primary-foreground">
                    <span className="block font-serif text-lg font-bold">
                      {activeItem.label}
                    </span>
                    <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium">
                      Ver todo
                      <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>

                {/* Columnas de grupos y subcategorías */}
                <div className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 xl:grid-cols-4">
                  {activeItem.columns.map((column) => (
                    <div key={column.href}>
                      <Link
                        href={column.href}
                        className="group flex items-center gap-2.5"
                      >
                        {column.image && (
                          <span className="relative size-9 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary/40">
                            <Image
                              src={column.image || '/placeholder.svg'}
                              alt=""
                              fill
                              sizes="36px"
                              className="object-cover"
                            />
                          </span>
                        )}
                        <span className="text-sm font-semibold text-foreground transition-colors group-hover:text-primary">
                          {column.name}
                        </span>
                      </Link>
                      {column.links.length > 0 && (
                        <ul className="mt-2 space-y-1.5 border-l border-border/70 pl-3">
                          {column.links.map((link) => (
                            <li key={`${column.href}-${link.name}`}>
                              <Link
                                href={link.href}
                                className="block text-sm text-muted-foreground transition-colors hover:text-primary"
                              >
                                {link.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <Link
                  href={activeItem.href}
                  className="inline-flex items-center gap-1 font-serif text-lg font-bold text-primary hover:underline"
                >
                  {activeItem.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3">
                  {activeItem.links.map((link, i) => (
                    <li key={`${link.name}-${i}`}>
                      <Link
                        href={link.href}
                        className="block rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
