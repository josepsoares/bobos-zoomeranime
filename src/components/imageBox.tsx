import { styled } from '@stitches/react'

const ImageBoxEl = styled('div', {
  $$h: '45vh',
  position: 'relative',
  padding: 0,
  opacity: 1,
  width: '100%',
  height: '$$h',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  boxShadow: '$black',

  '&:before': {
    zIndex: 0,
    position: 'absolute',
    content: '',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0.85,
    transition: '$normal',
    backgroundImage: '$blueGradient'
  },

  '&:hover:before, &:active:before, &:hover > aside, &:active > aside': {
    opacity: 0
  },

  '& > aside': {
    zIndex: 3,
    opacity: 0.85,
    height: '$$h',
    width: '100%',
    margin: 0,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    letterSpacing: '0.1em',
    textAlign: 'center',
    transition: '$normal',

    h4: {
      margin: 0,
      padding: '1rem',
      maxWidth: '70%',
      border: '3px solid',
      borderColor: '$lightPurple',
      color: '#fff'
    },

    h5: {
      margin: 0,
      maxWidth: '70%',
      wordBreak: 'break-word',
      opacity: '0.25',
      color: '$lightBlue',
      fontWeight: 'normal',
      position: 'absolute',
      fontSize: '$xl4',
      transform: 'translate(0%, 8%)'
    }
  }
})

const ImageBox: React.FC<{
  h: string
  image: string
  title: string
  nativeTitle: string
}> = ({ h, image, title, nativeTitle }) => {
  return (
    <ImageBoxEl
      css={{
        h,
        backgroundImage: `url(${image})`
      }}
    >
      <aside>
        <h4>{title}</h4>
        <h5>{nativeTitle}</h5>
      </aside>
    </ImageBoxEl>
  )
}

export default ImageBox
