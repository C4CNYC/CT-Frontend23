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

import '@/locales/i18n'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'simplebar/dist/simplebar.css'
// import 'slick-carousel/slick/slick-theme.css'
import '@/lib/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
}

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

export default function MyApp(props: MyAppProps): React.ReactElement {
  const { Component, pageProps } = props

  const subdomain = useMemo(() => {
    if (typeof window === 'object') {
      return window.location.hostname.split('.')[0]
    }

    return 'codetribe'
  }, [])

  const getLayout = Component.getLayout ?? ((page) => page)

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
    <EmotionAppCacheProvider {...props}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
        {favicon}
      </Head>
      <GoogleAnalytics></GoogleAnalytics>
      <ReduxProvider store={store}>
        <AuthProvider>
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
