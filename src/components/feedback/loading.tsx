import Head from 'next/head'
import Box from '@components/box'
import Heading from '@components/heading'
import JapaneseHeading from '@components/japaneseHeading'
import Container from '@components/layout/container'

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
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Heading type="h2">
            <span>Loading...</span>
            <JapaneseHeading>誤り...</JapaneseHeading>
          </Heading>
        </Box>
      </Container>
    </>
  )
}

export default Loading
