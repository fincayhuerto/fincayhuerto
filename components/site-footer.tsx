import Link from 'next/link'
import { Leaf } from 'lucide-react'

const footerColumns: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Categorías',
    links: [
      { label: 'Huerto', href: '/categoria/huerto' },
      { label: 'Jardín', href: '/categoria/jardin' },
      { label: 'Herramientas', href: '/categoria/herramientas' },
      { label: 'Riego', href: '/categoria/riego' },
    ],
  },
  {
    title: 'Descubre',
    links: [
      { label: 'Comparativas', href: '/comparativas' },
      { label: 'Blog', href: '/blog' },
      { label: 'Ofertas', href: '/ofertas' },
      { label: 'Contacto', href: '/contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Política de privacidad', href: '/legal/privacidad' },
      { label: 'Política de cookies', href: '/legal/cookies' },
      { label: 'Aviso legal', href: '/legal/aviso-legal' },
      { label: 'Enlaces de afiliados', href: '/legal/afiliados' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="max-w-xs">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary-foreground/10">
                <Leaf className="size-5" aria-hidden="true" />
              </span>
              <span className="font-serif text-xl font-bold">FincaYHuerto</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
              Todo para tu huerto, jardín y finca. Guías, comparativas y
              productos recomendados para cultivar mejor.
            </p>
          </div>

          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h2 className="font-serif text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
                {col.title}
              </h2>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 rounded-xl bg-primary-foreground/5 p-4 text-xs leading-relaxed text-primary-foreground/60 ring-1 ring-primary-foreground/10">
          FincaYHuerto puede participar en programas de afiliación y recibir una
          comisión por determinadas compras realizadas a través de nuestros
          enlaces, sin coste adicional para ti.
        </div>

        <p className="mt-8 text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} FincaYHuerto. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
