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
