// next
import Document, { Head, Html, Main, NextScript } from "next/document";
import * as React from "react";

// @emotion
import createEmotionServer from "@emotion/server/create-instance";
// theme
import { palette } from "@theme/palette";
import { primaryFont } from "@theme/typography";

// utils
import { createEmotionCache } from "@utils";

// ----------------------------------------------------------------------

export default class MyDocument extends Document {
  render(): React.ReactElement {
    return (
      <Html lang="en" className={primaryFont.className}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/manifest.json" />

          {/* PWA primary color */}
          <meta name="theme-color" content={palette("light").primary.main} />

          {/* Favicon */}
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />

          {/* Emotion */}
          <meta name="emotion-insertion-point" content="" />
          {(this.props as any).emotionStyleTags}

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
    );
  }
}

// ----------------------------------------------------------------------

MyDocument.getInitialProps = async (ctx): Promise<any> => {
  const originalRenderPage = ctx.renderPage;

  const cache = createEmotionCache();

  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = async () =>
    await originalRenderPage({
      enhanceApp: (App: any) =>
        function EnhanceApp(props): React.ReactElement | null {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
