import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle } from 'lucide-react'
import { PageHero } from '@/components/page-hero'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Ponte en contacto con el equipo de FincaYHuerto.',
  alternates: { canonical: '/contacto' },
}

export default function ContactoPage() {
  return (
    <>
      <PageHero
        eyebrow="Contacto"
        title="¿Hablamos?"
        description="¿Tienes una duda, una sugerencia o quieres proponernos un producto? Escríbenos y te responderemos lo antes posible."
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: 'Contacto' }]}
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <Mail className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Email
              </h2>
              <p className="text-muted-foreground">hola@fincayhuerto.example</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <MessageCircle className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                Redes sociales
              </h2>
              <p className="text-muted-foreground">
                Síguenos para no perderte novedades y consejos.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-serif text-lg font-semibold text-foreground">
                España
              </h2>
              <p className="text-muted-foreground">
                Contenido pensado para el mercado español.
              </p>
            </div>
          </div>
        </div>

        <form className="space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="message"
              className="mb-1.5 block text-sm font-medium text-foreground"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/40"
            />
          </div>
          <button
            type="submit"
            className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-8 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Enviar mensaje
          </button>
        </form>
      </section>
    </>
  )
}
