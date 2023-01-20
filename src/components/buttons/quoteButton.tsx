import { styled } from '@stitches/react'

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

export default QuoteButton
