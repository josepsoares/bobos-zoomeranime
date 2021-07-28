import Head from 'next/head'
import Box from '@components/box'
import Image from '@components/image'
import Container from '@components/layout/container'

const About: React.FC = () => {
  return (
    <>
      <Head>
        <title>about - bobo's zoomeranime</title>
        <meta
          name="description"
          content="some stuff about bobo's ideas and why he did this website in the first place"
        />
      </Head>
      <Container>
        <h1>about stuff</h1>
        <Box
          display="grid"
          gridTemplateColumns={['1fr', null, '1fr 1fr']}
          gridGap={2}
        >
          <Box>
            <p>
              To sintetize, this is a website where an expert japanese cartoon
              watcher (me) writes some silly, short and horrendous "essays"
              about animated japanese television shows and movies which aired
              during the late nineties and the first decade of the 21th century.
            </p>
            <p>
              In order to simplify and save your time I will only talk about
              some shows or films I find worth exploring (and I watched),
              without a lot of spoilers. To do so you might click on the tv
              series or movies button.
            </p>
          </Box>
          <Image src="pikachu-test.png" alt="teste" />
        </Box>
      </Container>
    </>
  )
}

export default About
