import { useEffect, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import NextProgress from 'next-progress'

import Header from '@components/header/navbar'
import Box from '@components/primitives/box'
import Footer from '@components/footer'
import GoTopButton from '@components/goToTopButton'

import globalStyles from '@styles/global'

// types
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import type { NextComponentType } from 'next'

const MyApp: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps,
  router
}) => {
  globalStyles()
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
      <NextProgress options={{ showSpinner: false }} color="#b8dbd9" />
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
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
