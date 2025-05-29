import Head from "next/head"

interface SEOProps {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
  noIndex?: boolean
}

export default function SEO({
  title,
  description,
  keywords,
  ogImage = "https://dongplay.com/og-image.jpg", // Default OG image
  ogUrl,
  noIndex = false,
}: SEOProps) {
  const siteTitle = "DongPlay - Nonton Donghua Subtitle Indonesia"
  const fullTitle = title === siteTitle ? title : `${title} | ${siteTitle}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {ogUrl && <meta property="og:url" content={ogUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Canonical URL */}
      {ogUrl && <link rel="canonical" href={ogUrl} />}
      
      {/* No index if specified */}
      {noIndex && (
        <>
          <meta name="robots" content="noindex,nofollow" />
          <meta name="googlebot" content="noindex,nofollow" />
        </>
      )}
      
      {/* Additional meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="theme-color" content="#000000" />
      
      {/* Favicons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      
      {/* Manifest */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect to important domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteTitle,
            description,
            url: ogUrl || "https://dongplay.com",
          }),
        }}
      />
    </Head>
  )
}
