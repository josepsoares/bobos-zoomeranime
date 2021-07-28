import { motion } from 'framer-motion'
import styled from 'styled-components'
import {
  space,
  SpaceProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  color,
  ColorProps,
  position,
  PositionProps
} from 'styled-system'

interface Props
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    ColorProps,
    PositionProps {
  children: React.ReactNode
}

const Text = styled(motion.p)<Props>`
  ${space};
  ${layout};
  ${typography};
  ${color};
  ${position};
`

export default Text
