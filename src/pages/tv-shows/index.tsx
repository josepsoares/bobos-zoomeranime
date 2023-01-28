import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import * as Select from '@radix-ui/react-select'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'

// components
import Box from '@components/primitives/box'
import Text from '@components/primitives/text'
import Heading from '@components/primitives/heading'
import ImageBox from '@components/imageBox'
import JapaneseHeading from '@components/japaneseHeading'
import BoxWithBgGradient from '@components/boxWithBgGradient'
import SEO from '@components/seo'
import {
  SelectContent,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectViewport
} from '@components/select'

// icons
import ChevronDownIcon from '@icons/bx-chevron-down.svg'
import ChevronUpIcon from '@icons/bx-chevron-up.svg'
import CheckIcon from '@icons/bx-check.svg'

// utils
import { add } from '@utils/math'
import { dateFormat } from '@utils/constants'

// types
import type { GetStaticProps, NextPage } from 'next'
import type IContent from '@utils/ts/IContent'

// set customParseFormat plugin
dayjs.extend(customParseFormat)

const filterObj = {
  'name-asc': 'Nome ▴',
  'name-desc': 'Nome ▾',
  'date-asc': 'Data ▴',
  'date-desc': 'Data ▾'
}

interface IState {
  page: number
  perPage: number
  allTvShows: IContent[]
  displayedTvShows: IContent[] | []
  filter: { value: string; label: string }
  filterOrder: { value: string; label: string }
}

const TvShowsList: NextPage<{ tvShows: IContent[]; maxPage: number }> = ({
  tvShows,
  maxPage
}) => {
  const tvShowsPerPage = 8

  // state
  const [intersectionRef, setIntersectionRef] = useState(null)
  const [didIntersect, setDidIntersect] = useState(false)
  const [displayedTvShows, setDisplayedTvShows] = useState<IContent[]>([])
  const [pageNum, setPageNum] = useState(1)
  const [filter, setFilter] = useState('name-asc')

  // refs
  const [parent] = useAutoAnimate()
  const observerEl = useRef(null)
  const observer = useRef(
    typeof window !== 'undefined'
      ? new IntersectionObserver(entries => {
          const el = entries[entries.length - 1]
          setDidIntersect(el.isIntersecting)
        })
      : null
  )

  /**
   * util func to calculate and return the items of the movie list
   * according to the page number
   */
  const calculatePage = (caculateResults: IContent[], index: number) => {
    const indexOfLastResults = index * tvShowsPerPage
    const indexOfFirstResults = indexOfLastResults - tvShowsPerPage
    const currentResults = caculateResults.slice(
      indexOfFirstResults,
      indexOfLastResults
    )
    return currentResults
  }

  /**
   * func to reorder the displayed iteems arrray according to the
   * value chosen in the select by the user
   */
  const reorderDisplayedTvShows = (order: string) => {
    const updateDisplayedTvShows = displayedTvShows.sort((a, b) => {
      if (order === 'name-asc') {
        return a.title < b.title ? -1 : 1
      } else if (order === 'name-desc') {
        return a.title > b.title ? -1 : 1
      } else if (order === 'date-asc') {
        return dayjs(a.releaseDate, dateFormat).isAfter(
          dayjs(b.releaseDate, dateFormat)
        )
          ? 1
          : -1
      } else if (order === 'date-desc') {
        return dayjs(a.releaseDate, dateFormat).isBefore(
          dayjs(b.releaseDate, dateFormat)
        )
          ? 1
          : -1
      }
    })

    setDisplayedTvShows(updateDisplayedTvShows)
  }

  /**
   * set displayed movies onmount
   */
  useEffect(() => {
    setDisplayedTvShows(calculatePage(tvShows, 1))
  }, [])

  /**
   * start observing the intersectionRef when its possible
   * the ref starts as null so we need to wait a bit
   */
  useEffect(() => {
    if (intersectionRef) {
      observer?.current.observe(intersectionRef)
    }

    return () => {
      if (intersectionRef) {
        observer?.current.unobserve(intersectionRef)
      }
    }
  }, [intersectionRef])

  /**
   * check the didIntersect state that is changing
   * if so we add 1 to the pageNum and check if it's less or equal tha maxPage
   */
  useEffect(() => {
    if (didIntersect) {
      const updatedPageNum = add(pageNum, 1)
      if (updatedPageNum <= maxPage) {
        setDisplayedTvShows(
          displayedTvShows.concat(calculatePage(tvShows, updatedPageNum))
        )
        setPageNum(updatedPageNum)
      } else {
        observer?.current.unobserve(intersectionRef)
      }
    }
  }, [didIntersect])

  return (
    <>
      <SEO
        title="tv shows"
        description="bobo's list of favourite zoomer japanese movie animations"
      />

      <BoxWithBgGradient img="/assets/images/movie-theatre.jpg">
        <Heading as="h1" align="center">
          <span>tv shows</span>
          <JapaneseHeading>テレビ番組</JapaneseHeading>
        </Heading>

        <Text align="center" css={{ pb: '$6' }}>
          "Lorem ipsum dolor sit amet,
        </Text>
      </BoxWithBgGradient>

      <Box container ref={observerEl}>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            pb: '$6'
          }}
        >
          <Text size="sm" css={{ pb: '$2' }}>
            Ordenar por:
          </Text>
          <Select.Root
            value={filter}
            onValueChange={val => {
              setFilter(val)
              reorderDisplayedTvShows(val)
            }}
          >
            <SelectTrigger aria-label="Food">
              <Select.Value aria-label={filter}>
                {filterObj[filter]}
              </Select.Value>
              <SelectIcon>
                <ChevronDownIcon />
              </SelectIcon>
            </SelectTrigger>
            <Select.Portal>
              <SelectContent>
                <Select.ScrollUpButton className="select-scroll-btn">
                  <ChevronUpIcon />
                </Select.ScrollUpButton>
                <SelectViewport>
                  <Select.Group>
                    <SelectLabel>Nome</SelectLabel>
                    <SelectItem value="name-asc">
                      <Select.ItemText>Ascendente ▴</Select.ItemText>
                      <SelectItemIndicator>
                        <CheckIcon />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem value="name-desc">
                      <Select.ItemText>Descendente ▾</Select.ItemText>
                      <SelectItemIndicator>
                        <CheckIcon />
                      </SelectItemIndicator>
                    </SelectItem>
                  </Select.Group>

                  <SelectSeparator />

                  <Select.Group>
                    <SelectLabel>Data de Lançamento</SelectLabel>
                    <SelectItem value="date-asc">
                      <Select.ItemText>Ascendente ▴</Select.ItemText>
                      <SelectItemIndicator>
                        <CheckIcon />
                      </SelectItemIndicator>
                    </SelectItem>
                    <SelectItem value="date-desc">
                      <Select.ItemText>Descendente ▾</Select.ItemText>
                      <SelectItemIndicator>
                        <CheckIcon />
                      </SelectItemIndicator>
                    </SelectItem>
                  </Select.Group>
                </SelectViewport>
                <Select.ScrollDownButton className="select-scroll-btn">
                  <ChevronDownIcon />
                </Select.ScrollDownButton>
              </SelectContent>
            </Select.Portal>
          </Select.Root>
        </Box>
        <Box
          ref={parent}
          css={{
            display: 'grid',
            gridGap: '$5',
            '@bp1': { gridTemplateColumns: '1fr' },
            '@bp2': { gridTemplateColumns: '1fr 1fr' },
            '@bp3': { gridTemplateColumns: 'repeat(4, 1fr)' }
          }}
        >
          {displayedTvShows.map((item: IContent, index: number) => (
            <Link
              key={index}
              href={`tv-shows/${item.id}`}
              ref={
                index === displayedTvShows.length - 1 && pageNum <= maxPage
                  ? setIntersectionRef
                  : null
              }
            >
              <ImageBox
                h="50vh"
                image={item.coverImage}
                title={item.title}
                nativeTitle={item.nativeTitle}
              />
            </Link>
          ))}
        </Box>
      </Box>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const perPage = 10
  const tvShowsDirectory = path.join(process.cwd(), 'src/content/tv-shows')
  const fileNames = fs.readdirSync(tvShowsDirectory)
  const totalTvShows = fileNames.length

  const allTvShowsData: IContent[] = fileNames.map(fileName => {
    const id = fileName.replace(/\.md$/, '')

    const fullPath = path.join(tvShowsDirectory, fileName)
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
      tvShows: allTvShowsData.sort((a, b) => (a.title < b.title ? -1 : 1)),
      maxPage: Math.ceil(totalTvShows / perPage)
    }
  }
}

export default TvShowsList
