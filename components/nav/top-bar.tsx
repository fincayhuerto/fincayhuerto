import { Truck } from 'lucide-react'
import { socialLinks, type SocialLink } from '@/components/nav/nav-model'

/** Glifos de marca (lucide-react no incluye iconos de marca en esta versión). */
function SocialGlyph({ icon }: { icon: SocialLink['icon'] }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    className: 'size-4',
    'aria-hidden': true as const,
  }
  switch (icon) {
    case 'instagram':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'facebook':
      return (
        <svg {...common}>
          <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.5-1.5H17V5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V11H8.5v3H11v7h2.5Z" />
        </svg>
      )
    case 'youtube':
      return (
        <svg {...common}>
          <path d="M22 8.2a2.6 2.6 0 0 0-1.8-1.8C18.6 6 12 6 12 6s-6.6 0-8.2.4A2.6 2.6 0 0 0 2 8.2 27 27 0 0 0 1.6 12 27 27 0 0 0 2 15.8a2.6 2.6 0 0 0 1.8 1.8C5.4 18 12 18 12 18s6.6 0 8.2-.4a2.6 2.6 0 0 0 1.8-1.8A27 27 0 0 0 22.4 12 27 27 0 0 0 22 8.2ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      )
    case 'tiktok':
      return (
        <svg {...common}>
          <path d="M16.5 3c.3 2 1.5 3.6 3.5 3.9v2.6c-1.3 0-2.5-.4-3.5-1v5.9c0 3-2.2 5.6-5.4 5.6a5.3 5.3 0 0 1-5.4-5.3c0-3.2 2.9-5.7 6.1-5.2v2.7c-.4-.1-.8-.2-1.2-.2a2.7 2.7 0 0 0 .2 5.3c1.5 0 2.6-1.2 2.6-2.7V3h3.5Z" />
        </svg>
      )
  }
}

export function TopBar() {
  return (
    <div className="border-b border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-3 px-4 text-xs sm:px-6 lg:px-8">
        <p className="flex items-center gap-1.5 font-medium">
          <Truck className="size-3.5" aria-hidden="true" />
          <span className="truncate">Envío rápido y garantizado con Amazon</span>
        </p>
        <ul className="flex items-center gap-0.5">
          {socialLinks.map((social) => {
            const label = social.url
              ? `Síguenos en ${social.name}`
              : `${social.name} (próximamente)`
            return (
              <li key={social.name}>
                {social.url ? (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex size-7 items-center justify-center rounded-full text-primary-foreground/85 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
                  >
                    <SocialGlyph icon={social.icon} />
                  </a>
                ) : (
                  <button
                    type="button"
                    aria-label={label}
                    title="Próximamente"
                    className="flex size-7 items-center justify-center rounded-full text-primary-foreground/70 transition-colors hover:bg-primary-foreground/15 hover:text-primary-foreground"
                  >
                    <SocialGlyph icon={social.icon} />
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
