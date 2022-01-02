/*******************************************************************************
  The MIT License (MIT)

  Copyright (c) 2021-present Marcel Joachim Kloubert

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
*******************************************************************************/

import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CookieConsent from "react-cookie-consent";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface BundWsAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

import createCache from '@emotion/cache';
import { red } from '@mui/material/colors';
import { AppBar, Box, Button, CssBaseline, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';

// prepend: true moves MUI styles to the top of the <head> so they're loaded first.
// It allows developers to easily override MUI styles with other styling solutions, like CSS modules.
function createEmotionCache() {
  return createCache({ key: 'css', prepend: true });
}

// Create a theme instance.
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const BundWsApp = (props: BundWsAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const handleGithubClick = () => {
    window.location.href = 'https://github.com/bund-ws';
  };

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <AppBar position="fixed">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: 'flex' } }}
            >
              bund.ws
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
              <Link href="/">
                <Button
                  key="home-page"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Startseite
                </Button>
              </Link>

              <Link href="/datenschutz">
                <Button
                  key="privacy-page"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Datenschutzerklärung
                </Button>
              </Link>

              <Link href="/impressum">
                <Button
                  key="imprint-page"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Impressum
                </Button>
              </Link>
            </Box>

            <Button color="inherit" onClick={handleGithubClick}>GitHub</Button>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Component {...pageProps} />

        <CookieConsent style={{
          background: "blue",
          color: "white"
        }} buttonText={"Verstanden!"}>
          Diese Seite möglicherweise Cookies ein.{" "}
          <Link href="/datenschutz">
            <span style={{ color: 'yellow', cursor: 'pointer' }}>Hier geht es zur Datenschutzerklärung ...</span>
          </Link>
        </CookieConsent>
      </ThemeProvider>
    </CacheProvider>
  );
};

export default BundWsApp;
