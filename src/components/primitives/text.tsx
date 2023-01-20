import { animated } from '@react-spring/web'
import { styled } from '@stitches/react'

const Text = styled(animated.p, {
  fontFamily: '$openSans',

  variants: {
    size: {
      1: {
        fontSize: '$1'
      },
      2: {
        fontSize: '$2'
      },
      3: {
        fontSize: '$3'
      }
    },
    weight: {
      light: {
        fontWeight: 'lighter'
      },
      normal: {
        fontWeight: 'normal'
      },
      bold: {
        fontWeight: 'bold'
      }
    }
  }
})

export default Text
