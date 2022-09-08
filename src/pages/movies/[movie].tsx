import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useState, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useWindowSize, useMeasure } from 'react-use'
import { useSpring, animated, config } from 'react-spring'
import { FacebookShareButton, TwitterShareButton } from 'react-share'
import ReactMarkdown from 'react-markdown'

import Box from '@components/box'
// import getRandomPhrase from '../../scripts/getRandomPhrase'
import BlueGradientContainer from '@components/layout/blueGradientContainer'
import QuoteButton from '@components/buttons/quoteButton'
import NextPrevButton from '@components/buttons/nextPrevButton'
import {
  LeftArrowAlt,
  RightArrowAlt,
  StarHalf,
  SquareRounded,
  Star
} from '@styled-icons/boxicons-solid'
import { FacebookCircle, Twitter } from '@styled-icons/boxicons-logos'
import { useMedia } from 'utils/hooks/useMedia'
import MarkdownItem from 'utils/ts/interfaces/MarkdownItem'
import Character from 'utils/ts/interfaces/Character'
import JapaneseHeading from '@components/japaneseHeading'
import Loading from '@components/feedback/loading'
import Error from '@components/feedback/error'
import Heading from '@components/heading'
import Text from '@components/text'
import BoxWithBgGradient from '@components/layout/boxWithBgGradient'
import Container from '@components/layout/container'
import Staff from 'utils/ts/interfaces/Staff'

const printStars = (number: string) => {
  const stars = []
  const totalStars = 5
  const isNumInt = Number.isInteger(number)
  for (let i = 0; i < parseInt(number); i++) {
    stars.push(<Star size="1rem" />)
  }

  if (!isNumInt) {
    stars.push(<StarHalf size="1rem" />)
  }

  if (stars.length !== totalStars) {
    do {
      stars.push(<Star size="1rem" />)
    } while (stars.length !== totalStars)
  }

  return (
    <Box pb={2}>
      {stars.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </Box>
  )
}

const MoviePage: React.FC<{
  movie: MarkdownItem
  previousMovie: MarkdownItem | null
  nextMovie: MarkdownItem | null
}> = ({ movie, previousMovie, nextMovie }) => {
  const [quoteState, setQuoteState] = useState({
    displayedQuote: 0,
    toggle: false
  })
  const { displayedQuote } = quoteState
  const [contentHeight, setContentHeight] = useState(100)
  const [quotesContainerRef, { height }] = useMeasure()

  const expandQuotesContainer = useSpring({
    config: config.slow,
    height: contentHeight
  })
  const quoteTitleAnimation = useSpring({
    config: config.gentle,
    opacity: !quoteState.toggle ? 1 : 0
  })

  useEffect(() => {
    const heightRef = Math.floor(height)
    setContentHeight(heightRef)

    window.addEventListener('resize', () => setContentHeight(heightRef))
    return window.removeEventListener('resize', () =>
      setContentHeight(heightRef)
    )
  }, [height])

  const {
    content,
    excerpt,
    characterQuotes,
    evaluation,
    preface,
    rating,
    releaseDate
  } = movie

  const { width } = useWindowSize()

  const handleBtnQuotes = (action: boolean) => {
    setQuoteState({ ...quoteState, toggle: true })
    setTimeout(() => {
      const updateQuote = action ? displayedQuote + 1 : displayedQuote - 1
      setQuoteState({
        ...quoteState,
        displayedQuote: updateQuote,
        toggle: false
      })
    }, 300)
  }

  const handleCircleBtnQuotes = (index: number) => {
    setQuoteState({ ...quoteState, toggle: true })
    setTimeout(() => {
      setQuoteState({ ...quoteState, displayedQuote: index, toggle: false })
    }, 300)
  }

  const { isLoading, data, error } = useMedia(movie.title)
  console.log(isLoading, data, error)

  if (isLoading) {
    return <Loading />
  } else if (error) {
    return <Error error={error} />
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

    const getGenres = []

    genres.forEach((genre: string, index: number) => {
      if (index === genres.length - 1) {
        getGenres.push(genre.toLowerCase())
      } else {
        getGenres.push(genre.toLowerCase() + ', ')
      }
    })

    console.log(tags, reviews)

    return (
      <>
        <Head>
          <title>{title.romaji} - bobo's zoomeranime</title>
          <meta
            name="description"
            content={`the movie page of ${title} in the not incredible bobo's zoomeranime website about japanese animations`}
          />
        </Head>
        <BoxWithBgGradient img={bannerImage}>
          <Heading type="h1" position="relative">
            <span>{title.romaji}</span>
            <JapaneseHeading positionX="0" positionY="25">
              {title.native}
            </JapaneseHeading>
          </Heading>
          <Heading type="h4" py={3}>
            {preface}
          </Heading>
          <Box>
            <Text>{getGenres.map(item => item)}</Text>
          </Box>
          <BlueGradientContainer>
            <Box
              p={4}
              gridGap={4}
              display="grid"
              justifyContent="center"
              gridTemplateColumns={['1fr', null, '1fr 1fr']}
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
            display="grid"
            gridTemplateColumns={['1fr', null, '1fr 1fr']}
            gridGap={4}
            py={20}
          >
            <Box>
              <Heading type="h1" position="relative" pb={4}>
                stinky main characters
                <JapaneseHeading positionX="0" positionY="25">
                  ボボ の 電波な奴
                </JapaneseHeading>
              </Heading>
              <Box
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="center"
                gridGap={4}
              >
                {characters.edges.map((char: Character, index: number) => (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    key={index}
                  >
                    <img
                      width={100}
                      height={100}
                      alt={char.node.name.first}
                      src={char.node.image.large}
                    />
                    <Heading type="h5" py={2}>
                      {char.node.name?.first} <br /> {char.node.name?.last}
                    </Heading>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box>
              <Heading type="h1" position="relative" pb={4}>
                amazing humans who did this
                <JapaneseHeading positionX="0" positionY="25">
                  ボボ の 電波な奴
                </JapaneseHeading>
              </Heading>
              <Box
                display="flex"
                flexWrap="wrap"
                flexDirection="row"
                justifyContent="center"
                gridGap={4}
              >
                {staff.edges.map((staff: Staff, index: number) => (
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    key={index}
                  >
                    <img
                      width={100}
                      height={100}
                      alt={staff.node.name.full}
                      src={staff.node.image.large}
                    />
                    <Heading type="h5" py={2}>
                      {staff.node.name.full}
                    </Heading>
                    <Text>{staff.role}</Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          <Box py={20}>
            <Heading type="h1" position="relative">
              <span>bobo&apos;s ramblings</span>
              <JapaneseHeading positionX="0" positionY="25">
                ボボ の 電波な奴
              </JapaneseHeading>
            </Heading>
            <ReactMarkdown
              children={content}
              components={{ img: () => Image }}
            />
          </Box>

          <Box
            ref={quotesContainerRef}
            style={expandQuotesContainer}
            width="100%"
            py={20}
            px={4}
          >
            <BlueGradientContainer>
              <h2 className="text-center w-full">
                fancy quotes proclaimed in this piece
              </h2>

              <Box justifyContent="center" alignItems="center">
                <animated.h4 style={quoteTitleAnimation} className="pb-3 px-2">
                  <i>{characterQuotes[displayedQuote][0]}</i> -{' '}
                  <b>{characterQuotes[displayedQuote][1]}</b>
                </animated.h4>

                <Box justifyContent="center" alignItems="center">
                  <QuoteButton
                    active={false}
                    disabled={displayedQuote <= 0 && true}
                    onClick={() => handleBtnQuotes(false)}
                  >
                    <LeftArrowAlt fontSize="default" />
                  </QuoteButton>
                  {characterQuotes.map((_, index) => {
                    const isActive = index === displayedQuote

                    return (
                      <QuoteButton
                        active={isActive}
                        key={index}
                        onClick={() => handleCircleBtnQuotes(index)}
                      >
                        <SquareRounded fontSize="default" />
                      </QuoteButton>
                    )
                  })}
                  <QuoteButton
                    active={false}
                    disabled={
                      displayedQuote >= characterQuotes.length - 1 && true
                    }
                    onClick={() => handleBtnQuotes(true)}
                  >
                    <RightArrowAlt fontSize="default" />
                  </QuoteButton>
                </Box>
              </Box>
            </BlueGradientContainer>
          </Box>

          <Box py={20}>
            <Box width="100%" textAlign="center">
              <Heading type="h1" position="relative">
                <span>bobo&apos;s evaluations</span>
                <JapaneseHeading positionX="0" positionY="25">
                  ボボ の 評価
                </JapaneseHeading>
              </Heading>
            </Box>

            <Box
              display="grid"
              gridTemplateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
              justifyItems="center"
              gridGap="3rem"
            >
              {Object.keys(evaluation).map((item, index) => {
                let changeOrder = false
                let padding = 8

                if (width > 600 && index % 2 !== 0) {
                  changeOrder = true
                }

                if (index === Object.keys(evaluation).length - 1) {
                  padding = 0
                }

                console.log(item)

                return (
                  <Box key={index}>
                    <div style={{ order: changeOrder ? 2 : 1 }}>
                      <h4>{item}</h4>
                      {printStars(item[1])}
                    </div>
                    <div style={{ order: changeOrder ? 1 : 2 }}>
                      <p>imagem</p>
                    </div>
                  </Box>
                )
              })}
            </Box>
          </Box>

          <Box py={20}>
            <Heading type="h1" textAlign="center" position="relative">
              <span>bobo&apos;s verdict</span>
              <JapaneseHeading>ボボ の 評決</JapaneseHeading>
            </Heading>
            <Box
              display="grid"
              gridTemplateColumns={['1fr', null, '1fr 1fr']}
              gridGap={4}
            >
              <h2 className="py-6">{rating.text}</h2>
              <Image
                layout="fill"
                alt="rating illustration"
                src="/assets/images/pikachu-test.png"
              />
            </Box>
          </Box>

          <Box py={20}>
            <Heading type="h2" textAlign="center" position="relative">
              <span>other humans opinion</span>
            </Heading>
            <Text fontSize="8px">
              in case you're not satisfied with mine...
            </Text>
            <Box>
              {reviews.edges.map((item, index) => (
                <Box key={index}>
                  <Text>{item.node.summary}</Text>
                  <Text textAlign="center">anon</Text>
                </Box>
              ))}
            </Box>
          </Box>

          <Box className="share-post">
            <Text>
              i guess that's it, if you kinda enjoyed the ride and want to let
              other humans feel the same you can use the buttons bellow of those
              social medias everyone knows{' '}
            </Text>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
            >
              <TwitterShareButton url="{}" title="" via="" hashtags={[]}>
                <Twitter size="2rem" />
              </TwitterShareButton>
              <FacebookShareButton url="{}" quote="" hashtag="">
                <FacebookCircle size="2rem" />
              </FacebookShareButton>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between">
            {previousMovie && (
              <Box
                display="flex"
                width={['100%', nextMovie ? 'auto' : '100%']}
                justifyContent={['center', 'flex-start']}
              >
                <NextPrevButton>
                  <Link href={`movies/${previousMovie}`}>
                    <a>
                      <LeftArrowAlt />
                      <span>Previous movie</span>
                    </a>
                  </Link>
                </NextPrevButton>
              </Box>
            )}

            {nextMovie && (
              <Box
                display="flex"
                width={['100%', previousMovie ? 'auto' : '100%']}
                justifyContent={['center', 'flex-end']}
              >
                <Link href={`movies/${nextMovie}`}>
                  <a>
                    <NextPrevButton>
                      <span className="mr-1">Next movie</span>
                      <RightArrowAlt fontSize="default" />
                    </NextPrevButton>
                  </a>
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
