import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import Box from '@components/primitives/box'
import Container from '@components/primitives/container'

const NoMatch: React.FC = () => {
  return (
    <>
      <Head>
        <title>erro 500 - bobo's zoomeranime</title>
        <meta
          name="description"
          content="a generic error page of bobo's zoomeranime website"
        />
      </Head>
      <Container>
        <Box
          css={{
            display: 'flex',
            height: '100vh',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Image src="/assets/images/pikachu-test.png" alt="teste" />
          <Box
            css={{ textAlign: 'center', paddingTop: '$6', paddingBottom: '$2' }}
          >
            <h1>error 500</h1>
            <h4>página não encontrada</h4>
          </Box>
          <Link href="/">
            <a>voltar à página inicial</a>
          </Link>
        </Box>
      </Container>
    </>
  )
}

export default NoMatch
