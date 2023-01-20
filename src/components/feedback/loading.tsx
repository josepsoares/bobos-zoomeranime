import Head from 'next/head'

import Box from '@components/primitives/box'
import Heading from '@components/primitives/heading'
import Container from '@components/primitives/container'

import JapaneseHeading from '@components/japaneseHeading'

const Loading: React.FC = () => {
  return (
    <>
      <Head>
        <title>loading... - bobo's zoomeranime</title>
        <meta
          name="description"
          content="loading the all the things to present the next page of bobo's zoomer anime not incredible website about japanese animations"
        />
      </Head>

      <Container>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Heading as="h2">
            <span>Loading...</span>
            <JapaneseHeading>誤り...</JapaneseHeading>
          </Heading>
        </Box>
      </Container>
    </>
  )
}

export default Loading
