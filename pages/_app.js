import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ToastProvider } from "../components/ToastContext";
import MUIThemeProvider from "../components/MUIThemeProvider";
import Head from "next/head";

const cache = createCache({
  key: "css",
  prepend: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="keywords" content="ccs" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Semibold.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="preload" href="fonts/GeneralSans/GeneralSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="true" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#131313 "></meta>
      </Head>
      <StyledEngineProvider injectFirst>
        <CacheProvider value={cache}>
          <MUIThemeProvider>
            <ToastProvider>
              <Component {...pageProps} />
            </ToastProvider>
          </MUIThemeProvider>
        </CacheProvider>
      </StyledEngineProvider>
    </>
  );
}

export default MyApp;
