import Image from 'next/image'
import Link from 'next/link'
import { categories } from '@/lib/data'
import { SectionHeading } from '@/components/section-heading'

export function CategoriesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Explora por categoría"
        title="Encuentra lo que necesitas"
        description="Navega por nuestras categorías y descubre productos seleccionados para cada rincón de tu huerto y jardín."
      />
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/categoria/${category.slug}`}
            className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border"
          >
            <Image
              src={category.image || '/placeholder.svg'}
              alt={category.name}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5">
              <span className="text-2xl" aria-hidden="true">
                {category.icon}
              </span>
              <h3 className="mt-1 font-serif text-lg font-semibold text-primary-foreground sm:text-xl">
                {category.name}
              </h3>
              <p className="mt-0.5 hidden text-sm text-primary-foreground/80 sm:block">
                {category.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
