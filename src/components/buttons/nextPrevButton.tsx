import { styled } from '@stitches/react'

const NextPrevButton = styled('button', {
  borderBottom: '2px solid',
  borderColor: '$lightPurple',
  color: '$lightBlue',
  transition: '$normal',
  padding: '$2',

  span: {
    transition: '$normal'
  },

  '&:hover, &:active': {
    backgroundColor: '$darkBlue',
    color: '$lightPurple'
  }
})

export default NextPrevButton
