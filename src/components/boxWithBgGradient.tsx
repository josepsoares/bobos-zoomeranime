import type { FC, ReactNode } from 'react'
import { styled } from '@styles/stitches.config'

const BoxGradientBgEl = styled('div', {
  marginBottom: '$6',
  paddingTop: '17.5rem',
  paddingBottom: '15rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  opacity: 1,
  zIndex: -1,
  width: '100%',

  '&::before': {
    filter: 'grayscale(100%)',
    opacity: 0.3,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    content: '',
    top: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
})

interface Props {
  img: string
  children?: ReactNode
}

const BoxGradientBg: FC<Props> = props => {
  return (
    <BoxGradientBgEl
      css={{
        '&::before': {
          backgroundImage: `linear-gradient(to bottom, rgba(255, 192, 203, 0.4) 0%, rgba(255, 192, 203, 0.2) 30%, #1919197d 80%, #191919 90%), url(${props.img})`
        }
      }}
    >
      {props.children}
    </BoxGradientBgEl>
  )
}

export default BoxGradientBg
