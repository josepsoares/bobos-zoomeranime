import { useEffect, useState } from 'react'
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'

import swrConfig from '@config/swrConfig'
import bobosZoomerTheme from '@styles/theme'
import GlobalStyles from '@styles/global'
import AnimationLayout from '@components/layout/animationLayout'
import Header from '@components/header/navbar'
import Footer from '@components/layout/footer'
import Box from '@components/box'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
  router
}) => {
  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }, [router])

  const [intro, setIntro] = useState(false)
  const [verifyingIntro, setVerifyingIntro] = useState(true)

  /* useEffect(() => {
    let introTimer = null
    const getLocalStorageIntro =
      typeof window !== 'undefined' ? localStorage.getItem('intro') : null

    if (!getLocalStorageIntro) {
      setVerifyingIntro(false)
    } else {
      const getIntroExpireDate = JSON.parse(getLocalStorageIntro)
      const now = new Date()

      if (now.getTime() > getIntroExpireDate.expiresAt) {
        setVerifyingIntro(false)
      } else {
        setVerifyingIntro(false)
        setIntro(true)
        introTimer = setTimeout(() => {
          const now = new Date()
          const createIntroExpireDate = JSON.stringify({
            expiresAt: now.getTime() + 21600
          })
          setIntro(false)
          typeof window !== 'undefined' &&
            localStorage.setItem('intro', createIntroExpireDate)
        }, 4000)
      }
    }

    return () => {
      if (introTimer) {
        clearTimeout(introTimer)
      }
    }
  }, []) */

  return (
    <>
      <Head>
        <title>bobo's zoomeranime</title>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="bobo's webpage to ramble about his favourite zoomer japanese animations"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          property="og:site_name"
          content="bobo's zoomeranime"
          key="ogsitename"
        />
        <meta name="msapplication-TileColor" content="#2f4550" />
        <meta
          property="og:url"
          content="https://boboszoomeranime.now.sh/"
          key="ogurl"
        />
        <meta
          name="twitter:creator"
          content="bobo's zoomeranime"
          key="twhandle"
        />
      </Head>
      <SWRConfig value={swrConfig}>
        <ThemeProvider theme={bobosZoomerTheme}>
          <GlobalStyles />
          <main>
            <Box
              display="grid"
              gridTemplateRows="auto 1fr auto"
              minHeight="100vh"
            >
              <Header />
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
              <Footer />
            </Box>
          </main>
        </ThemeProvider>
      </SWRConfig>
    </>
  )
}

export default MyApp
