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
  type: React.ElementType
}

interface HeadingProps
  extends SpaceProps,
    LayoutProps,
    TypographyProps,
    ColorProps,
    PositionProps {}

const HeadingEl = styled.div<HeadingProps>`
  ${space};
  ${layout};
  ${typography};
  ${color};
  ${position};
`

const Heading: React.FunctionComponent<Props> = ({
  children,
  type,
  ...restProps
}: Props) => {
  return (
    <HeadingEl {...restProps} as={type}>
      {children}
    </HeadingEl>
  )
}

export default Heading
