import { styled } from '@styles/stitches.config'

const FooterEl = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
  textAlign: 'center',
  width: '100%',
  mt: '1.5rem',
  padding: '2.25rem 0',

  '& > p': {
    color: '$gray900',
    fontSize: '$xs'
  },

  '& a': {
    textDecoration: 'underline'
  }
})

const Footer: React.FC = () => {
  return (
    <FooterEl>
      <p>
        bobo's zoomeranime {new Date().getFullYear()} -{' '}
        <a rel="noreferrer" target="_blank" href="https://josepsoares.now.sh/">
          josepsoares
        </a>
      </p>
    </FooterEl>
  )
}

export default Footer
