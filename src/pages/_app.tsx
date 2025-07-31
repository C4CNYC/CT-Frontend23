import { useMemo } from 'react'

import { AppCacheProvider as EmotionAppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { NextPage } from 'next'
import type { AppContext } from 'next/app'
import App from 'next/app'
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
import { getTenantByDomain } from '@/utils/serverUtils'

import { useTenants } from '../hooks/useTenants'
import { Tenant } from '../redux/slices/tenant'
import '@/locales/i18n'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'simplebar/dist/simplebar.css'
import '@/lib/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode
}

interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  serverTenant: Tenant
}

export default function MyApp({
  Component,
  pageProps,
  serverTenant,
  ...props
}: MyAppProps): React.ReactElement {
  const tenant = useTenants()
  const initialTenant = serverTenant || tenant
  const getLayout = Component.getLayout ?? ((page) => page)

  const favicon = useMemo(() => {
    return (
      <>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href={initialTenant?.favicon}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href={initialTenant?.favicon}
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href={initialTenant?.favicon}
        />
      </>
    )
  }, [initialTenant])

  const socialMetaTags = useMemo(() => {
    if (!initialTenant) return null

    const name = initialTenant?.name || 'Codetribe'
    const title = initialTenant?.meta?.meta_title || initialTenant?.name || 'CodeTribe'
    const description =
      initialTenant?.meta?.meta_description ||
      'Text-based Coding for Teens, Schools & Summer Camps – Coding real-world, social-impact websites. Learn web development with friends.'
    const image = initialTenant?.min_logo || ''
    const url =
      getPrimaryDomainWithHttps(initialTenant?.domain || 'https://app.codetribe.com') || ''

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
  }, [initialTenant])

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

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const req = appContext.ctx.req
  const host = req?.headers?.host || 'codetribe.com'
  let domain = host.split(':')[0]
  if (domain && domain === 'localhost') {
    domain = 'codetribe'
  }

  const tenant = await getTenantByDomain(domain)

  return {
    ...appProps,
    serverTenant: tenant,
  }
}
