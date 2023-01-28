import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'
import Image from 'next/image'

// components
import Box from '@components/primitives/box'
import Text from '@components/primitives/text'
import ImageBox from '@components/imageBox'
import SEO from '@components/seo'

// types
import type { GetStaticProps, NextPage } from 'next'
import Heading from '@components/primitives/heading'
import JapaneseHeading from '@components/japaneseHeading'

import _sampleSize from 'lodash.samplesize'

interface IHomeContentItem {
  slug: string
  title: string
  nativeTitle: string
  type: 'movie' | 'tv-show'
  bannerImage: string
  description: string
}

const Home: NextPage<{
  data: IHomeContentItem[]
}> = ({ data }) => {
  return (
    <>
      <SEO title="home" />

      <article>
        <Box container>
          <Box
            css={{
              display: 'grid',
              flexDirection: 'row',
              gap: '$2',
              pb: '$5',
              gridTemplateColumns: '1fr',
              '@bp3': {
                gridTemplateColumns: '2fr 1fr'
              }
            }}
          >
            <Box
              transition={{ ease: 'easeIn', duration: 0.3 }}
              initial="hidden"
              animate="visible"
              variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: -10 }
              }}
            >
              <Text css={{ pb: '$2', mb: 0 }}>
                sup, i'm an expert japanese cartoon watcher who writes some
                silly, short and horrendous "essays" about animated japanese
                television shows and movies which aired during the late nineties
                and the first decade of the 21th century.
              </Text>
              <Text>
                I'll only talk about some shows or films I find worth exploring
                (and I watched), without all the crazy spoilers.
              </Text>
            </Box>
            <Box
              transition={{ ease: 'easeIn', duration: 0.3 }}
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
          <Heading as="h1" align="center">
            <span>featuring</span>
            <JapaneseHeading css={{ left: 0 }}>テレビ番組</JapaneseHeading>
          </Heading>
          <Box
            css={{
              display: 'grid',
              gridGap: '$4',
              gridTemplateColumns: '1fr',
              '@bp3': {
                gridTemplateColumns: '1fr 1fr'
              }
            }}
          >
            {data.map((item: IHomeContentItem, index: number) => (
              <Link key={index} href={`/${item.type}s/${item.slug}`}>
                <ImageBox
                  h="50vh"
                  image={item?.bannerImage}
                  title={item?.title}
                  nativeTitle={item?.nativeTitle}
                />
              </Link>
            ))}
          </Box>
        </Box>
      </article>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const tvShowsDirectory = path.join(process.cwd(), 'src/content/tv-shows')
  const moviesDirectory = path.join(process.cwd(), 'src/content/movies')

  const allMovies = fs.readdirSync(moviesDirectory)
  const allTvShows = fs.readdirSync(tvShowsDirectory)

  const getRandMovieIndex = Math.floor(Math.random() * (allMovies.length + 1))
  const getRandTvShowsIndex = Math.floor(
    Math.random() * (allTvShows.length + 1)
  )

  // const randMovies = _sampleSize(allMovies, 4)
  // console.log(randMovies)

  const randMovieSlug = allMovies[getRandMovieIndex].replace(/\.md$/, '')
  const randMovie = matter(
    fs.readFileSync(
      path.join(moviesDirectory, allMovies[getRandMovieIndex]),
      'utf8'
    )
  )

  const randTvShowSlug = allTvShows[getRandTvShowsIndex].replace(/\.md$/, '')
  const randTvShow = matter(
    fs.readFileSync(
      path.join(tvShowsDirectory, allTvShows[getRandTvShowsIndex]),
      'utf8'
    )
  )

  return {
    props: {
      data: [
        {
          slug: randMovieSlug,
          bannerImage: randMovie.data.img,
          title: randMovie.data.title,
          nativeTitle: randMovie.data.nativeTitle,
          type: 'movie'
        },
        {
          slug: randTvShowSlug,
          bannerImage: randTvShow.data.img,
          title: randTvShow.data.title,
          nativeTitle: randTvShow.data.nativeTitle,
          type: 'tv-show'
        }
      ]
    }
  }
}

export default Home
