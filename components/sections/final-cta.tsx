import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function FinalCta() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, var(--color-primary-foreground) 0, transparent 40%), radial-gradient(circle at 80% 80%, var(--color-primary-foreground) 0, transparent 40%)',
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold text-primary-foreground text-balance sm:text-4xl">
            Encuentra lo que necesitas para tu huerto
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/80 text-pretty">
            Productos seleccionados, comparativas y guías en un solo lugar.
          </p>
          <Link
            href="/categoria/huerto"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-base font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Explorar productos
            <ArrowRight className="size-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
