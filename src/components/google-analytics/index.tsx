import { useEffect } from 'react'

import Script from 'next/script'

import { useBoolean } from '@root/src/hooks/useBoolean'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export default function GoogleAnalytics(): React.ReactElement {
  const [open, setOpen, setClose] = useBoolean(false)
  useEffect(() => {
    let t = setTimeout(() => {
      setOpen()
    }, 5000)
    return () => clearTimeout(t)
  }, [])

  if (!open) return <></>

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-7F2RYWZ875`}
        strategy='afterInteractive'
      />
      <Script
        id='google-tag'
        strategy='afterInteractive'
      >
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GT-WFMTHTFG');
        `}
      </Script>
      <Script
        id='google-analytics'
        strategy='afterInteractive'
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-7F2RYWZ875');
        `}
      </Script>
    </>
  )
}
