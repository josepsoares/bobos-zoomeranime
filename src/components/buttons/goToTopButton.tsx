import React, { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import { styled } from '@stitches/react'

import UpArrow from 'assets/icons/bx-up-arrow.svg'

const GoTopButtonEl = styled('button', {
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '48px',
  height: '48px',
  border: '2px solid',
  borderColor: '$lightPurple',
  backgroundColor: '$black',
  zIndex: 3,
  position: 'fixed',
  left: '82.5%',
  top: '90%',
  borderRadius: '50%',
  transition: '$normal',
  boxShadow: '$black',

  svg: {
    transition: '$normal',
    color: '$darkBlue'
  },

  '&:hover, &:active': {
    backgroundColor: '$darkBlue',
    boxShadow: '$lightPurple',

    svg: {
      color: '$lightBlue'
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
  const { width } = useWindowSize()

  useEffect(() => {
    window.addEventListener('scroll', () =>
      setThreshold(() => (width >= 650 ? true : false))
    )

    return () => {
      window.removeEventListener('scroll', () =>
        setThreshold(() => (width >= 650 ? true : false))
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
