import styled from 'styled-components'

const Button = styled.button`
  border-bottom: 2px solid ${({ theme }) => theme.colors.lightPurple};
  color: ${({ theme }) => theme.colors.lightBlue};
  transition: ${({ theme }) => theme.transitions.normal};
  padding: ${({ theme }) => theme.spacing.half};

  span {
    transition: ${({ theme }) => theme.transitions.normal};
  }

  &:hover,
  &:active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    color: ${({ theme }) => theme.colors.lightPurple};
  }
`

export default Button
