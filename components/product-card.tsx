import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Product } from '@/lib/data'
import { StarRating } from '@/components/star-rating'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg hover:shadow-primary/5">
      <div className="relative aspect-square overflow-hidden bg-secondary/40">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        {product.rating > 0 ? (
          <StarRating rating={product.rating} reviews={product.reviews} />
        ) : (
          <span className="text-xs font-medium text-muted-foreground/70">
            Valoración en Amazon
          </span>
        )}
        <h3 className="mt-2 font-serif text-base font-semibold leading-snug text-foreground text-balance">
          {product.name}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3 pt-1">
          <span className="font-serif text-lg font-bold text-primary">
            {product.price}
          </span>
          <a
            href={product.affiliateUrl}
            rel="nofollow sponsored noopener"
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver producto
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  )
}
