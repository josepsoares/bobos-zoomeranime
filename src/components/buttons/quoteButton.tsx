import styled from 'styled-components'

const QuoteButton = styled.button<{ active: boolean | null }>`
  color: ${props =>
    props.active
      ? props.theme.colors.lightBlue
      : props.theme.colors.lightPurple};
  background-color: ${props =>
    props.active ? 'rgba(199, 155, 178, 0.25)' : 'transparent'};
  transition: ${props => props.theme.transitions.normal};
  border: 0;
  padding: ${props => props.theme.spacing.half};
  margin: 0 ${props => props.theme.spacing.quarter};

  &:hover,
  &:active {
    background-color: rgba(88, 111, 124, 0.25);
  }

  &:disabled {
    opacity: 0.3;

    &:hover,
    &:active {
      background-color: transparent !important;
    }
  }

  svg {
    display: flex;
    align-items: center;
  }
`

export default QuoteButton
