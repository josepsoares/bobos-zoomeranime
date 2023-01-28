import { animated } from '@react-spring/web'
import { styled } from '@styles/stitches.config'

const BlueGradientContainer = styled(animated.div, {
  padding: '1.85rem 0',
  width: '100%',
  mb: '2rem',
  backgroundImage: '$blueGradient',
  boxShadow: '$black',

  '& h1': {
    color: '#fff',
    border: 0,
    fontWeight: 'bold',
    textAlign: 'center',
    width: '100%'
  },

  '& h2': {
    color: '$lightPurple'
  },

  '& h4': {
    color: '#fff'
  }
})

export default BlueGradientContainer
