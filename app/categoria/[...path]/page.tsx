import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, BarChart3, BookOpen, Clock } from 'lucide-react'
import { getComparisonsByCategory, getArticlesByCategory } from '@/lib/data'
import { getProductsByCategory, searchProducts } from '@/lib/products'
import { getAllTaxPaths, resolvePath } from '@/lib/taxonomy'
import { PageHero } from '@/components/page-hero'
import { ProductCard } from '@/components/product-card'
import { CategoryBrowser } from '@/components/category/category-browser'

/**
 * Prerenderiza todas las rutas de la taxonomía (categoría, grupo y
 * subcategoría) y las revalida periódicamente (ISR), de modo que los productos
 * de Amazon se refrescan sin reconstruir la web.
 */
export function generateStaticParams() {
  return getAllTaxPaths()
}

/** Revalida la página cada 6 horas para refrescar los productos de Amazon. */
export const revalidate = 21600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>
}): Promise<Metadata> {
  const { path } = await params
  const resolved = resolvePath(path)
  if (!resolved) return { title: 'Categoría no encontrada' }
  return {
    title: resolved.name,
    description: `Descubre los mejores productos de ${resolved.name.toLowerCase()} para tu huerto, jardín y finca.`,
    alternates: { canonical: `/categoria/${path.join('/')}` },
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ path: string[] }>
}) {
  const { path } = await params
  const resolved = resolvePath(path)
  if (!resolved) notFound()

  // Nivel 1 (categoría): reutiliza la ruta existente por categoría.
  // Niveles 2 y 3 (grupo / subcategoría): usa la búsqueda por término, que
  // internamente pasa por la misma capa de productos de Amazon (API → seed →
  // demo). No se modifica la integración con Amazon.
  const categoryProducts =
    resolved.level === 1
      ? await getProductsByCategory(resolved.categorySlug)
      : await searchProducts(resolved.searchTerm)

  const relatedComparisons = getComparisonsByCategory(resolved.categorySlug)
  const relatedArticles = getArticlesByCategory(resolved.categorySlug)

  const popular = [...categoryProducts]
    .sort((a, b) => b.rating - a.rating || b.reviews - a.reviews)
    .slice(0, 4)

  const childrenHaveImages = resolved.children.some((c) => c.image)

  return (
    <>
      <PageHero
        eyebrow={`${resolved.category.icon} ${resolved.category.name}`}
        title={resolved.name}
        description={resolved.category.searchTerm}
        breadcrumbs={resolved.breadcrumbs}
      />

      {/* Navegación de subcategorías */}
      {resolved.children.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            {resolved.level === 1 ? 'Explora por tipo' : 'Subcategorías'}
          </h2>
          {childrenHaveImages ? (
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {resolved.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-4 text-center transition-shadow hover:shadow-md hover:shadow-primary/5"
                  >
                    <span className="relative size-16 overflow-hidden rounded-xl bg-secondary/40">
                      <Image
                        src={child.image || '/placeholder.svg'}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </span>
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {child.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-2.5">
              {resolved.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="inline-flex items-center rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary hover:text-primary"
                  >
                    {child.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {/* Productos populares */}
      {popular.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
          <h2 className="font-serif text-xl font-bold text-foreground">
            Productos populares
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((product) => (
              <ProductCard key={`popular-${product.slug}`} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Todos los productos con filtro y ordenación */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="mb-5 font-serif text-xl font-bold text-foreground">
          Todos los productos
        </h2>
        {categoryProducts.length > 0 ? (
          <CategoryBrowser products={categoryProducts} />
        ) : (
          <p className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
            Pronto añadiremos productos recomendados en esta categoría.
          </p>
        )}
      </section>

      {/* Comparativas y artículos relacionados */}
      {(relatedComparisons.length > 0 || relatedArticles.length > 0) && (
        <section className="border-t border-border bg-secondary/40 py-12">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            {relatedComparisons.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Comparativas relacionadas
                </h2>
                <ul className="mt-4 space-y-3">
                  {relatedComparisons.map((c) => (
                    <li key={c.slug}>
                      <Link
                        href={`/comparativas/${c.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md hover:shadow-primary/5"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                          <BarChart3 className="size-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1 font-medium text-foreground">
                          {c.title}
                        </span>
                        <ArrowRight
                          className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {relatedArticles.length > 0 && (
              <div>
                <h2 className="font-serif text-xl font-bold text-foreground">
                  Guías relacionadas
                </h2>
                <ul className="mt-4 space-y-3">
                  {relatedArticles.map((a) => (
                    <li key={a.slug}>
                      <Link
                        href={`/blog/${a.slug}`}
                        className="group flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-md hover:shadow-primary/5"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
                          <BookOpen className="size-5" aria-hidden="true" />
                        </span>
                        <span className="flex-1">
                          <span className="block font-medium text-foreground">
                            {a.title}
                          </span>
                          <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="size-3" aria-hidden="true" />
                            {a.readingTime} de lectura
                          </span>
                        </span>
                        <ArrowRight
                          className="size-4 text-primary transition-transform group-hover:translate-x-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  )
}
