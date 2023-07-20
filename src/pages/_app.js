import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createEmotionCache from "../utils/createEmotionCache";
import { amber, blueGrey } from '@mui/material/colors'
import { roboto, prompt } from "@/app/fonts";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const theme = createTheme({
  palette: {
      primary: {
          main: blueGrey[100],
      },
      secondary: {
          main: amber[400],
      },
  },
  typography:{  
    h1:{
      fontFamily: prompt.style.fontFamily,
      fontWeight: 700,
      fontSize: '28px',
      lineHeight: '40px',
    },
    subtitle1:{
      fontFamily: prompt.style.fontFamily,
      fontWeight: 700,
      fontSize: '16px',
      lineHeight: '40px',
      color: '#0074B7',
    },
    h3:{
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      fontSize: '14px',
      lineHeight: '2px',
      color: "#666"
    },
    h4:{
      fontFamily: roboto.style.fontFamily,
      fontWeight: 400,
      fontSize: '16px',
      lineHeight: '15px',
      color: "#666"
    },
    body1:{
      fontFamily: roboto.style.fontFamily,
    },
    caption:{
      fontFamily: prompt.style.fontFamily,
    }
  },
  

});


export default function MyApp(props) {
  // If there's no emotionCache rendered by the server, use the clientSideEmotionCache
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}