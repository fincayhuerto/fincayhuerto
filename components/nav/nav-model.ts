/**
 * Modelo de navegación de FincaYHuerto.
 *
 * Se construye a partir de la taxonomía jerárquica (`lib/taxonomy.ts`) y de las
 * comparativas reales existentes (`lib/data.ts`). Es un módulo de datos puro
 * (sin lógica de servidor), reutilizable tanto por el mega-menú de escritorio
 * como por el acordeón móvil.
 */

import { taxonomy } from '@/lib/taxonomy'
import { comparisons } from '@/lib/data'

export type NavColumn = {
  /** Grupo del mega-menú (cabecera de columna). */
  name: string
  href: string
  image?: string
  /** Subcategorías del grupo (pueden estar vacías). */
  links: { name: string; href: string }[]
}

export type NavItem =
  | { type: 'link'; label: string; href: string }
  | {
      type: 'mega'
      label: string
      href: string
      image: string
      icon: string
      description: string
      columns: NavColumn[]
    }
  | {
      type: 'list'
      label: string
      href: string
      links: { name: string; href: string }[]
    }

const categoryItems: NavItem[] = taxonomy.map((category) => {
  const base = `/categoria/${category.slug}`
  return {
    type: 'mega' as const,
    label: category.name,
    href: base,
    image: category.image,
    icon: category.icon,
    description: category.searchTerm,
    columns: category.groups.map((group) => ({
      name: group.name,
      href: `${base}/${group.slug}`,
      image: group.image,
      links: (group.children ?? []).map((leaf) => ({
        name: leaf.name,
        href: `${base}/${group.slug}/${leaf.slug}`,
      })),
    })),
  }
})

const ofertasItem: NavItem = {
  type: 'list',
  label: 'Ofertas',
  href: '/ofertas',
  links: [
    { name: 'Mejores ofertas', href: '/ofertas' },
    { name: 'Herramientas en oferta', href: '/ofertas' },
    { name: 'Riego en oferta', href: '/ofertas' },
    { name: 'Maquinaria en oferta', href: '/ofertas' },
    { name: 'Productos para huerto en oferta', href: '/ofertas' },
    { name: 'Productos para jardín en oferta', href: '/ofertas' },
  ],
}

const comparativasItem: NavItem = {
  type: 'list',
  label: 'Comparativas',
  href: '/comparativas',
  links: [
    ...comparisons.map((c) => ({
      name: c.title,
      href: `/comparativas/${c.slug}`,
    })),
  ],
}

export const navItems: NavItem[] = [
  { type: 'link', label: 'Inicio', href: '/' },
  ...categoryItems,
  ofertasItem,
  comparativasItem,
  { type: 'link', label: 'Blog', href: '/blog' },
]

/** Redes sociales. `url: null` deja el botón preparado sin enlace falso. */
export type SocialLink = {
  name: string
  icon: 'instagram' | 'tiktok' | 'facebook' | 'youtube'
  url: string | null
}

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', icon: 'instagram', url: null },
  { name: 'TikTok', icon: 'tiktok', url: null },
  { name: 'Facebook', icon: 'facebook', url: null },
  { name: 'YouTube', icon: 'youtube', url: null },
]
