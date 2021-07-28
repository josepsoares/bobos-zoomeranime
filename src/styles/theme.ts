const breakpoints = ['600px', '900px', '1280px', '1920px']
const spacingValues = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  40: '10rem',
  44: '11rem',
  48: '12rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  64: '16rem',
  72: '18rem',
  80: '20rem',
  96: '24rem'
}

const theme = {
  colors: {
    white: '#f4f4f9',
    black: '#191919',
    lightBlue: '#b8dbd9',
    mediumBlue: '#afdbd2',
    darkBlue: '#2f4550',
    lightPurple: '#c79bb2',
    darkPurple: '#5f3766',
    blueGradient: 'linear-gradient(60deg, #29323c 0%, #485563 100%)'
  },
  fonts: {
    cabin: '"Cabin", sans-serif',
    openSans: '"Open Sans", sans-serif'
  },
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem'
  },
  breakpoints: breakpoints,
  mediaQueries: {
    sm: `@media screen and (min-width: ${breakpoints[0]})`,
    md: `@media screen and (min-width: ${breakpoints[1]})`,
    lg: `@media screen and (min-width: ${breakpoints[2]})`,
    xl: `@media screen and (min-width: ${breakpoints[3]})`
  },
  sizes: {
    ...spacingValues,
    max: 'max-content',
    min: 'min-content',
    full: '100%',
    '3xs': '14rem',
    '2xs': '16rem',
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    '8xl': '90rem'
  },
  spacing: spacingValues,
  transitions: {
    fast: 'all 0.3s ease-in-out',
    normal: 'all 0.5s ease-in-out'
  },
  shadows: {
    black:
      '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    lightBlue:
      '0 1px 1px rgba(88, 111, 124, 0.05), 0 2px 2px rgba(88, 111, 124, 0.05), 0 4px 4px rgba(88, 111, 124, 0.05), 0 6px 8px rgba(88, 111, 124, 0.05), 0 8px 16px rgba(88, 111, 124, 0.05)',
    lightPurple:
      '0 1px 1px rgba(199, 155, 178, 0.05), 0 2px 2px rgba(199, 155, 178, 0.05), 0 4px 4px rgba(199, 155, 178, 0.05), 0 6px 8px rgba(199, 155, 178, 0.05), 0 8px 16px rgba(199, 155, 178, 0.05)'
  }
}

export default theme
