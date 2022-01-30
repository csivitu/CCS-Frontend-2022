import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ToastProvider } from "../components/ToastContext";
import MUIThemeProvider from "../components/MUIThemeProvider";

const cache = createCache({
  key: "css",
  prepend: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <MUIThemeProvider>
          <ToastProvider>
            <Component {...pageProps} />
          </ToastProvider>
        </MUIThemeProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
