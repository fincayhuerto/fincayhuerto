import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PageHero } from '@/components/page-hero'

type LegalDoc = {
  title: string
  description: string
  sections: { heading: string; body: string[] }[]
}

const legalDocs: Record<string, LegalDoc> = {
  privacidad: {
    title: 'Política de privacidad',
    description:
      'Cómo tratamos y protegemos los datos personales de los usuarios de FincaYHuerto.',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        body: [
          'FincaYHuerto es responsable del tratamiento de los datos personales que nos facilites a través de este sitio web.',
        ],
      },
      {
        heading: 'Datos que recopilamos',
        body: [
          'Recopilamos únicamente los datos necesarios para responder a tus consultas (por ejemplo, a través del formulario de contacto) y para mejorar tu experiencia de navegación.',
        ],
      },
      {
        heading: 'Finalidad y derechos',
        body: [
          'Usamos tus datos para gestionar tus solicitudes. Puedes ejercer tus derechos de acceso, rectificación, supresión y oposición escribiéndonos por los medios indicados en la página de contacto.',
        ],
      },
    ],
  },
  cookies: {
    title: 'Política de cookies',
    description:
      'Información sobre el uso de cookies y tecnologías similares en FincaYHuerto.',
    sections: [
      {
        heading: '¿Qué son las cookies?',
        body: [
          'Las cookies son pequeños archivos que se almacenan en tu dispositivo al navegar y que permiten recordar información sobre tu visita.',
        ],
      },
      {
        heading: 'Tipos de cookies que utilizamos',
        body: [
          'Utilizamos cookies técnicas necesarias para el funcionamiento del sitio y, en su caso, cookies analíticas y de afiliación para medir el rendimiento y atribuir compras.',
        ],
      },
      {
        heading: 'Cómo gestionarlas',
        body: [
          'Puedes configurar o rechazar el uso de cookies desde la configuración de tu navegador en cualquier momento.',
        ],
      },
    ],
  },
  'aviso-legal': {
    title: 'Aviso legal',
    description: 'Condiciones generales de uso del sitio web FincaYHuerto.',
    sections: [
      {
        heading: 'Titularidad del sitio',
        body: [
          'Este sitio web tiene carácter informativo y de recomendación de productos. El acceso y uso del mismo implica la aceptación de las presentes condiciones.',
        ],
      },
      {
        heading: 'Propiedad intelectual',
        body: [
          'Los contenidos, textos e imágenes de FincaYHuerto están protegidos por los derechos de propiedad intelectual correspondientes.',
        ],
      },
      {
        heading: 'Responsabilidad',
        body: [
          'FincaYHuerto no se hace responsable de la información publicada por terceros ni del contenido de las webs externas enlazadas.',
        ],
      },
    ],
  },
  afiliados: {
    title: 'Información sobre enlaces de afiliados',
    description:
      'Cómo funcionan los enlaces de afiliados en FincaYHuerto y qué significan para ti.',
    sections: [
      {
        heading: 'Programas de afiliación',
        body: [
          'FincaYHuerto puede participar en programas de afiliación y recibir una comisión por determinadas compras realizadas a través de nuestros enlaces, sin coste adicional para ti.',
        ],
      },
      {
        heading: 'Independencia editorial',
        body: [
          'Nuestras recomendaciones se basan en criterios de calidad y utilidad. La comisión de afiliación no influye en el precio que pagas ni condiciona nuestras valoraciones.',
        ],
      },
      {
        heading: 'Precios y disponibilidad',
        body: [
          'Los precios y la disponibilidad mostrados son orientativos y pueden variar. El precio final aplicable será siempre el que figure en la tienda en el momento de la compra.',
        ],
      },
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(legalDocs).map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const doc = legalDocs[slug]
  if (!doc) return { title: 'Página no encontrada' }
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/legal/${slug}` },
  }
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const doc = legalDocs[slug]
  if (!doc) notFound()

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={doc.title}
        description={doc.description}
        breadcrumbs={[{ label: 'Inicio', href: '/' }, { label: doc.title }]}
      />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-2 text-base leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
        <p className="mt-10 text-sm text-muted-foreground/70">
          Este texto es una plantilla informativa y debe revisarse y adaptarse a
          la legislación vigente antes de la publicación definitiva.
        </p>
      </article>
    </>
  )
}
