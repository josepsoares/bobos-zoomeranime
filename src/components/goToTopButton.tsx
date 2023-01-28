import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { styled } from '@styles/stitches.config'

import UpArrow from '@icons/bx-up-arrow.svg'

const GoTopButtonEl = styled('button', {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  border: '2px solid',
  borderColor: '$lightPurple',
  backgroundColor: '$black',
  zIndex: 3,
  position: 'fixed',
  left: '82.5%',
  top: '90%',
  transition: '$normal',
  boxShadow: '$black',

  svg: {
    transition: '$normal',
    fill: '$lightBlue'
  },

  '&:hover, &:active': {
    backgroundColor: '$darkBlue',
    boxShadow: '$lightPurple',

    '& > svg': {
      fill: '$lightPurple'
    }
  },

  '@bp1': {
    left: '88%'
  },
  '@bp2': {
    left: '92.5%'
  },
  '@bp3': {
    left: '94%',
    top: '90%'
  },

  variants: {
    hidden: {
      true: {
        opacity: 0
      },
      false: {
        opacity: 1
      }
    }
  }
})

const GoTopButton: React.FC = () => {
  const [threshold, setThreshold] = useState(false)

  useEffect(() => {
    window.addEventListener('scroll', () =>
      setThreshold(window.scrollY >= 650 ? true : false)
    )

    return () => {
      window.removeEventListener('scroll', () =>
        setThreshold(window.scrollY >= 650 ? true : false)
      )
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  return (
    <GoTopButtonEl
      disabled={!threshold}
      hidden={!threshold}
      onClick={() => threshold && scrollToTop()}
    >
      <UpArrow />
    </GoTopButtonEl>
  )
}

export default GoTopButton
