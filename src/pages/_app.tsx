import "src/locales/i18n";
import "simplebar/src/simplebar.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "react-lazy-load-image-component/src/effects/blur.css";

import Head from "next/head";
import { NextPage } from "next";
import { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { CacheProvider, EmotionCache } from "@emotion/react";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { 
  ProgressBar, 
  StyledChart, 
  ThemeSettings, 
  SettingsProvider, 
  MotionLazyContainer, 
  SnackbarProviderWrapper, 
} from "@components";

import { store } from "src/redux/store";
import ThemeLocalization from "src/locales";
import { createEmotionCache } from "@utils";
import { ThemeProvider } from "@theme/index";
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
      </ReduxProvider>
    </CacheProvider>
  );
}
