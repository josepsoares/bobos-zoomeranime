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
import ImageTitle from '@components/layout/imageBoxTitle'
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

const printStars = (number: string) => {
  const stars = []
  const totalStars = 5
  const isNumInt = Number.isInteger(number)
  for (let i = 0; i < parseInt(number); i++) {
    stars.push(<Star />)
  }

  if (!isNumInt) {
    stars.push(<StarHalf />)
  }

  if (stars.length !== totalStars) {
    do {
      stars.push(<Star />)
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

const TvSeriePage: React.FC<{
  tvserie: MarkdownItem
  previousTvserie: MarkdownItem | null
  nextTvserie: MarkdownItem | null
}> = ({ tvserie, previousTvserie, nextTvserie }) => {
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

  const { content, preface, characterQuotes, evaluation, rating } = tvserie

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

  const { data, error } = useMedia(tvserie.title)

  const {
    title,
    genres,
    characters,
    bannerImage,
    startDate,
    duration,
    studios
  } = data.data.Media

  const getGenres = []

  genres.forEach((genre: string, index: number) => {
    if (index === genres.length - 1) {
      getGenres.push(genre.toLowerCase())
    } else {
      getGenres.push(genre.toLowerCase() + ', ')
    }
  })

  return !data ? (
    <Loading />
  ) : error ? (
    <Error error={error} />
  ) : (
    <>
      <Head>
        <title>{title} - bobo's zoomeranime</title>
        <meta
          name="description"
          content={`the tv series page of ${title} in the not incredible bobo's zoomeranime website about japanese animations`}
        />
      </Head>
      {width >= 600 ? (
        <ImageTitle>
          <img src={bannerImage} alt={title.romaji} title={title.romaji} />
          <h1>{title.romaji}</h1>
        </ImageTitle>
      ) : (
        <img
          className="img-fluid"
          src={bannerImage}
          alt={title.romaji}
          title={title.romaji}
        />
      )}

      <BlueGradientContainer>
        {width < 600 && <h1 className="mb-0 pt-0">{title.romaji}</h1>}
        <Box justifyContent="center" p={4}>
          <Box>
            <h4 className="text-center pt-4">{preface}</h4>

            <div className="pt-6">
              <div className="pb-2">
                <p>
                  At{' '}
                  <span>
                    {startDate.day}/{startDate.month}/{startDate.year}
                  </span>{' '}
                  the world could enjoy this entertainment piece.
                </p>
              </div>
              <div className="pb-2">
                <p>
                  about duration and time related things, well this a movie so
                  it&apos;s only one episode i guess and the lenght of it is
                  about <span>{duration}</span> minutes.
                </p>
              </div>

              <div className="pb-2">
                <p>
                  this stuff was produced, mainly, by{' '}
                  <span>{studios.edges[0].node.name}</span>.
                </p>
              </div>
              <div className="pb-2">
                <p>
                  to finish this off, let&apos;s talk about genres:{' '}
                  <span>{getGenres.map(item => item)}</span>.
                </p>
              </div>
              <p className="pb-4">
                of course, let&apos;s not forget about about the main
                characters! you&apos;ll be able to enjoy this media piece with
                following animated, two-dimensional fellows:
              </p>
              <Box display="grid" gridGap={1}>
                {characters.edges.map((char: Character, index: number) => (
                  <div
                    className="flex flex-row items-center p-0 border-2 border-pink-300"
                    key={index}
                  >
                    <img
                      className="mr-4 h-20 object-contain"
                      alt={char.node.name.first}
                      src={char.node.image.large}
                    />
                    <h5 className="mb-0 p-2">
                      {char.node.name?.first} <br /> {char.node.name?.last}
                    </h5>
                  </div>
                ))}
              </Box>
            </div>
          </Box>
        </Box>
      </BlueGradientContainer>

      <Box py={16}>
        <Box>
          <h1 className="secondaryTitle">
            bobo&apos;s rambling0s
            <JapaneseHeading>ボボ の 電波な奴</JapaneseHeading>
          </h1>
        </Box>
        <ReactMarkdown children={content} components={{ img: () => Image }} />
      </Box>

      <div
        ref={quotesContainerRef}
        style={expandQuotesContainer}
        className="w-full"
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
                disabled={displayedQuote >= characterQuotes.length - 1 && true}
                onClick={() => handleBtnQuotes(true)}
              >
                <RightArrowAlt fontSize="default" />
              </QuoteButton>
            </Box>
          </Box>
        </BlueGradientContainer>
      </div>

      <Box py="16">
        <h1 className="secondaryTitle">
          bobo&apos;s evaluations
          <JapaneseHeading>ボボ の 評価</JapaneseHeading>
        </h1>

        {Object.keys(evaluation).map((item, index) => {
          let changeOrder = false
          let padding = 8

          if (width > 600 && index % 2 !== 0) {
            changeOrder = true
          }

          if (index === Object.keys(evaluation).length - 1) {
            padding = 0
          }

          return (
            <Box key={index} pb={padding}>
              <div style={{ order: changeOrder ? 2 : 1 }}>
                <h4>{item[0]}</h4>
                {printStars(item[1])}
                <p>{item[2]}</p>
              </div>
              <div style={{ order: changeOrder ? 1 : 2 }}>
                <p>imagem</p>
              </div>
            </Box>
          )
        })}
      </Box>

      <BlueGradientContainer>
        <h1 className="secondaryTitle">
          bobo&apos;s verdict
          <JapaneseHeading>ボボ の 評決</JapaneseHeading>
        </h1>
        <h2 className="py-6">{rating.text}</h2>
        <Image
          layout="fill"
          alt="rating illustration"
          src="/assets/images/pikachu-test.png"
        />
        {/* Vai ter aqui uma imagem acerca com uma avaliação final <img /> */}
      </BlueGradientContainer>

      <div className="share-post">
        <TwitterShareButton url="{}" title="" via="" hashtags={[]}>
          <Twitter />
        </TwitterShareButton>
        <FacebookShareButton url="{}" quote="" hashtag="">
          <FacebookCircle />
        </FacebookShareButton>
      </div>

      <Box display="flex" justifyContent="space-between">
        {previousTvserie && (
          <Box
            display="flex"
            width={['100%', nextTvserie ? 'auto' : '100%']}
            justifyContent={['center', 'flex-start']}
          >
            <NextPrevButton>
              <Link href={`movies/${previousTvserie}`}>
                <a>
                  <LeftArrowAlt />
                  <span>Previous tv series</span>
                </a>
              </Link>
            </NextPrevButton>
          </Box>
        )}

        {nextTvserie && (
          <Box
            display="flex"
            width={['100%', previousTvserie ? 'auto' : '100%']}
            justifyContent={['center', 'flex-end']}
          >
            <Link href={`movies/${nextTvserie}`}>
              <a>
                <NextPrevButton>
                  <span className="mr-1">Next tv series</span>
                  <RightArrowAlt fontSize="default" />
                </NextPrevButton>
              </a>
            </Link>
          </Box>
        )}
      </Box>
    </>
  )
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

export const getStaticProps: GetStaticProps = async ({
  params: { tvserie }
}) => {
  const currentMovieDirectory = path.join(
    'src/content/tv-series',
    `${tvserie}.md`
  )
  const contents = fs.readFileSync(currentMovieDirectory, 'utf8')
  const parsedContents = matter(contents)
  delete parsedContents.orig

  const moviesDirectory = path.join(process.cwd(), 'src/content/tv-series')
  const fileNames = fs.readdirSync(moviesDirectory)

  const allTvseries = fileNames
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

  const tvserieIndex = allTvseries.findIndex(item => item.id === tvserie)

  const subtract = (a: number, b: number) => a - b
  const add = (a: number, b: number) => a - b

  const previousTvserie =
    tvserieIndex > 0 ? allTvseries[add(tvserieIndex, 1)] : null

  const nextTvserie =
    tvserieIndex < allTvseries.length
      ? allTvseries[subtract(tvserieIndex, 1)]
      : null

  return {
    props: {
      tvserie: { ...parsedContents },
      previousTvserie,
      nextTvserie
    }
  }
}

export default TvSeriePage
