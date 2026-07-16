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

import { useTenants } from '../hooks/useTenants'
import '@/locales/i18n'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'simplebar/dist/simplebar.css'
import '@/lib/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { DEFAULT_TENANT } from '../redux/slices/tenant'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps, ...props }: MyAppProps): React.ReactElement {
  const tenantFromHook = useTenants()
  const stableTenant = tenantFromHook ?? DEFAULT_TENANT
  const getLayout = Component.getLayout ?? ((page) => page)

  const favicon = useMemo(() => {
    return (
      <>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={stableTenant?.favicon}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={stableTenant?.favicon}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={stableTenant?.favicon}
        />
      </>
    )
  }, [stableTenant])

  const socialMetaTags = useMemo(() => {
    if (!stableTenant) return null

    const name = stableTenant?.name || 'Codetribe'
    const title = stableTenant?.meta?.meta_title || stableTenant?.name || 'CodeTribe'
    const description =
      stableTenant?.meta?.meta_description ||
      'Text-based Coding for Teens, Schools & Summer Camps – Coding real-world, social-impact websites. Learn web development with friends.'
    const image = stableTenant?.min_logo || ''
    const url = getPrimaryDomainWithHttps(stableTenant?.domain || 'https://app.codetribe.com') || ''

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
          property='og:image:width'
          content='120'
        />
        <meta
          property='og:image:height'
          content='120'
        />
        <meta
          property='og:url'
          content={url}
        />
        <meta
          property='og:site_name'
          content={name}
        />

        <meta
          name='twitter:card'
          content='summary'
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
  }, [stableTenant])

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
        <AuthProvider tenant={stableTenant}>
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
