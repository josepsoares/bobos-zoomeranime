import styled from 'styled-components'

const JapaneseHeading = styled.span<{
  positionX?: string
  positionY?: string
  setColor?: string
}>`
  word-break: keep-all;
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  color: ${props =>
    props.theme.colors[props.color] || props.theme.colors.mediumBlue};
  left: ${props => props.positionX || 40}%;
  top: ${props => props.positionY || -10}%;
  opacity: 0.3;
  z-index: -1;
`

export default JapaneseHeading
