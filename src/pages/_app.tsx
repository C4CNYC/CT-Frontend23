import { NextPage } from "next"
import { AppProps } from "next/app"
import Head from "next/head"

import { CacheProvider, EmotionCache } from "@emotion/react"
import { ThemeProvider } from "src/theme"
import { Provider as ReduxProvider } from "react-redux"

import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"

import {
  MotionLazyContainer,
} from "src/components/animate/MotionLazyContainer"
import {
  SettingsProvider,
  ThemeSettings,
} from "src/components/settings"
import {
  SnackbarProviderWrapper,
} from "src/components/snackbar"

import {
  ProgressBar,
} from "src/components/progress-bar"

import { createEmotionCache } from "src/lib/utils/createEmotionCache"
import { AuthProvider } from "src/auth/JwtContext"
import ThemeLocalization from "src/locales"
import "src/locales/i18n"
import { store } from "src/redux/store"

import "react-lazy-load-image-component/src/effects/blur.css"
import "simplebar/dist/simplebar.css"

const clientSideEmotionCache = createEmotionCache()

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp (props: MyAppProps): React.ReactElement {
  const {
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache
  } = props

  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width"/>
      </Head>
      <ReduxProvider store={store}>
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeSettings>
                    <ThemeLocalization>
                      <SnackbarProviderWrapper>
                        <ProgressBar/>
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
    </CacheProvider>
  )
}
