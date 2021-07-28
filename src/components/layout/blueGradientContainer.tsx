import styled from 'styled-components'
import { animated } from 'react-spring'

const BlueGradientContainer = styled(animated.div)`
  padding: 1.85rem 0;
  width: 100%;
  margin-bottom: 2rem;
  background-image: ${({ theme }) => theme.colors.blueGradient};
  box-shadow: ${({ theme }) => theme.shadows.black};

  & h1 {
    color: ${({ theme }) => theme.colors.white};
    border: 0;
    font-weight: bold;
    text-align: center;
    width: 100%;
  }

  & h2 {
    color: ${({ theme }) => theme.colors.lightPurple};
  }

  & h4 {
    color: ${({ theme }) => theme.colors.white};
  }
`

export default BlueGradientContainer
