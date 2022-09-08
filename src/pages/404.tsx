import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import Box from '@components/box'
import Container from '@components/layout/container'

const NoMatch: React.FC = () => {
  return (
    <>
      <Head>
        <title>404 error - bobo's zoomeranime</title>
        <meta
          name="description"
          content="a generic error page of bobo's zoomeranime website"
        />
      </Head>
      <Container>
        <Box
          display="flex"
          height="100vh"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Image
            layout="fill"
            src="/assets/images/pikachu-test.png"
            alt="teste"
          />
          <Box textAlign="center" pt={6} pb={2}>
            <h1>error 404</h1>
            <h4>page not found</h4>
          </Box>
          <Link href="/">
            <a>go back to home page</a>
          </Link>
        </Box>
      </Container>
    </>
  )
}

export default NoMatch
