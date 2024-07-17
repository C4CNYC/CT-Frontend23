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

export default function MyApp(props: MyAppProps): React.ReactElement {
  const { Component, pageProps } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <EmotionAppCacheProvider {...props}>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1, width=device-width'
        />
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
