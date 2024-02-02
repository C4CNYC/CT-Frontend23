import * as React from "react"

import { DocumentHeadTags, DocumentHeadTagsProps } from "@mui/material-nextjs/v14-pagesRouter"
import { DocumentProps, Head, Html, Main, NextScript } from "next/document"

import { palette } from "@theme/palette"
import { primaryFont } from "@theme/typography"

export default function MyDocument(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en" className={primaryFont.className}>
      <Head>
        <DocumentHeadTags {...props} />

        <meta charSet="utf-8" />
        <link rel="manifest" href="/manifest.json" />

        {/* PWA primary color */}
        <meta name="theme-color" content={palette("light").primary.main} />

        {/* Favicon */}
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />

        {/* Meta */}
        <meta
          name="description"
          content="Text-based Coding for Teens, Schools & Summer Camps – Coding real-world, social-impact websites. Learn web development with friends."
        />
        <meta name="keywords" content="coding,study,it,school" />
        <meta name="author" content="codetribe.com" />

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
