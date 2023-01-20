import fs from 'fs'
import path from 'path'

import { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import matter from 'gray-matter'

import Box from '@components/primitives/box'
import Container from '@components/primitives/container'
import Text from '@components/primitives/text'
import Heading from '@components/primitives/heading'

import ImageBox from '@components/imageBox'
import BoxWithBgGradient from '@components/boxWithBgGradient'
import JapaneseHeading from '@components/japaneseHeading'

import type { GetStaticProps, NextPage } from 'next'
import type IContent from '@utils/ts/IContent'
// import BlueGradientContainer from '@components/layout/blueGradientContainer'

interface IState {
  page: number
  perPage: number
  allTvSeries: IContent[]
  displayedTvSeries: IContent[] | []
  filter: { value: string; label: string }
  filterOrder: { value: string; label: string }
}

const TvSeriesList: NextPage<{ tvSeries: IContent[]; maxPage: number }> = ({
  tvSeries,
  maxPage
}) => {
  const [state, setState] = useState<IState>({
    page: 1,
    perPage: 10,
    allTvSeries: tvSeries,
    displayedTvSeries: [],
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

  const getMoreTvSeries = () => {
    let { page, allTvSeries } = state
    const updatePage = (page += 1)
    setState({
      ...state,
      displayedTvSeries: displayedTvSeries.concat(
        calculatePage(allTvSeries, updatePage)
      ),
      page: updatePage
    })
  }

  useEffect(() => {
    const { allTvSeries } = state
    setState({ ...state, displayedTvSeries: calculatePage(allTvSeries, 1) })
  }, [])

  const { page, displayedTvSeries } = state

  return (
    <>
      <Head>
        <title>tv series - bobo's zoomeranime</title>
        <meta
          name="description"
          content="bobo's list of favourite zoomer japanese tv series animations"
        />
      </Head>

      <BoxWithBgGradient img="/assets/images/jake-hills-23LET4Hxj_U-unsplash.jpg">
        <Heading position="relative" textAlign="center" type="h1">
          <span>tv series</span>
          <JapaneseHeading>テレビ番組</JapaneseHeading>
        </Heading>

        <Text textAlign="center" pb={6}>
          "Lorem ipsum dolor sit amet,
        </Text>
      </BoxWithBgGradient>

      <Container>
        <InfiniteScroll
          style={{ width: '100%' }}
          dataLength={displayedTvSeries.length}
          next={getMoreTvSeries}
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
              'repeat(auto-fit, 15%)'
            ]}
          >
            {tvSeries.map((item: IContent, index: number) => (
              <div key={index}>
                <Link href={`tvseries/${item.id}`}>
                  <a>
                    <ImageBox
                      h="45vh"
                      image={item.coverImage}
                      title={item.title}
                      nativeTitle={item.nativeTitle}
                    />
                  </a>
                </Link>
              </div>
            ))}
          </Box>
        </InfiniteScroll>
      </Container>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const perPage = 10
  const tvSeriesDirectory = path.join(process.cwd(), 'src/content/tv-series')
  const fileNames = fs.readdirSync(tvSeriesDirectory)
  const totalTvSeries = fileNames.length

  const allTvSeriesData: IContent[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(tvSeriesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      id,
      title: matterResult.data.title,
      releaseDate: matterResult.data.releaseDate,
      coverImage: `./images/${id}-cover.png`
    }
  })

  return {
    props: {
      tvSeries: allTvSeriesData.sort((a, b) => (a.title < b.title ? -1 : 1)),
      maxPage: Math.ceil(totalTvSeries / perPage)
    }
  }
}

export default TvSeriesList