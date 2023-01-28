import { styled } from '@styles/stitches.config'
import { motion } from 'framer-motion'

const Text = styled(motion.p, {
  fontFamily: '$openSans',

  variants: {
    size: {
      xs: {
        fontSize: '$xs'
      },
      sm: {
        fontSize: '$sm'
      },
      md: {
        fontSize: '$md'
      },
      lg: {
        fontSize: '$lg'
      },
      xl: {
        fontSize: '$xl'
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
    },
    align: {
      center: {
        textAlign: 'center'
      },
      left: {
        textAlign: 'left'
      },
      right: {
        textAlign: 'right'
      }
    }
  },
  defaultVariants: {
    align: 'left'
  }
})

export default Text
