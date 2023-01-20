import { styled } from '@stitches/react'
import { animated } from '@react-spring/web'

// TODO - flex, grid variant
const Box = styled(animated.div, {
  boxSizing: 'border-box',
  minWidth: '0',

  variants: {}
})

export default Box
