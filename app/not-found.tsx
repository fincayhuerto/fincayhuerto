import Link from 'next/link'
import { Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <span className="flex size-16 items-center justify-center rounded-2xl bg-secondary text-primary">
        <Leaf className="size-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 font-serif text-4xl font-bold text-foreground">404</h1>
      <p className="mt-3 text-lg text-muted-foreground text-pretty">
        No hemos encontrado la página que buscas. Puede que se haya movido o que
        ya no exista.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </section>
  )
}
