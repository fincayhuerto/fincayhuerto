/**
 * Capa de datos de FincaYHuerto.
 *
 * Todos los datos están centralizados aquí para que en el futuro se puedan
 * sustituir fácilmente por una base de datos o una API externa sin tocar los
 * componentes de la interfaz. Los enlaces de producto son "placeholder" y
 * deben reemplazarse por enlaces de afiliado de Amazon España cuando la web
 * se monetice.
 */

export type Category = {
  slug: string
  name: string
  icon: string
  description: string
  image?: string
}

export type Product = {
  slug: string
  name: string
  description: string
  category: string
  rating: number
  reviews: number
  price: string
  /** Precio anterior (opcional) para mostrar descuentos. */
  originalPrice?: string
  /** Porcentaje de descuento (opcional). */
  discount?: number
  /** Etiqueta destacada opcional: "Más vendido", "Novedad", etc. */
  badge?: string
  image: string
  /** Enlace de afiliado placeholder — sustituir por el enlace real de Amazon. */
  affiliateUrl: string
}

export type Comparison = {
  slug: string
  title: string
  excerpt: string
  category: string
}

export type Article = {
  slug: string
  title: string
  excerpt: string
  image: string
  date: string
  readingTime: string
}

export const categories: Category[] = [
  {
    slug: 'huerto',
    name: 'Huerto',
    icon: '🌱',
    description:
      'Todo lo que necesitas para cultivar tus propias hortalizas en casa.',
    image: '/images/cat-huerto.png',
  },
  {
    slug: 'jardin',
    name: 'Jardín',
    icon: '🌿',
    description: 'Cuida tus plantas, flores y césped con los mejores productos.',
    image: '/images/cat-jardin.png',
  },
  {
    slug: 'herramientas',
    name: 'Herramientas',
    icon: '🔧',
    description: 'Herramientas manuales y eléctricas para trabajar la tierra.',
    image: '/images/product-herramientas.png',
  },
  {
    slug: 'riego',
    name: 'Riego',
    icon: '💧',
    description: 'Sistemas de riego, mangueras y programadores para ahorrar agua.',
    image: '/images/product-riego.png',
  },
  {
    slug: 'semillas',
    name: 'Semillas',
    icon: '🌾',
    description: 'Semillas de hortalizas, aromáticas y flores de temporada.',
    image: '/images/product-semillas.png',
  },
  {
    slug: 'maquinaria',
    name: 'Maquinaria',
    icon: '🚜',
    description: 'Motocultores, desbrozadoras y maquinaria para tu finca.',
    image: '/images/cat-maquinaria.png',
  },
]

/**
 * Construye un enlace de afiliado a una BÚSQUEDA en Amazon España.
 * El Partner Tag procede EXCLUSIVAMENTE de la variable de entorno
 * `AMAZON_PARTNER_TAG` (nunca escrito a mano). Si no está configurado, se
 * devuelve la URL sin tag.
 */
function amazonSearch(term: string): string {
  const host = process.env.AMAZON_MARKETPLACE ?? 'www.amazon.es'
  const url = new URL(`https://${host}/s`)
  url.searchParams.set('k', term)
  const tag = process.env.AMAZON_PARTNER_TAG
  if (tag) url.searchParams.set('tag', tag)
  return url.toString()
}

export const products: Product[] = [
  {
    slug: 'tijeras-de-podar-profesionales',
    name: 'Tijeras de podar profesionales',
    description: 'Corte limpio y preciso con hoja de acero al carbono y mango ergonómico.',
    category: 'herramientas',
    rating: 4.7,
    reviews: 1284,
    price: '24,99 €',
    image: '/images/product-tijeras.png',
    affiliateUrl: amazonSearch('tijeras de podar profesionales'),
  },
  {
    slug: 'kit-riego-por-goteo',
    name: 'Kit de riego por goteo automático',
    description: 'Sistema completo para regar hasta 40 plantas ahorrando agua.',
    category: 'riego',
    rating: 4.5,
    reviews: 942,
    price: '39,90 €',
    image: '/images/product-riego.png',
    affiliateUrl: amazonSearch('kit riego por goteo automatico'),
  },
  {
    slug: 'surtido-semillas-huerto',
    name: 'Surtido de semillas para huerto',
    description: '20 variedades de hortalizas de cultivo fácil, semillas sin tratar.',
    category: 'semillas',
    rating: 4.6,
    reviews: 613,
    price: '14,95 €',
    image: '/images/product-semillas.png',
    affiliateUrl: amazonSearch('surtido semillas huerto'),
  },
  {
    slug: 'motocultor-gasolina',
    name: 'Motocultor de gasolina 7 CV',
    description: 'Potente motoazada para preparar la tierra de tu huerto o finca.',
    category: 'maquinaria',
    rating: 4.4,
    reviews: 327,
    price: '289,00 €',
    image: '/images/product-motocultor.png',
    affiliateUrl: amazonSearch('motocultor gasolina'),
  },
  {
    slug: 'manguera-extensible',
    name: 'Manguera extensible 30 m',
    description: 'Ligera, flexible y con pistola de 8 funciones para todo tipo de riego.',
    category: 'riego',
    rating: 4.3,
    reviews: 2051,
    price: '29,99 €',
    image: '/images/product-manguera.png',
    affiliateUrl: amazonSearch('manguera extensible jardin'),
  },
  {
    slug: 'hidrolimpiadora-alta-presion',
    name: 'Hidrolimpiadora de alta presión',
    description: '1800 W ideal para limpiar terrazas, vallas y maquinaria de jardín.',
    category: 'maquinaria',
    rating: 4.6,
    reviews: 1567,
    price: '119,00 €',
    image: '/images/product-hidrolimpiadora.png',
    affiliateUrl: amazonSearch('hidrolimpiadora alta presion'),
  },
  {
    slug: 'set-herramientas-jardin',
    name: 'Set de herramientas de jardín',
    description: 'Pala, rastrillo y transplantador de acero inoxidable con mango de madera.',
    category: 'herramientas',
    rating: 4.5,
    reviews: 788,
    price: '32,50 €',
    image: '/images/product-herramientas.png',
    affiliateUrl: amazonSearch('set herramientas jardin'),
  },
  {
    slug: 'tijeras-podar-huerto',
    name: 'Tijeras de podar de bypass',
    description: 'Perfectas para ramas finas y recolección diaria en el huerto.',
    category: 'huerto',
    rating: 4.8,
    reviews: 456,
    price: '18,99 €',
    image: '/images/product-tijeras.png',
    affiliateUrl: amazonSearch('tijeras de podar bypass'),
  },
]

export const popularSearches: string[] = [
  'Herramientas para huerto',
  'Sistemas de riego',
  'Semillas',
  'Tijeras de podar',
  'Mangueras',
  'Hidrolimpiadoras',
  'Motocultores',
  'Productos para plagas',
]

export const comparisons: Comparison[] = [
  {
    slug: 'mejores-tijeras-de-podar',
    title: 'Las mejores tijeras de podar',
    excerpt: 'Comparamos corte, durabilidad y comodidad para elegir sin errores.',
    category: 'Herramientas',
  },
  {
    slug: 'mejores-sistemas-de-riego',
    title: 'Mejores sistemas de riego',
    excerpt: 'Goteo, aspersión o exudación: cuál se adapta mejor a tu huerto.',
    category: 'Riego',
  },
  {
    slug: 'mejores-herramientas-para-huerto',
    title: 'Mejores herramientas para huerto',
    excerpt: 'El equipo esencial para empezar a cultivar con buen pie.',
    category: 'Huerto',
  },
  {
    slug: 'mejores-motocultores',
    title: 'Mejores motocultores',
    excerpt: 'Potencia, anchura de trabajo y precio de los modelos más vendidos.',
    category: 'Maquinaria',
  },
]

export const articles: Article[] = [
  {
    slug: 'como-empezar-un-huerto-desde-cero',
    title: 'Cómo empezar un huerto desde cero',
    excerpt:
      'Guía paso a paso para planificar, preparar la tierra y plantar tus primeras hortalizas.',
    image: '/images/blog-empezar-huerto.png',
    date: '2026-03-12',
    readingTime: '8 min',
  },
  {
    slug: 'que-herramientas-necesitas-para-un-huerto',
    title: 'Qué herramientas necesitas para un huerto',
    excerpt:
      'Las herramientas imprescindibles (y las que no) para trabajar cómodamente tu huerto.',
    image: '/images/blog-herramientas.png',
    date: '2026-02-28',
    readingTime: '6 min',
  },
  {
    slug: 'cuando-plantar-cada-hortaliza',
    title: 'Cuándo plantar cada hortaliza',
    excerpt:
      'Calendario de siembra mes a mes para aprovechar cada temporada al máximo.',
    image: '/images/blog-calendario.png',
    date: '2026-02-15',
    readingTime: '10 min',
  },
  {
    slug: 'como-ahorrar-agua-en-el-huerto',
    title: 'Cómo ahorrar agua en el huerto',
    excerpt:
      'Trucos y sistemas de riego eficientes para reducir el consumo de agua sin descuidar tus plantas.',
    image: '/images/blog-ahorrar-agua.png',
    date: '2026-01-30',
    readingTime: '7 min',
  },
]

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug)
}
