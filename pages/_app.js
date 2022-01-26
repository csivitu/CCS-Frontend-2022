import "../styles/globals.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const cache = createCache({
  key: "css",
  prepend: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <StyledEngineProvider injectFirst>
      <CacheProvider value={cache}>
        <Component {...pageProps} />
      </CacheProvider>
    </StyledEngineProvider>
  );
}

export default MyApp;
