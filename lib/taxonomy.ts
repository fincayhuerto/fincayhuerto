/**
 * Taxonomía jerárquica de FincaYHuerto (navegación y mega-menú).
 *
 * Estructura de 3 niveles: Categoría → Grupo → Subcategoría.
 *
 * Cada nodo define un `searchTerm` que la capa de productos (`lib/products.ts`)
 * usa para consultar la Amazon Creators API existente. Esta taxonomía SOLO
 * describe navegación y términos de búsqueda: NO contiene productos, precios,
 * valoraciones ni ASIN, y NO modifica la integración con Amazon.
 *
 * Los `image` son miniaturas genéricas de tema (no de un producto concreto) y
 * se usan únicamente como apoyo visual en el mega-menú.
 */

export type TaxNode = {
  /** Segmento de URL (sin acentos, apto para SEO). */
  slug: string
  /** Nombre visible. */
  name: string
  /** Término de búsqueda para la capa de productos de Amazon. */
  searchTerm: string
  /** Miniatura de apoyo visual (opcional; presente en grupos del mega-menú). */
  image?: string
  /** Subcategorías hijas (opcional). */
  children?: TaxNode[]
}

export type TaxCategory = {
  slug: string
  name: string
  /** Emoji identificativo (coherente con lib/data.ts). */
  icon: string
  /** Imagen de cabecera de la categoría. */
  image: string
  /** Término de búsqueda de la categoría completa. */
  searchTerm: string
  /** Grupos del mega-menú (cada uno puede tener subcategorías). */
  groups: TaxNode[]
}

/* -------------------------------------------------------------------------- */
/*  Árbol de categorías                                                        */
/* -------------------------------------------------------------------------- */

export const taxonomy: TaxCategory[] = [
  {
    slug: 'huerto',
    name: 'Huerto',
    icon: '🌱',
    image: '/images/cat-huerto.png',
    searchTerm: 'huerto urbano cultivo hortalizas',
    groups: [
      {
        slug: 'herramientas',
        name: 'Herramientas para huerto',
        searchTerm: 'herramientas de huerto',
        image: '/images/product-herramientas.png',
        children: [
          { slug: 'palas', name: 'Palas', searchTerm: 'pala de huerto' },
          { slug: 'azadas', name: 'Azadas', searchTerm: 'azada de huerto' },
          { slug: 'rastrillos', name: 'Rastrillos', searchTerm: 'rastrillo de jardín' },
          { slug: 'horcas', name: 'Horcas', searchTerm: 'horca de jardín' },
          { slug: 'cultivadores', name: 'Cultivadores', searchTerm: 'cultivador de mano' },
          { slug: 'kits', name: 'Kits de herramientas', searchTerm: 'kit herramientas huerto' },
        ],
      },
      {
        slug: 'preparacion-tierra',
        name: 'Preparación de la tierra',
        searchTerm: 'preparación de la tierra huerto',
        image: '/images/thumb-tierra.png',
        children: [
          { slug: 'tierra', name: 'Tierra', searchTerm: 'tierra para huerto' },
          { slug: 'sustratos', name: 'Sustratos', searchTerm: 'sustrato de cultivo' },
          { slug: 'compost', name: 'Compost', searchTerm: 'compost orgánico' },
          { slug: 'abonos', name: 'Abonos', searchTerm: 'abono para huerto' },
          { slug: 'fertilizantes', name: 'Fertilizantes', searchTerm: 'fertilizante hortalizas' },
        ],
      },
      {
        slug: 'cultivo',
        name: 'Cultivo',
        searchTerm: 'accesorios de cultivo huerto',
        image: '/images/thumb-cultivo.png',
        children: [
          { slug: 'tutores', name: 'Tutores', searchTerm: 'tutores para plantas' },
          { slug: 'soportes', name: 'Soportes', searchTerm: 'soporte para plantas' },
          { slug: 'mallas', name: 'Mallas', searchTerm: 'malla para cultivo' },
          { slug: 'invernaderos', name: 'Invernaderos', searchTerm: 'invernadero de jardín' },
          { slug: 'proteccion-cultivos', name: 'Protección de cultivos', searchTerm: 'protección de cultivos' },
        ],
      },
      {
        slug: 'semillas',
        name: 'Semillas',
        searchTerm: 'semillas de huerto',
        image: '/images/product-semillas.png',
        children: [
          { slug: 'tomate', name: 'Tomate', searchTerm: 'semillas de tomate' },
          { slug: 'pimiento', name: 'Pimiento', searchTerm: 'semillas de pimiento' },
          { slug: 'lechuga', name: 'Lechuga', searchTerm: 'semillas de lechuga' },
          { slug: 'cebolla', name: 'Cebolla', searchTerm: 'semillas de cebolla' },
          { slug: 'zanahoria', name: 'Zanahoria', searchTerm: 'semillas de zanahoria' },
          { slug: 'aromaticas', name: 'Aromáticas', searchTerm: 'semillas de plantas aromáticas' },
          { slug: 'flores', name: 'Flores', searchTerm: 'semillas de flores' },
          { slug: 'ecologicas', name: 'Semillas ecológicas', searchTerm: 'semillas ecológicas' },
        ],
      },
      {
        slug: 'control-plagas',
        name: 'Control de plagas',
        searchTerm: 'control de plagas huerto',
        image: '/images/thumb-plagas.png',
        children: [
          { slug: 'insecticidas', name: 'Insecticidas', searchTerm: 'insecticida para plantas' },
          { slug: 'fungicidas', name: 'Fungicidas', searchTerm: 'fungicida para plantas' },
          { slug: 'trampas', name: 'Trampas', searchTerm: 'trampa para insectos jardín' },
          { slug: 'antiplagas', name: 'Antiplagas', searchTerm: 'antiplagas jardín' },
          { slug: 'proteccion-ecologica', name: 'Protección ecológica', searchTerm: 'insecticida ecológico' },
        ],
      },
      {
        slug: 'cosecha',
        name: 'Cosecha',
        searchTerm: 'accesorios de cosecha huerto',
        image: '/images/thumb-cosecha.png',
        children: [
          { slug: 'cestas', name: 'Cestas', searchTerm: 'cesta de recolección' },
          { slug: 'tijeras', name: 'Tijeras', searchTerm: 'tijeras de recolección' },
          { slug: 'recoleccion', name: 'Herramientas de recolección', searchTerm: 'herramientas de recolección' },
        ],
      },
    ],
  },
  {
    slug: 'jardin',
    name: 'Jardín',
    icon: '🌿',
    image: '/images/cat-jardin.png',
    searchTerm: 'jardín plantas flores césped',
    groups: [
      {
        slug: 'herramientas',
        name: 'Herramientas',
        searchTerm: 'herramientas de jardín',
        image: '/images/product-herramientas.png',
        children: [
          { slug: 'tijeras-podar', name: 'Tijeras de podar', searchTerm: 'tijeras de podar' },
          { slug: 'serruchos', name: 'Serruchos', searchTerm: 'serrucho de jardín' },
          { slug: 'palas', name: 'Palas', searchTerm: 'pala de jardín' },
          { slug: 'azadas', name: 'Azadas', searchTerm: 'azada de jardín' },
          { slug: 'rastrillos', name: 'Rastrillos', searchTerm: 'rastrillo de jardín' },
          { slug: 'kits', name: 'Kits', searchTerm: 'kit herramientas jardín' },
        ],
      },
      {
        slug: 'poda',
        name: 'Poda',
        searchTerm: 'herramientas de poda',
        image: '/images/product-tijeras.png',
        children: [
          { slug: 'tijeras-bypass', name: 'Tijeras bypass', searchTerm: 'tijeras de podar bypass' },
          { slug: 'tijeras-yunque', name: 'Tijeras de yunque', searchTerm: 'tijeras de podar yunque' },
          { slug: 'tijeras-telescopicas', name: 'Tijeras telescópicas', searchTerm: 'tijeras de podar telescópicas' },
          { slug: 'serruchos-poda', name: 'Serruchos de poda', searchTerm: 'serrucho de poda' },
          { slug: 'podadoras', name: 'Podadoras', searchTerm: 'podadora eléctrica' },
        ],
      },
      {
        slug: 'cesped',
        name: 'Césped',
        searchTerm: 'cuidado del césped',
        image: '/images/thumb-cesped.png',
        children: [
          { slug: 'cortacespedes', name: 'Cortacéspedes', searchTerm: 'cortacésped' },
          { slug: 'cortabordes', name: 'Cortabordes', searchTerm: 'cortabordes' },
          { slug: 'escarificadores', name: 'Escarificadores', searchTerm: 'escarificador de césped' },
          { slug: 'aireadores', name: 'Aireadores', searchTerm: 'aireador de césped' },
        ],
      },
      {
        slug: 'plantas-flores',
        name: 'Plantas y flores',
        searchTerm: 'plantas y flores jardín',
        image: '/images/thumb-plantas.png',
        children: [
          { slug: 'macetas', name: 'Macetas', searchTerm: 'macetas para plantas' },
          { slug: 'jardineras', name: 'Jardineras', searchTerm: 'jardineras' },
          { slug: 'soportes', name: 'Soportes', searchTerm: 'soporte para macetas' },
          { slug: 'accesorios', name: 'Accesorios', searchTerm: 'accesorios de jardinería' },
        ],
      },
      {
        slug: 'macetas',
        name: 'Macetas',
        searchTerm: 'macetas para plantas',
        image: '/images/thumb-macetas.png',
        children: [
          { slug: 'plastico', name: 'Macetas de plástico', searchTerm: 'macetas de plástico' },
          { slug: 'ceramica', name: 'Macetas de cerámica', searchTerm: 'macetas de cerámica' },
          { slug: 'barro', name: 'Macetas de barro', searchTerm: 'macetas de barro' },
          { slug: 'grandes', name: 'Macetas grandes', searchTerm: 'macetas grandes' },
          { slug: 'pequenas', name: 'Macetas pequeñas', searchTerm: 'macetas pequeñas' },
          { slug: 'jardineras', name: 'Jardineras', searchTerm: 'jardineras' },
          { slug: 'maceteros', name: 'Maceteros', searchTerm: 'maceteros' },
        ],
      },
      {
        slug: 'sustratos',
        name: 'Sustratos',
        searchTerm: 'sustratos para plantas',
        image: '/images/thumb-tierra.png',
        children: [
          { slug: 'tierra-universal', name: 'Tierra universal', searchTerm: 'tierra universal plantas' },
          { slug: 'sustrato-plantas', name: 'Sustrato para plantas', searchTerm: 'sustrato para plantas' },
          { slug: 'sustrato-huerto', name: 'Sustrato para huerto', searchTerm: 'sustrato para huerto' },
          { slug: 'fibra-coco', name: 'Fibra de coco', searchTerm: 'fibra de coco cultivo' },
          { slug: 'perlita', name: 'Perlita', searchTerm: 'perlita para plantas' },
          { slug: 'vermiculita', name: 'Vermiculita', searchTerm: 'vermiculita para plantas' },
        ],
      },
      {
        slug: 'abonos',
        name: 'Abonos',
        searchTerm: 'abonos para plantas',
        image: '/images/thumb-tierra.png',
        children: [
          { slug: 'fertilizantes', name: 'Fertilizantes', searchTerm: 'fertilizante para plantas' },
          { slug: 'organicos', name: 'Abonos orgánicos', searchTerm: 'abono orgánico' },
          { slug: 'liquidos', name: 'Abonos líquidos', searchTerm: 'abono líquido plantas' },
          { slug: 'granulados', name: 'Abonos granulados', searchTerm: 'abono granulado' },
        ],
      },
    ],
  },
  {
    slug: 'herramientas',
    name: 'Herramientas',
    icon: '🔧',
    image: '/images/product-herramientas.png',
    searchTerm: 'herramientas jardinería',
    groups: [
      { slug: 'manuales', name: 'Herramientas manuales', searchTerm: 'herramientas manuales de jardín', image: '/images/product-herramientas.png' },
      { slug: 'electricas', name: 'Herramientas eléctricas', searchTerm: 'herramientas eléctricas de jardín', image: '/images/thumb-electrico.png' },
      { slug: 'bateria', name: 'Herramientas a batería', searchTerm: 'herramientas de jardín a batería', image: '/images/thumb-electrico.png' },
      { slug: 'poda', name: 'Herramientas de poda', searchTerm: 'herramientas de poda', image: '/images/product-tijeras.png' },
      { slug: 'tierra', name: 'Herramientas para tierra', searchTerm: 'herramientas para trabajar la tierra', image: '/images/thumb-tierra.png' },
      { slug: 'kits', name: 'Kits de herramientas', searchTerm: 'kit de herramientas de jardín', image: '/images/product-herramientas.png' },
    ],
  },
  {
    slug: 'riego',
    name: 'Riego',
    icon: '💧',
    image: '/images/product-riego.png',
    searchTerm: 'riego goteo manguera programador',
    groups: [
      {
        slug: 'mangueras',
        name: 'Mangueras',
        searchTerm: 'manguera de jardín',
        image: '/images/product-manguera.png',
        children: [
          { slug: 'jardin', name: 'Mangueras de jardín', searchTerm: 'manguera de jardín' },
          { slug: 'extensibles', name: 'Mangueras extensibles', searchTerm: 'manguera extensible' },
          { slug: 'reforzadas', name: 'Mangueras reforzadas', searchTerm: 'manguera reforzada' },
        ],
      },
      {
        slug: 'goteo',
        name: 'Riego por goteo',
        searchTerm: 'riego por goteo',
        image: '/images/product-riego.png',
        children: [
          { slug: 'kits', name: 'Kits de goteo', searchTerm: 'kit de riego por goteo' },
          { slug: 'tubos', name: 'Tubos', searchTerm: 'tubo de riego por goteo' },
          { slug: 'goteros', name: 'Goteros', searchTerm: 'goteros de riego' },
          { slug: 'conectores', name: 'Conectores', searchTerm: 'conectores de riego por goteo' },
        ],
      },
      {
        slug: 'automatico',
        name: 'Riego automático',
        searchTerm: 'riego automático',
        image: '/images/product-riego.png',
        children: [
          { slug: 'programadores', name: 'Programadores', searchTerm: 'programador de riego' },
          { slug: 'temporizadores', name: 'Temporizadores', searchTerm: 'temporizador de riego' },
          { slug: 'controladores', name: 'Controladores', searchTerm: 'controlador de riego' },
        ],
      },
      { slug: 'aspersores', name: 'Aspersores', searchTerm: 'aspersor de riego', image: '/images/product-riego.png' },
      { slug: 'bombas', name: 'Bombas de agua', searchTerm: 'bomba de agua para riego', image: '/images/product-riego.png' },
      {
        slug: 'accesorios',
        name: 'Accesorios',
        searchTerm: 'accesorios de riego',
        image: '/images/product-riego.png',
        children: [
          { slug: 'racores', name: 'Racores', searchTerm: 'racor de riego' },
          { slug: 'conectores', name: 'Conectores', searchTerm: 'conector de manguera' },
          { slug: 'enrolladores', name: 'Enrolladores', searchTerm: 'enrollador de manguera' },
        ],
      },
    ],
  },
  {
    slug: 'semillas',
    name: 'Semillas',
    icon: '🌾',
    image: '/images/product-semillas.png',
    searchTerm: 'semillas hortalizas huerto',
    groups: [
      { slug: 'hortalizas', name: 'Hortalizas', searchTerm: 'semillas de hortalizas', image: '/images/product-semillas.png' },
      { slug: 'aromaticas', name: 'Aromáticas', searchTerm: 'semillas de plantas aromáticas', image: '/images/product-semillas.png' },
      { slug: 'flores', name: 'Flores', searchTerm: 'semillas de flores', image: '/images/thumb-plantas.png' },
      { slug: 'ecologicas', name: 'Semillas ecológicas', searchTerm: 'semillas ecológicas', image: '/images/product-semillas.png' },
      { slug: 'semilleros', name: 'Semilleros', searchTerm: 'semillero de cultivo', image: '/images/thumb-cultivo.png' },
      { slug: 'germinadores', name: 'Germinadores', searchTerm: 'germinador de semillas', image: '/images/thumb-cultivo.png' },
      { slug: 'kits-cultivo', name: 'Kits de cultivo', searchTerm: 'kit de cultivo semillas', image: '/images/product-semillas.png' },
    ],
  },
  {
    slug: 'maquinaria',
    name: 'Maquinaria',
    icon: '🚜',
    image: '/images/cat-maquinaria.png',
    searchTerm: 'motocultor desbrozadora maquinaria jardín',
    groups: [
      { slug: 'motoazadas', name: 'Motoazadas', searchTerm: 'motoazada', image: '/images/product-motocultor.png' },
      { slug: 'motocultores', name: 'Motocultores', searchTerm: 'motocultor', image: '/images/product-motocultor.png' },
      { slug: 'desbrozadoras', name: 'Desbrozadoras', searchTerm: 'desbrozadora', image: '/images/thumb-electrico.png' },
      { slug: 'motosierras', name: 'Motosierras', searchTerm: 'motosierra', image: '/images/thumb-electrico.png' },
      { slug: 'cortacespedes', name: 'Cortacéspedes', searchTerm: 'cortacésped', image: '/images/thumb-cesped.png' },
      { slug: 'cortasetos', name: 'Cortasetos', searchTerm: 'cortasetos', image: '/images/thumb-electrico.png' },
      { slug: 'pulverizadores', name: 'Pulverizadores', searchTerm: 'pulverizador de jardín', image: '/images/thumb-plagas.png' },
      { slug: 'trituradoras', name: 'Trituradoras', searchTerm: 'trituradora de ramas', image: '/images/product-motocultor.png' },
      { slug: 'hidrolimpiadoras', name: 'Hidrolimpiadoras', searchTerm: 'hidrolimpiadora alta presión', image: '/images/product-hidrolimpiadora.png' },
    ],
  },
]

/* -------------------------------------------------------------------------- */
/*  Resolución por ruta                                                         */
/* -------------------------------------------------------------------------- */

export type ResolvedNode = {
  /** Nombre visible del nodo actual. */
  name: string
  /** Término de búsqueda para la capa de productos. */
  searchTerm: string
  /** Nivel: 1 categoría, 2 grupo, 3 subcategoría. */
  level: 1 | 2 | 3
  /** Slug de la categoría raíz (para relacionados y comportamiento). */
  categorySlug: string
  /** Migas de pan acumuladas (incluye Inicio + cada nivel). */
  breadcrumbs: { label: string; href?: string }[]
  /** Nodos hijos para navegación (grupos o subcategorías). */
  children: { name: string; href: string; image?: string }[]
  /** Categoría raíz completa. */
  category: TaxCategory
}

export function getCategoryBySlug(slug: string): TaxCategory | undefined {
  return taxonomy.find((c) => c.slug === slug)
}

/**
 * Resuelve una ruta `[...path]` bajo `/categoria/` en un nodo de la taxonomía.
 * Devuelve `null` si algún segmento no existe.
 */
export function resolvePath(path: string[]): ResolvedNode | null {
  const [catSlug, groupSlug, leafSlug] = path
  const category = getCategoryBySlug(catSlug)
  if (!category) return null

  const base = `/categoria/${category.slug}`
  const breadcrumbs: { label: string; href?: string }[] = [
    { label: 'Inicio', href: '/' },
  ]

  // Nivel 1: categoría
  if (!groupSlug) {
    breadcrumbs.push({ label: category.name })
    return {
      name: category.name,
      searchTerm: category.searchTerm,
      level: 1,
      categorySlug: category.slug,
      breadcrumbs,
      children: category.groups.map((g) => ({
        name: g.name,
        href: `${base}/${g.slug}`,
        image: g.image,
      })),
      category,
    }
  }

  const group = category.groups.find((g) => g.slug === groupSlug)
  if (!group) return null

  // Nivel 2: grupo
  if (!leafSlug) {
    breadcrumbs.push(
      { label: category.name, href: base },
      { label: group.name },
    )
    return {
      name: group.name,
      searchTerm: group.searchTerm,
      level: 2,
      categorySlug: category.slug,
      breadcrumbs,
      children: (group.children ?? []).map((l) => ({
        name: l.name,
        href: `${base}/${group.slug}/${l.slug}`,
      })),
      category,
    }
  }

  const leaf = group.children?.find((l) => l.slug === leafSlug)
  if (!leaf) return null

  // Nivel 3: subcategoría
  breadcrumbs.push(
    { label: category.name, href: base },
    { label: group.name, href: `${base}/${group.slug}` },
    { label: leaf.name },
  )
  return {
    name: leaf.name,
    searchTerm: leaf.searchTerm,
    level: 3,
    categorySlug: category.slug,
    breadcrumbs,
    children: [],
    category,
  }
}

/**
 * Todas las rutas válidas para `generateStaticParams` (categoría, grupo y
 * subcategoría).
 */
export function getAllTaxPaths(): { path: string[] }[] {
  const paths: { path: string[] }[] = []
  for (const category of taxonomy) {
    paths.push({ path: [category.slug] })
    for (const group of category.groups) {
      paths.push({ path: [category.slug, group.slug] })
      for (const leaf of group.children ?? []) {
        paths.push({ path: [category.slug, group.slug, leaf.slug] })
      }
    }
  }
  return paths
}
