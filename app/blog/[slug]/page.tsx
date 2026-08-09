import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { articles } from '@/lib/data'
import { PageHero } from '@/components/page-hero'

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) return { title: 'Artículo no encontrado' }
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/blog/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [article.image],
      type: 'article',
    },
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)
  if (!article) notFound()

  const formattedDate = new Date(article.date).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={article.title}
        description={`${formattedDate} · ${article.readingTime} de lectura`}
        breadcrumbs={[
          { label: 'Inicio', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.title },
        ]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative mb-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          <Image
            src={article.image || '/placeholder.svg'}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover"
          />
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
          <p className="text-lg text-foreground">{article.excerpt}</p>
          <p>
            Este artículo forma parte de nuestra guía para ayudarte a sacar el
            máximo partido a tu huerto y jardín. Estamos preparando el contenido
            completo con todos los pasos, consejos y recomendaciones de
            productos.
          </p>
          <p>
            Mientras tanto, explora nuestras categorías y comparativas para
            encontrar las herramientas y productos que mejor se adapten a tus
            necesidades.
          </p>
        </div>
      </article>
    </>
  )
}
