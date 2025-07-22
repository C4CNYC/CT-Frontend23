import { useMemo } from 'react'

import { AppCacheProvider as EmotionAppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as ReduxProvider } from 'react-redux'

import { AuthProvider } from '@/auth/JwtContext'
import { MotionLazyContainer } from '@/components/animate/MotionLazyContainer'
import GoogleAnalytics from '@/components/google-analytics'
import { ProgressBar } from '@/components/progress-bar'
import { SettingsProvider, ThemeSettings } from '@/components/settings'
import { SnackbarProviderWrapper } from '@/components/snackbar'
import ThemeLocalization from '@/locales'
import { store } from '@/redux/store'
import { ThemeProvider } from '@/theme'
import { getPrimaryDomainWithHttps } from '@/utils/getPrimaryDomainWithHttps'

import '@/locales/i18n'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'simplebar/dist/simplebar.css'
import '@/lib/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { useTenants } from '../hooks/useTenants'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps, ...props }: MyAppProps): React.ReactElement {
  const tenant = useTenants()
  const getLayout = Component.getLayout ?? ((page) => page)

  const favicon = useMemo(() => {
    return (
      <>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={tenant?.favicon}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={tenant?.favicon}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={tenant?.favicon}
        />
      </>
    )
  }, [tenant])

  const socialMetaTags = useMemo(() => {
    if (!tenant) return null

    const title = tenant?.meta?.meta_title || tenant?.name || 'Name of the company or page'
    const description =
      tenant?.meta?.meta_description ||
      'Description of the company or page, which is used for SEO and social media sharing.'
    const image = tenant?.min_logo || tenant?.favicon || ''
    const url = getPrimaryDomainWithHttps(tenant?.domain || 'https://app.codetribe.com') || ''

    return (
      <>
        <meta
          property='og:type'
          content='website'
        />
        <meta
          property='og:title'
          content={title}
        />
        <meta
          property='og:description'
          content={description}
        />
        <meta
          property='og:image'
          content={image}
        />
        <meta
          property='og:url'
          content={url}
        />
        <meta
          property='og:site_name'
          content={tenant?.name || 'Codetribe'}
        />

        <meta
          name='twitter:card'
          content='summary_large_image'
        />
        <meta
          name='twitter:title'
          content={title}
        />
        <meta
          name='twitter:description'
          content={description}
        />
        <meta
          name='twitter:image'
          content={image}
        />
        <meta
          name='twitter:url'
          content={url}
        />
      </>
    )
  }, [tenant])

  return (
    <EmotionAppCacheProvider {...props}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width, interactive-widget=resizes-content'
        />
        <link
          rel='preconnect'
          href='https://devnest.s3.amazonaws.com'
        />
        <link
          rel='icon'
          href='data:,'
        />
        {favicon}
        {socialMetaTags}
      </Head>
      <GoogleAnalytics></GoogleAnalytics>
      <ReduxProvider store={store}>
        <AuthProvider tenant={tenant}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeSettings>
                    <ThemeLocalization>
                      <SnackbarProviderWrapper>
                        <ProgressBar />
                        {getLayout(<Component {...pageProps} />)}
                      </SnackbarProviderWrapper>
                    </ThemeLocalization>
                  </ThemeSettings>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </ReduxProvider>
    </EmotionAppCacheProvider>
  )
}
