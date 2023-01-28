import { useEffect, useState } from 'react'
import { useMeasure } from 'react-use'
import { styled } from '@styles/stitches.config'

import Box from '@components/primitives/box'
import Heading from '@components/primitives/heading'
import Text from '@components/primitives/text'
import BlueGradientContainer from '@components/cardWithBlueGradient'

// icons
import SquareRounded from '@icons/bxs-square-rounded.svg'
import RightArrow from '@icons/bx-right-arrow-alt.svg'
import LeftArrow from '@icons/bx-left-arrow-alt.svg'

// types
import type { NextComponentType, NextPageContext } from 'next'

interface Props {
  data: [string, string][]
}

const QuoteButton = styled('button', {
  color: '$lightPurple',
  backgroundCcolor: 'transparent',
  transition: '$normal',
  border: 0,
  padding: '$2',
  margin: '0 $4',

  '&:hover, &:active': {
    backgroundColor: 'rgba(88, 111, 124, 0.25)'
  },

  '&:disabled': {
    opacity: 0.3,

    '&:hover, &:active': {
      backgroundColor: 'transparent'
    }
  },

  svg: {
    display: 'flex',
    alignItems: 'center'
  },

  variants: {
    active: {
      true: {
        color: '$lightBlue',
        backgroundColor: 'rgba(199, 155, 178, 0.25)'
      }
    }
  }
})

const Quotes: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  const [quoteState, setQuoteState] = useState({
    displayedQuote: 0,
    toggle: false
  })
  const { displayedQuote } = quoteState
  const [contentHeight, setContentHeight] = useState(100)
  const [quotesContainerRef, { height }] = useMeasure()

  useEffect(() => {
    const heightRef = Math.floor(height)
    setContentHeight(heightRef)

    window.addEventListener('resize', () => setContentHeight(heightRef))
    return window.removeEventListener('resize', () =>
      setContentHeight(heightRef)
    )
  }, [height])

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

  return (
    <Box ref={quotesContainerRef} css={{ width: '100%', py: '$20', px: '$4' }}>
      <BlueGradientContainer>
        <Heading as="h2" align="center" css={{ width: '100%' }}>
          fancy quotes proclaimed in this piece
        </Heading>

        <Box css={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text css={{ pb: '$3', px: '$2' }}>
            <i>{props.data[displayedQuote][0]}</i> -{' '}
            <b>{props.data[displayedQuote][1]}</b>
          </Text>

          <Box css={{ justifyContent: 'center', alignItems: 'center' }}>
            <QuoteButton
              active={false}
              disabled={displayedQuote <= 0 && true}
              onClick={() => handleBtnQuotes(false)}
            >
              <LeftArrow fontSize="default" />
            </QuoteButton>
            {props.data.map((_, index) => {
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
              disabled={displayedQuote >= props.data.length - 1 && true}
              onClick={() => handleBtnQuotes(true)}
            >
              <RightArrow fontSize="default" />
            </QuoteButton>
          </Box>
        </Box>
      </BlueGradientContainer>
    </Box>
  )
}

export default Quotes
