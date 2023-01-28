import { styled } from '@styles/stitches.config'

const ImageTitle = styled('div', {
  position: 'relative',
  textAlign: 'center',

  '& > img': {
    opacity: 0.5,
    width: '100%',
    height: 'auto'
  },

  '& > h1': {
    padding: '$1',
    border: '4px solid',
    borderColor: '$lightPurple',
    color: '#fff',
    backgroundColor: ' rgba(88, 111, 124, 0.4)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
})

export default ImageTitle
