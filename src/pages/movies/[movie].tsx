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

const MoviePage: React.FC<{
  movie: IContent
  previousMovie: IContent | null
  nextMovie: IContent | null
}> = ({ movie, previousMovie, nextMovie }) => {
  const router = useRouter()
  const {
    content,
    excerpt,
    characterQuotes,
    evaluation,
    preface,
    rating,
    releaseDate
  } = movie

  const { isLoading, data, error } = useContentMediaQuery(movie.title)

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
            {previousMovie && (
              <Box
                css={{
                  display: 'flex',
                  '@bp1': {
                    w: '100%',
                    justifyContent: 'center'
                  },
                  '@bp2': {
                    w: nextMovie ? 'auto' : '100%',
                    justifyContent: 'flex-start'
                  }
                }}
              >
                <Button>
                  <Link href={`movies/${previousMovie}`}>
                    <LeftArrow />
                    <span>Previous movie</span>
                  </Link>
                </Button>
              </Box>
            )}

            {nextMovie && (
              <Box
                css={{
                  display: 'flex',
                  '@bp1': {
                    w: '100%',
                    justifyContent: 'center'
                  },
                  '@bp2': {
                    w: previousMovie ? 'auto' : '100%',
                    justifyContent: 'flex-start'
                  }
                }}
              >
                <Link href={`movies/${nextMovie}`}>
                  <Button>
                    <span className="mr-1">Next movie</span>
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
  const files = fs.readdirSync('src/content/movies', 'utf-8')
  const paths = files.map(fileName => ({
    params: {
      movie: fileName.replace(/\.md$/, '')
    }
  }))

  return {
    paths: [...paths],
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params: { movie } }) => {
  const currentMovieDirectory = path.join('src/content/movies', `${movie}.md`)
  const contents = fs.readFileSync(currentMovieDirectory, 'utf8')
  const parsedContents = matter(contents)
  delete parsedContents.orig

  const moviesDirectory = path.join(process.cwd(), 'src/content/movies')
  const fileNames = fs.readdirSync(moviesDirectory)

  const allMovies = fileNames
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

  const movieIndex = allMovies.findIndex(item => item.id === movie)

  const subtract = (a: number, b: number) => a - b
  const add = (a: number, b: number) => a - b

  const previousMovie = movieIndex > 0 ? allMovies[add(movieIndex, 1)] : null

  const nextMovie =
    movieIndex < allMovies.length ? allMovies[subtract(movieIndex, 1)] : null

  return {
    props: {
      movie: {
        id: movieIndex,
        content: parsedContents.content,
        excerpt: parsedContents.excerpt,
        ...parsedContents.data
      },
      previousMovie,
      nextMovie
    }
  }
}

export default MoviePage
