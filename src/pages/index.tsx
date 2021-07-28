import fs from 'fs'
import path from 'path'
import { GetStaticProps } from 'next'
import Link from 'next/link'
import matter from 'gray-matter'
import useSWR from 'swr'
import { Fetcher } from 'swr/dist/types'

import Box from '@components/box'
import Image from '@components/image'
import ImageBox from '@components/layout/imageBox'
import Text from '@components/text'
import Error from '@components/feedback/error'
import Loading from '@components/feedback/loading'
import Container from '@components/layout/container'

interface HomeMediaItem {
  title: {
    romaji: string
    native: string
  }
  bannerImage: string
  description: string
}

const fetcher: Fetcher<HomeMediaItem[]> = async (items: string[]) => {
  console.log(items)
  const url = 'https://graphql.anilist.co'

  const getData = await Promise.all(
    items.map(async (item: string) => {
      const request = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          query: `query {
                      Media (search: "${item}", type: ANIME) {
                          title{
                              romaji
                              native
                          }
                          bannerImage
                          description
                      }
                  }`
        })
      })
      const data = await request.json()
      return data.data.Media
    })
  )

  return getData
}

export const useHomeMedia = (
  itemNames: string[],
  initialData: HomeMediaItem[]
): { data: HomeMediaItem[]; error: string } => {
  const { data, error } = useSWR<HomeMediaItem[], string>(itemNames, fetcher, {
    initialData: initialData
  })

  return { data, error }
}

const Home: React.FC<{
  randItemsData: HomeMediaItem[]
  randItemsName: string[]
}> = ({ randItemsData, randItemsName }) => {
  const { data, error } = useHomeMedia(randItemsName, randItemsData)

  return !data ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
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
            <Image src="pikachu-test.png" alt="teste" />
          </Box>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns={['1fr', null, '1fr 1fr']}
          gridGap={4}
        >
          {/* fazer scroll horizontal aqui de pelos 4 itens de cada categoria */}
          {data.map((item: HomeMediaItem, index: number) => (
            <Link
              key={index}
              href={`/${randItemsName[index]}/${randItemsName[index]}`}
            >
              <a>
                <ImageBox
                  h="25vh"
                  image={item.bannerImage}
                  title={item.title.romaji}
                  nativeTitle={item.title.native}
                />
              </a>
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

  console.log(moviesDirectory, allMovies[getRandMovieIndex])
  console.log(tvSeriesDirectory, allTvSeries[getRandTvSeriesIndex])

  const randMovieName = matter(
    fs.readFileSync(
      path.join(moviesDirectory, allMovies[getRandMovieIndex]),
      'utf8'
    )
  )
  const randTvSerieName = matter(
    fs.readFileSync(
      path.join(tvSeriesDirectory, allTvSeries[getRandTvSeriesIndex]),
      'utf8'
    )
  )

  const randItemsData = await fetcher([
    randMovieName.data.title,
    randTvSerieName.data.title
  ])

  return {
    props: {
      randItemsData,
      randItemsName: [randMovieName.data.title, randTvSerieName.data.title]
    }
  }
}

export default Home
