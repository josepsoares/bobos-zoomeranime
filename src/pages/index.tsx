import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'
import Image from 'next/image'

import Box from '@components/primitives/box'
import Text from '@components/primitives/text'
import Container from '@components/primitives/container'
import ImageBox from '@components/imageBox'

import type { GetStaticProps, NextPage } from 'next'

// TODO - fix styles

interface IHomeContentItem {
  slug: string
  title: string
  nativeTitle: string
  type: 'movie' | 'tv-serie'
  bannerImage: string
  description: string
}

const Home: NextPage<{
  data: IHomeContentItem[]
}> = ({ data }) => {
  return (
    <article>
      <Container>
        <Box
          display="grid"
          gridTemplateColumns={['1fr', null, '1fr 1fr']}
          gridGap={2}
          pb={5}
        >
          <Box
            transition={{ ease: 'easeIn', duration: 2 }}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -10 }
            }}
          >
            <Text pb={2} mb={0}>
              sup, i'm an expert japanese cartoon watcher who writes some silly,
              short and horrendous "essays" about animated japanese television
              shows and movies which aired during the late nineties and the
              first decade of the 21th century.
            </Text>
            <Text>
              I'll only talk about some shows or films I find worth exploring
              (and I watched), without all the crazy spoilers.
            </Text>
          </Box>
          <Box
            transition={{ ease: 'easeIn', duration: 2 }}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: -10 }
            }}
          >
            <Image
              src="/assets/images/pikachu-test.png"
              alt="teste"
              width={100}
              height={100}
            />
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={['1fr', null, '1fr 1fr']}
          gridGap={4}
        >
          {data.map((item: IHomeContentItem, index: number) => (
            <Link key={index} href={`/${item.type}s/${item.slug}`}>
              <ImageBox
                h="25vh"
                image={item?.bannerImage}
                title={item?.title}
                nativeTitle={item?.nativeTitle}
              />
            </Link>
          ))}
        </Box>
      </Container>
    </article>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const tvSeriesDirectory = path.join(process.cwd(), 'src/content/tv-series')
  const moviesDirectory = path.join(process.cwd(), 'src/content/movies')

  const allMovies = fs.readdirSync(moviesDirectory)
  const allTvSeries = fs.readdirSync(tvSeriesDirectory)

  const getRandMovieIndex = Math.floor(Math.random() * (allMovies.length + 1))
  const getRandTvSeriesIndex = Math.floor(
    Math.random() * (allTvSeries.length + 1)
  )

  const randMovie = matter(
    fs.readFileSync(
      path.join(moviesDirectory, allMovies[getRandMovieIndex]),
      'utf8'
    )
  )

  const randTvSerie = matter(
    fs.readFileSync(
      path.join(tvSeriesDirectory, allTvSeries[getRandTvSeriesIndex]),
      'utf8'
    )
  )

  return {
    props: {
      data: [
        {
          slug: randMovie.data.slug,
          description: randMovie.data.description,
          bannerImage: randMovie.data.bannerImage,
          title: randMovie.data.title,
          nativeTitle: randMovie.data.nativeTitle,
          type: 'movie'
        },
        {
          slug: randMovie.data.slug,
          description: randTvSerie.data.description,
          bannerImage: randTvSerie.data.bannerImage,
          title: randTvSerie.data.title,
          nativeTitle: randTvSerie.data.nativeTitle,
          type: 'tv-serie'
        }
      ]
    }
  }
}

export default Home
