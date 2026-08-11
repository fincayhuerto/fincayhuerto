'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/components/nav/nav-model'

export function MobileNav({ onNavigate }: { onNavigate: () => void }) {
  const [openTop, setOpenTop] = useState<string | null>(null)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({})

  function toggleTop(label: string) {
    setOpenTop((prev) => (prev === label ? null : label))
  }
  function toggleGroup(key: string) {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <ul className="grid gap-1">
      {navItems.map((item) => {
        if (item.type === 'link') {
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          )
        }

        const isOpen = openTop === item.label
        return (
          <li key={item.label} className="border-b border-border/50 last:border-0">
            <div className="flex items-center">
              <Link
                href={item.href}
                onClick={onNavigate}
                className="flex-1 rounded-md px-3 py-2.5 text-base font-medium text-foreground/90 transition-colors hover:bg-secondary hover:text-primary"
              >
                {item.label}
              </Link>
              <button
                type="button"
                onClick={() => toggleTop(item.label)}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? 'Contraer' : 'Expandir'} ${item.label}`}
                className="flex size-10 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-primary"
              >
                <ChevronDown
                  className={cn(
                    'size-5 transition-transform duration-200',
                    isOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              </button>
            </div>

            {isOpen && (
              <div className="pb-2 pl-3">
                {item.type === 'mega' ? (
                  <ul className="space-y-0.5">
                    {item.columns.map((column) => {
                      const key = `${item.label}-${column.href}`
                      const groupOpen = Boolean(openGroups[key])
                      const hasChildren = column.links.length > 0
                      return (
                        <li key={column.href}>
                          <div className="flex items-center">
                            <Link
                              href={column.href}
                              onClick={onNavigate}
                              className="flex-1 rounded-md px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-secondary hover:text-primary"
                            >
                              {column.name}
                            </Link>
                            {hasChildren && (
                              <button
                                type="button"
                                onClick={() => toggleGroup(key)}
                                aria-expanded={groupOpen}
                                aria-label={`${groupOpen ? 'Contraer' : 'Expandir'} ${column.name}`}
                                className="flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-primary"
                              >
                                <ChevronDown
                                  className={cn(
                                    'size-4 transition-transform duration-200',
                                    groupOpen && 'rotate-180',
                                  )}
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </div>
                          {hasChildren && groupOpen && (
                            <ul className="ml-3 border-l border-border/70 pl-3">
                              {column.links.map((link) => (
                                <li key={link.href + link.name}>
                                  <Link
                                    href={link.href}
                                    onClick={onNavigate}
                                    className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                                  >
                                    {link.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      )
                    })}
                  </ul>
                ) : (
                  <ul className="space-y-0.5">
                    {item.links.map((link, i) => (
                      <li key={`${link.name}-${i}`}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        )
      })}
    </ul>
  )
}
