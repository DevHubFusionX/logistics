import { Helmet } from 'react-helmet-async'

/**
 * Reusable SEO component for dynamic per-page meta tags.
 * Wraps react-helmet-async to keep pages clean.
 */
export default function SEO({
  title,
  description,
  keywords,
  canonical,
  ogImage = '/og-image.png?v=2',
  ogType = 'website',
}) {
  const siteUrl = 'https://daraexpress.com'
  const fullTitle = title
    ? `${title} | Dara Express`
    : 'Dara Express - Global Logistics & Freight Solutions'

  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
    </Helmet>
  )
}
