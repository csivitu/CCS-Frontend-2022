import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { ToastProvider } from "../components/ToastContext";

const cache = createCache({
  key: "css",
  prepend: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <ToastProvider>
          <Component {...pageProps} />
        </ToastProvider>
      </CacheProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
