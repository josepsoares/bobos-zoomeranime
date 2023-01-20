import { useEffect, useState } from 'react'
import { NextComponentType } from 'next'
import { AppContext, AppInitialProps, AppProps } from 'next/app'
import Head from 'next/head'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

import GlobalStyles from '@styles/global'

import Header from '@components/header/navbar'
import Box from '@components/primitives/box'
import Footer from '@components/footer'
import GoTopButton from '@components/buttons/goToTopButton'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
  router
}) => {
  const [queryClient] = useState(() => new QueryClient())

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      })
    })
  }, [router])

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
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <GlobalStyles />
          <main>
            <Box
              css={{
                display: 'grid',
                minHeight: '100vh',
                gridTemplateRows: 'auto 1fr auto'
              }}
            >
              <Header />
              <Component {...pageProps} />
              <Footer />
            </Box>
            <GoTopButton />
          </main>
        </Hydrate>
      </QueryClientProvider>
    </>
  )
}

export default MyApp
