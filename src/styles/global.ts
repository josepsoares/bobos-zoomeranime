import { globalCss } from '@styles/stitches.config'

const globalStyles = globalCss({
  body: {
    margin: 0,
    fontSize: '1em',
    fontFamily: '$openSans',
    backgroundColor: '$slate',
    color: '$lightGrey',

    '@bp2': {
      fontSize: '1.125em'
    }
  },

  'h1, h2, h3, h4, h5, h6': {
    letterSpacing: '0.075em',
    fontFamily: '$cabin',
    color: '$lightBlue'
  },

  h1: {
    textAlign: 'center',
    fontSize: '1.75em',
    paddingBottom: '$4',
    borderBottom: '8px solid',
    borderColor: '$lightPurple',
    display: 'inline-block',

    '&::selection': {
      background: '$lightBlue',
      color: '$darkBlue'
    },

    '@bp2': {
      fontSize: '2em'
    }
  },

  h2: {
    fontSize: '1.5em',
    paddingBottom: '$2'
  },

  h3: {
    fontSize: '1.4em',
    paddingBottom: '$2',
    borderBottom: '5px solid',
    borderColor: '$lightPurple',

    '@bp2': {
      fontSize: '1.6em'
    }
  },

  h4: {
    fontSize: '1.3em'
  },

  p: {
    mb: 0,
    padding: '0.2rem 0 0.8rem 0',
    fontWeight: 400,
    letterSpacing: '0.03em',
    lineHeight: '1.25em',

    '&::selection': {
      background: '$lightBlue',
      color: '$darkBlue'
    },

    '@bp2': {
      padding: 0
    }
  },

  'button:focus': {
    outline: 'none'
  },

  'button::-moz-focus-inner': {
    border: 0
  },

  button: {
    backgroundColor: 'transparent',
    outline: 'none',
    border: 'none'
  },

  a: {
    textDecoration: 'none',

    '&:visited': {
      color: 'inherit'
    },

    '&:hover, &:active': {
      textDecoration: 'none'
    }
  },

  'select-scroll-btn': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '25px',
    backgroundColor: 'white',
    color: '$lightPurple',
    cursor: 'default'
  }
})

export default globalStyles
