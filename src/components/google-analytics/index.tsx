import Head from 'next/head'
import Script from 'next/script'

declare global {
  interface Window {
    dataLayer: any[]
  }
}

export default function GoogleAnalytics(): React.ReactElement {
  return (
    <>
      <Head>
        <link
          rel='preconnect'
          href='https://www.googletagmanager.com'
        />
      </Head>
      <Script
        id='google-tag'
        strategy='lazyOnload'
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GT-WFMTHTFG');
        `}
      </Script>
    </>
  )
}
