import { styled } from '@stitches/react'

const Button = styled('button', {
  borderBottom: '2px solid',
  borderColor: '$lighPurple',
  color: '$lightBlue',
  transition: '$normal',
  padding: '$1',
  span: {
    transition: '$normal'
  },
  '&:hover, &:active': {
    backgroundColor: '$darkBlue',
    color: '$lightPurple'
  }
})

export default Button
