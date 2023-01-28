import { styled } from '@styles/stitches.config'
import { motion } from 'framer-motion'

// TODO - flex, grid variant
const Box = styled(motion.div, {
  boxSizing: 'border-box',
  minWidth: '0',

  variants: {
    container: {
      true: {
        margin: '0 auto',
        width: '85%',
        '@bp2': {
          width: '83%'
        },
        '@bp4': {
          width: '65%'
        }
      }
    }
  }
})

export default Box
