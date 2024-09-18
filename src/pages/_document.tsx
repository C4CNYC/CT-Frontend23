import React, { useMemo } from 'react'

import { DocumentHeadTags, DocumentHeadTagsProps } from '@mui/material-nextjs/v14-pagesRouter'
import { DocumentProps, Head, Html, Main, NextScript } from 'next/document'

import { palette } from '@/theme/palette'
import { primaryFont } from '@/theme/typography'

const icons: Record<string, Record<string, string>> = {
  codetribe: {
    favicon16x16: '/favicon/favicon-16x16.png',
    appleTouchIconUrl: '/favicon/apple-touch-icon.png',
    favicon32x32: '/favicon/favicon-32x32.png',
  },
  codejika: {
    favicon16x16: '/favicon/favicon_jika.ico',
    appleTouchIconUrl: '/favicon/favicon_jika.ico',
    favicon32x32: '/favicon/favicon_jika.ico',
  },
  localhost: {
    favicon16x16: '/favicon/favicon_jika.ico',
    appleTouchIconUrl: '/favicon/favicon_jika.ico',
    favicon32x32: '/favicon/favicon_jika.ico',
  },
}

const MyDocument = (props: DocumentProps & DocumentHeadTagsProps & { host: string }) => {
  const route = props.host
  // TODO: Update Logic to get subdomain properly
  const subdomain = useMemo(() => {
    const hostname = route.split('.')[0]
    const parts = hostname.split('.')
    if (parts.length > 2) {
      return parts[0]
    }

    return 'codetribe'
  }, [route])

  const favicon = useMemo(() => {
    if (!subdomain) {
      return null
    }

    return (
      <>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={icons[subdomain].appleTouchIconUrl}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={icons[subdomain].favicon32x32}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={icons[subdomain].favicon16x16}
        />
      </>
    )
  }, [subdomain])

  return (
    <Html
      lang='en'
      className={primaryFont.className}
    >
      <Head>
        <DocumentHeadTags {...props} />

        <meta charSet='utf-8' />
        <link
          rel='manifest'
          href='/manifest.json'
        />

        {/* PWA primary color */}
        <meta
          name='theme-color'
          content={palette('light').primary.main}
        />

        {/* Favicon */}
        {favicon}

        {/* Meta */}
        <meta
          name='description'
          content='Text-based Coding for Teens, Schools & Summer Camps – Coding real-world, social-impact websites. Learn web development with friends.'
        />
        <meta
          name='keywords'
          content='coding,study,it,school'
        />
        <meta
          name='author'
          content='codetribe.com'
        />

        <style>
          {`
              .CodeMirror { height: 400px; width: 500px; border: 1px solid #ddd; }
              .CodeMirror-scroll { max-height: 400px; width:500px; }
              .CodeMirror pre { display:inline-block; padding-left: 7px; line-height: 1.25; }
              #drawing { border: 1px solid #555555; float:left; display:inline-block; width:480px; height: 380px; }
              .CodeMirror-wrap pre {
                  word-break: break-word!important;
              }
            `}
        </style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

MyDocument.getInitialProps = async (ctx: any) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx)
  const req = ctx.req

  const host = req ? req.headers.host : ''

  return { ...initialProps, host }
}

export default MyDocument
