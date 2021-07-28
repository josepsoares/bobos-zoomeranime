import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Box from '@components/box'

const BlurredImage = styled.img<{ opac: number }>`
  position: absolute;
  opacity: ${props => props.opac};
  display: ${props => (props.opac === 1 ? 'block' : 'none')};
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: auto;
  transition: all 500ms ease-in;
  object-fit: contain;
  filter: blur(10px);
`

const FullImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
`

const Image: React.FC<{
  alt: string
  src: string
  width?: number
  height?: number
}> = ({ alt, src }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [opacity, setOpacity] = useState(1)
  // const imgRef = useRef(null)

  useEffect(() => {
    imageLoaded && setOpacity(0)
  }, [imageLoaded])

  return (
    <Box position="relative">
      <BlurredImage
        src={require(`../assets/img/${src}?lqip`)}
        opac={opacity}
        alt={alt}
      />
      <FullImage
        ref={ref => {
          if (!ref) {
            return
          }

          ref.onload = () => setImageLoaded(true)
          if (ref.complete) {
            setImageLoaded(true)
          }
        }}
        src={require(`../assets/img/${src}`)}
        alt={alt}
      />
    </Box>
  )
}

export default Image
