'use client'

import Script from 'next/script'

declare global {
  interface Window {
	dataLayer: any[];
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

export default function GoogleAnalytics() {
if (!GA_ID) return null

return (
<>
<Script
strategy="afterInteractive"
src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
/>
<Script
id="google-analytics"
strategy="afterInteractive"
dangerouslySetInnerHTML={{
__html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${GA_ID}', { page_path: window.location.pathname, });`,
}}
/>
</>
)
}