import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-size: 1em;
    font-family: ${({ theme }) => theme.fonts.openSans};
    background-color: ${({ theme }) => theme.colors.black};
    color: ${({ theme }) => theme.colors.white};
    @media ${({ theme }) => theme.breakpoints[2]} {
      font-size: 1.125em;
    }
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    letter-spacing: 0.075em;
    font-family: ${({ theme }) => theme.fonts.cabin};
    color: ${({ theme }) => theme.colors.lightBlue};
  }
  
  h1 {
    text-align: center;
    font-size: 1.75em;
    padding-bottom: ${({ theme }) => theme.spacing[4]};
    border-bottom: 8px solid ${({ theme }) => theme.colors.lightPurple};
    display: inline-block;
    
    &::selection {
      background: ${({ theme }) => theme.colors.lightBlue};
      color: ${({ theme }) => theme.colors.darkBlue};
    }

    @media ${({ theme }) => theme.breakpoints[2]} {
      font-size: 2em;
    }
  }

  h2 {
    font-size: 1.5em;
    padding-bottom: ${({ theme }) => theme.spacing[2]};
  }

  h3 {
    font-size: 1.4em;
    padding-bottom: ${({ theme }) => theme.spacing[2]};
    border-bottom: 5px solid ${({ theme }) => theme.colors.lightPurple};
    @media ${({ theme }) => theme.breakpoints[2]} {
      font-size: 1.6rem;
    }
  }
  
  h4 {
    font-size: 1.3em;
  }
  
  p {
    margin-bottom: 0;
    padding: 0.2rem 0 0.8rem 0;
    font-weight: 400;
    letter-spacing: 0.03em;
    line-height: 1.25em;

    &::selection {
      background: ${({ theme }) => theme.colors.lightBlue};
      color: ${({ theme }) => theme.colors.darkBlue};
    }

    @media ${({ theme }) => theme.breakpoints[2]} {
      padding: 0;
    }
  }

  button:focus {
    outline: none;
  }
    
  button::-moz-focus-inner {
    border: 0;
  }

  button {
    background-color: transparent;
    outline: none;
    border: none;
  }

  a {
    text-decoration: none;

    &:visited {
      color: inherit;
    }
    
    &:hover,
    &:active {
      text-decoration: none;
    }
  }
`

export default GlobalStyles
