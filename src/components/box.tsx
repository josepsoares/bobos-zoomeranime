import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  background,
  BackgroundProps,
  shadow,
  ShadowProps,
  position,
  PositionProps,
  border,
  BorderProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps
} from 'styled-system'

interface Props
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    BackgroundProps,
    ShadowProps,
    PositionProps,
    BorderProps,
    FlexboxProps,
    GridProps {
  children: React.ReactNode
}

const Box = styled(motion.div)<Props>`
  box-sizing: 'border-box';
  min-width: 0;
  ${space};
  ${layout};
  ${typography};
  ${background};
  ${shadow};
  ${position};
  ${border};
  ${flexbox};
  ${grid};
`

export default Box
