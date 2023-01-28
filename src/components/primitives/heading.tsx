import { styled } from '@styles/stitches.config'
import { motion } from 'framer-motion'

const Heading = styled(motion.p, {
  fontFamily: '$cabin',
  position: 'relative',

  variants: {
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

export default Heading
