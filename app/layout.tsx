import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Poppins } from 'next/font/google'
import { Suspense } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://fincayhuerto.example'),
  title: {
    default: 'FincaYHuerto | Todo para tu huerto, jardín y finca',
    template: '%s | FincaYHuerto',
  },
  description:
    'Descubre herramientas, productos y soluciones para cuidar tu huerto y jardín. Guías, comparativas y recomendaciones para tu finca.',
  keywords: [
    'huerto',
    'jardín',
    'finca',
    'herramientas de jardín',
    'riego',
    'semillas',
    'maquinaria agrícola',
    'comparativas',
  ],
  openGraph: {
    title: 'FincaYHuerto | Todo para tu huerto, jardín y finca',
    description:
      'Herramientas, productos y soluciones para cuidar tu huerto y jardín.',
    type: 'website',
    locale: 'es_ES',
    siteName: 'FincaYHuerto',
  },
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#2f5233',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`light ${inter.variable} ${poppins.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col">
          <Suspense fallback={null}>
            <SiteHeader />
          </Suspense>
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
