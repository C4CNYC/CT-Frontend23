import { useEffect, useMemo, useRef } from 'react'

import { AppCacheProvider as EmotionAppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as ReduxProvider } from 'react-redux'
import { io } from 'socket.io-client'

import { AuthProvider } from '@/auth/JwtContext'
import { MotionLazyContainer } from '@/components/animate/MotionLazyContainer'
import GoogleAnalytics from '@/components/google-analytics'
import { ProgressBar } from '@/components/progress-bar'
import { SettingsProvider, ThemeSettings } from '@/components/settings'
import { SnackbarProviderWrapper } from '@/components/snackbar'
import ThemeLocalization from '@/locales'
import { store, useDispatch } from '@/redux/store'
import { ThemeProvider } from '@/theme'

import '@/locales/i18n'
import 'react-lazy-load-image-component/src/effects/blur.css'
import 'simplebar/dist/simplebar.css'
import '@/lib/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { useAuthContext } from '../auth/useAuthContext'
import { setSocket } from '../redux/slices/code-panel-global'
import generateId from '../utils/generate-id'

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
    appleTouchIconUrl: '/favicon/apple-touch-icon.png',
    favicon32x32: '/favicon/favicon_jika.ico',
  },
  localhost: {
    favicon16x16: '/favicon/favicon-16x16.png',
    appleTouchIconUrl: '/favicon/favicon_jika.ico',
    favicon32x32: '/favicon/favicon-32x32.png',
  },
  gurukul: {
    favicon16x16: '/favicon/gcc-logo circle-favicon.png',
    appleTouchIconUrl: '/favicon/gcc-logo circle-favicon.png',
    favicon32x32: '/favicon/gcc-logo circle-favicon.png',
  },
}

export default function MyApp(props: MyAppProps): React.ReactElement {
  const { Component, pageProps } = props

  const subdomain = useMemo(() => {
    if (typeof window === 'object') {
      let subdomain = window.location.hostname.split('.')[0]
      if (subdomain in icons) {
        return subdomain
      } else {
        return 'codetribe'
      }
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
                        <SocketProvider>{getLayout(<Component {...pageProps} />)}</SocketProvider>
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

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const dispatch = useDispatch()
  const socketConnectedRef = useRef(false)
  const { user, isInitialized: authIsInitialized } = useAuthContext()

  useEffect(() => {
    if (socketConnectedRef.current || !authIsInitialized) return

    socketConnectedRef.current = true

    const socket = io(process.env.NEXT_PUBLIC_CODE_STREAM_API_HOST ?? '', {
      path: process.env.NEXT_PUBLIC_CODE_STREAM_API_PATH ?? undefined,
      auth: { userId: user?.id ?? generateId(20) },
      reconnectionDelay: 1000 * 60,
      reconnectionDelayMax: 1000 * 60 * 60,
      transports: ['websocket'],
    })

    dispatch(setSocket(socket))

    socket.on('connect_error', (error) => {
      // eslint-disable-next-line no-console
      console.error('Connection error', error)
    })

    return () => {
      socket?.disconnect()
      dispatch(setSocket(undefined))
    }
  }, [authIsInitialized, user])
  return <>{children}</>
}
