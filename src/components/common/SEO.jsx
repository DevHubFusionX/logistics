import { Helmet } from 'react-helmet-async'
import { useEffect } from 'react'
import { useTranslation } from '@/i18n'

/**
 * Reusable SEO component for dynamic per-page meta tags.
 * Supports JSON-LD structured data, breadcrumbs, og:locale, robots, etc.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.png?v=2',
  ogType = 'website',
  robots = 'index, follow',
  jsonLd = null,
  breadcrumbs = null, // array of { name, url }
}) {
  const { locale } = useTranslation()
  const siteUrl = 'https://daraexpress.com'
  const siteName = 'Dara Express'
  const fullTitle = title
    ? `${title} | Dara Express`
    : 'Darafort— Cold Chain Logistics & Haulage Company in Nigeria'

  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl
  const fullImage = `${siteUrl}${ogImage}`
  const ogLocale = locale === 'fr' ? 'fr_FR' : 'en_NG'

  // Dynamically set the HTML lang attribute for SEO crawlers
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  // Build BreadcrumbList JSON-LD if breadcrumbs are provided
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      ...breadcrumbs.map((crumb, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: crumb.name,
        item: `${siteUrl}${crumb.url}`,
      })),
    ],
  } : null

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang={locale} />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      <meta name="author" content={siteName} />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content="@daraexpress" />

      {/* Custom JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}

      {/* Breadcrumb JSON-LD */}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  )
}

