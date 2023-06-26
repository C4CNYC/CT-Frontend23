// i18n
import "src/locales/i18n";

// scroll bar
import "simplebar/src/simplebar.css";

// lightbox
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/styles.css";

// map
import "mapbox-gl/dist/mapbox-gl.css";

// slick-carousel
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

// lazy image
import "react-lazy-load-image-component/src/effects/blur.css";

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from "@emotion/react";
// next
import { NextPage } from "next";
import { AppProps } from "next/app";
import Head from "next/head";
// redux
import { Provider as ReduxProvider } from "react-redux";
// @mui
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// redux
import { store } from "src/redux/store";
// utils
import { createEmotionCache } from "@ct-nx/utils";
// theme
import ThemeProvider from "src/theme";
// locales
import ThemeLocalization from "src/locales";
// components
import { MotionLazyContainer, StyledChart, ProgressBar, SnackbarProviderWrapper, SettingsProvider } from "@ct-nx/components";
import { Provider } from "jotai";
import { AuthProvider } from "src/auth/JwtContext";

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
        <AuthProvider>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <SettingsProvider>
              <MotionLazyContainer>
                <ThemeProvider>
                  <ThemeLocalization>
                    <SnackbarProviderWrapper>
                      <StyledChart />
                      <ProgressBar />
                      <Provider>
                        {getLayout(<Component {...pageProps} />)}
                      </Provider>
                    </SnackbarProviderWrapper>
                  </ThemeLocalization>
                </ThemeProvider>
              </MotionLazyContainer>
            </SettingsProvider>
          </LocalizationProvider>
        </AuthProvider>
      </ReduxProvider>
    </CacheProvider>
  );
}
