import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'

import Box from '@components/primitives/box'
import Container from '@components/primitives/container'
import Text from '@components/primitives/text'
import Heading from '@components/primitives/heading'

import BlueGradientContainer from '@components/cardWithBlueGradient'
import BoxWithBgGradient from '@components/boxWithBgGradient'
import JapaneseHeading from '@components/japaneseHeading'
import Characters from '@components/content/characters'
import Staff from '@components/content/staff'
import Quotes from '@components/content/quotes'
import Button from '@components/primitives/button'
import Share from '@components/content/share'
import SEO from '@components/seo'

import Loading from '@components/feedback/loading'
import Error from '@components/feedback/error'

import { useContentMediaQuery } from '@utils/hooks/useContentMediaQuery'

// icons
import LeftArrow from '@icons/bx-left-arrow-alt.svg'
import RightArrow from '@icons/bx-right-arrow-alt.svg'
import StarHalf from '@icons/bxs-star-half.svg'
import Star from '@icons/bxs-star.svg'

// types
import type { GetStaticPaths, GetStaticProps } from 'next'
import type IContent from '@utils/ts/IContent'

const TvShowPage: React.FC<{
  tvShow: IContent
  previousTvShow: IContent | null
  nextTvShow: IContent | null
}> = ({ tvShow, previousTvShow, nextTvShow }) => {
  const router = useRouter()
  const {
    content,
    excerpt,
    characterQuotes,
    evaluation,
    preface,
    rating,
    releaseDate
  } = tvShow

  const { isLoading, data, error } = useContentMediaQuery(tvShow.title)

  if (isLoading) {
    return <Loading />
  } else if (error) {
    return <Error error={error as string} />
  } else {
    const {
      title,
      genres,
      characters,
      bannerImage,
      duration,
      studios,
      startDate,
      tags,
      averageScore,
      episodes,
      idMal,
      reviews,
      siteUrl,
      staff,
      trailer
    } = data.Media

    return (
      <>
        <SEO title={title.romaji} />

        <BoxWithBgGradient img={bannerImage}>
          <Heading as="h1">
            <span>{title.romaji}</span>
            <JapaneseHeading css={{ top: '25%' }}>
              {title.native}
            </JapaneseHeading>
          </Heading>
          <Heading as="h4" css={{ py: '$3' }}>
            {preface}
          </Heading>
          <Box>
            <Text>{genres.join(', ').toLowerCase()}</Text>
          </Box>
          <BlueGradientContainer>
            <Box
              css={{
                p: '$4',
                gridGap: '$4',
                display: 'grid',
                justifyContent: 'center',
                '@bp1': {
                  gridTemplateColumns: '1fr'
                },
                '@bp3': {
                  gridTemplateColumns: '1fr 1fr'
                }
              }}
            >
              <div>
                <p>
                  At {startDate.day}/{startDate.month}/{startDate.year}
                  the world could enjoy this entertainment piece.
                </p>
              </div>
              <div>
                <p>
                  about duration and time related things, well this a movie so
                  the lenght of it is about {duration} minutes.
                </p>
              </div>

              <div>
                <p>
                  this stuff was produced, mainly, by{' '}
                  {studios.edges[0].node.name}.
                </p>
              </div>
              <div>
                <p>to finish this off, let&apos;s talk about genres: .</p>
              </div>
            </Box>
          </BlueGradientContainer>
        </BoxWithBgGradient>

        <Container>
          <Box
            css={{
              py: '$20',
              gridGap: '$4',
              display: 'grid',
              '@bp1': {
                gridTemplateColumns: '1fr'
              },
              '@bp3': {
                gridTemplateColumns: '1fr 1fr'
              }
            }}
          >
            <Characters data={characters.edges} />
            <Staff data={staff.edges} />
          </Box>

          <Box css={{ py: '$20' }}>
            <Heading as="h1">
              <span>bobo&apos;s ramblings</span>
              <JapaneseHeading css={{ top: '25%' }}>
                ボボ の 電波な奴
              </JapaneseHeading>
            </Heading>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Box>

          <Quotes data={characterQuotes} />

          <Box css={{ py: '$20' }}>
            <Heading as="h1" align="center">
              <span>bobo&apos;s verdict</span>
              <JapaneseHeading>ボボ の 評決</JapaneseHeading>
            </Heading>
            <Box
              css={{
                gridGap: '$4',
                display: 'grid',
                '@bp1': {
                  gridTemplateColumns: '1fr'
                },
                '@bp3': {
                  gridTemplateColumns: '1fr 1fr'
                }
              }}
            >
              <h2 className="py-6">{rating.text}</h2>
              <Image
                alt="rating illustration"
                width={100}
                height={100}
                src="/assets/images/pikachu-test.png"
              />
            </Box>
          </Box>

          <Box css={{ py: '$20' }}>
            <Heading as="h2" align="center">
              <span>other humans opinion</span>
            </Heading>
            <Text css={{ fontSize: '8px' }}>
              in case you're not satisfied with mine...
            </Text>
            <Box>
              {reviews.edges.map((item, index) => (
                <Box key={index}>
                  <Text>{item.node.summary}</Text>
                  <Text align="center">anon</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Share
            title={`${title.romaji} - bobo's zoomeranime`}
            url={router.pathname}
            subjects={''}
          />

          <Box css={{ display: 'flex', justifyContent: 'space-between' }}>
            {previousTvShow && (
              <Box
                css={{
                  display: 'flex',
                  '@bp1': {
                    w: '100%',
                    justifyContent: 'center'
                  },
                  '@bp2': {
                    w: nextTvShow ? 'auto' : '100%',
                    justifyContent: 'flex-start'
                  }
                }}
              >
                <Button>
                  <Link href={`movies/${previousTvShow}`}>
                    <LeftArrow />
                    <span>Previous series</span>
                  </Link>
                </Button>
              </Box>
            )}

            {nextTvShow && (
              <Box
                css={{
                  display: 'flex',
                  '@bp1': {
                    w: '100%',
                    justifyContent: 'center'
                  },
                  '@bp2': {
                    w: previousTvShow ? 'auto' : '100%',
                    justifyContent: 'flex-start'
                  }
                }}
              >
                <Link href={`tv-shows/${nextTvShow}`}>
                  <Button>
                    <span className="mr-1">Next series</span>
                    <RightArrow />
                  </Button>
                </Link>
              </Box>
            )}
          </Box>
        </Container>
      </>
    )
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const files = fs.readdirSync('src/content/tv-shows', 'utf-8')
  const paths = files.map(fileName => ({
    params: {
      tvshow: fileName.replace(/\.md$/, '')
    }
  }))

  return {
    paths: [...paths],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({
  params: { tvshow }
}) => {
  const currentMovieDirectory = path.join(
    'src/content/tv-shows',
    `${tvshow}.md`
  )
  const contents = fs.readFileSync(currentMovieDirectory, 'utf8')
  const parsedContents = matter(contents)
  delete parsedContents.orig

  const moviesDirectory = path.join(process.cwd(), 'src/content/tv-shows')
  const fileNames = fs.readdirSync(moviesDirectory)

  const allSeries = fileNames
    .map(fileName => {
      const id = fileName.replace(/\.md$/, '')

      return {
        id
      }
    })
    .sort((a, b) => {
      if (a.id > b.id) {
        return 1
      } else if (a.id < b.id) {
        return -1
      } else {
        return 0
      }
    })

  const tvserieIndex = allSeries.findIndex(item => item.id === tvshow)

  const subtract = (a: number, b: number) => a - b
  const add = (a: number, b: number) => a - b

  const previousSeries =
    tvserieIndex > 0 ? allSeries[add(tvserieIndex, 1)] : null

  const nextSeries =
    tvserieIndex < allSeries.length
      ? allSeries[subtract(tvserieIndex, 1)]
      : null

  return {
    props: {
      tvShow: {
        id: tvserieIndex,
        content: parsedContents.content,
        excerpt: parsedContents.excerpt,
        ...parsedContents.data
      },
      previousSeries,
      nextSeries
    }
  }
}

export default TvShowPage
