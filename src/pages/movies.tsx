import { useEffect, useState } from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Head from 'next/head'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import InfiniteScroll from 'react-infinite-scroll-component'

import MarkdownItem from 'utils/ts/interfaces/MarkdownItem'
import Box from '@components/box'
import ImageBox from '@components/layout/imageBox'
// import BlueGradientContainer from '@components/layout/blueGradientContainer'
import Heading from '@components/heading'
import JapaneseHeading from '@components/japaneseHeading'
import Text from '@components/text'
import Container from '@components/layout/container'
import BoxWithBgGradient from '@components/layout/boxWithBgGradient'

interface IState {
  page: number
  perPage: number
  allMovies: MarkdownItem[]
  displayedMovies: MarkdownItem[] | []
  filter: { value: string; label: string }
  filterOrder: { value: string; label: string }
}

const MoviesList: React.FC<{ movies: MarkdownItem[]; maxPage: number }> = ({
  movies,
  maxPage
}) => {
  const [state, setState] = useState<IState>({
    page: 1,
    perPage: 8,
    allMovies: movies,
    displayedMovies: [],
    filter: { value: 'date', label: 'data' },
    filterOrder: { value: 'ascendant', label: 'ascendente' }
  })

  const calculatePage = (caculateResults, index: number) => {
    const { perPage } = state
    const indexOfLastResults = index * perPage
    const indexOfFirstResults = indexOfLastResults - perPage
    const currentResults = caculateResults.slice(
      indexOfFirstResults,
      indexOfLastResults
    )
    return currentResults
  }

  const getMoreMovies = () => {
    let { page, allMovies } = state
    const updatePage = (page += 1)
    setState({
      ...state,
      displayedMovies: displayedMovies.concat(
        calculatePage(allMovies, updatePage)
      ),
      page: updatePage
    })
  }

  useEffect(() => {
    const { allMovies } = state
    setState({ ...state, displayedMovies: calculatePage(allMovies, 1) })
  }, [])

  const { page, displayedMovies } = state

  return (
    <>
      <Head>
        <title>movies - bobo's zoomeranime</title>
        <meta
          name="description"
          content="bobo's list of favourite zoomer japanese movie animations"
        />
      </Head>

      <BoxWithBgGradient img="/assets/images/jake-hills-23LET4Hxj_U-unsplash.jpg">
        <Heading position="relative" textAlign="center" type="h1">
          <span>movies</span>
          <JapaneseHeading positionX="0" positionY="25">
            映画
          </JapaneseHeading>
        </Heading>

        <Text textAlign="center" pb={6}>
          "Lorem ipsum dolor sit amet,
        </Text>
      </BoxWithBgGradient>

      <Container>
        <InfiniteScroll
          style={{ width: '100%', overflowY: 'hidden' }}
          dataLength={displayedMovies.length}
          next={getMoreMovies}
          hasMore={page !== maxPage}
          loader={<p>Loading...</p>}
        >
          <Box
            display="grid"
            gridGap={5}
            justifyContent="center"
            gridTemplateColumns={[
              'repeat(auto-fit, 80%)',
              'repeat(auto-fit, 13.5rem)',
              'repeat(auto-fit, 16rem)'
            ]}
          >
            {displayedMovies.map((item: MarkdownItem, index: number) => (
              <Link key={index} href={`movies/${item.id}`}>
                <a>
                  <ImageBox
                    h="45vh"
                    image={item.coverImage}
                    title={item.title}
                    nativeTitle={item.nativeTitle}
                  />
                </a>
              </Link>
            ))}
          </Box>
        </InfiniteScroll>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const perPage = 10
  const moviesDirectory = path.join(process.cwd(), 'src/content/movies')
  const fileNames = fs.readdirSync(moviesDirectory)
  const totalMovies = fileNames.length

  const allMoviesData: MarkdownItem[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(moviesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      nativeTitle: matterResult.data.nativeTitle,
      releaseDate: matterResult.data.releaseDate,
      coverImage: matterResult.data.img
    }
  })

  return {
    props: {
      movies: allMoviesData.sort((a, b) => (a.title < b.title ? -1 : 1)),
      maxPage: Math.ceil(totalMovies / perPage)
    }
  }
}

export default MoviesList
