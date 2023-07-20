// i18n
// next
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";

// ----------------------------------------------------------------------
import { CacheProvider, EmotionCache } from "@emotion/react";
// theme
import { ThemeProvider } from "@theme/index";
// map
import "mapbox-gl/dist/mapbox-gl.css";
// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";
// redux
import { Provider as ReduxProvider } from "react-redux";
// scroll bar
import "simplebar/src/simplebar.css";
// slick-carousel
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// lightbox
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

// @mui
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// components
import {
  MotionLazyContainer,
  ProgressBar,
  SettingsProvider,
  SnackbarProviderWrapper,
  StyledChart,
  ThemeSettings,
} from "@components";
// utils
import { createEmotionCache } from "@utils";
import { AuthProvider } from "src/auth/JwtContext";
// locales
import ThemeLocalization from "src/locales";
import "src/locales/i18n";
// redux
import { store } from "src/redux/store";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps): React.ReactElement {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ReduxProvider store={store}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID as string}
        >
          <AuthProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <SettingsProvider>
                <MotionLazyContainer>
                  <ThemeProvider>
                    <ThemeSettings>
                      <ThemeLocalization>
                        <SnackbarProviderWrapper>
                          <StyledChart />
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
        </GoogleOAuthProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}
