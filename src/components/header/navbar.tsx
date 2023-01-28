import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '@styles/stitches.config'

import Box from '@components/primitives/box'
import NavLink from '@components/header/navLink'
import JapaneseHeading from '@components/japaneseHeading'

// icons
import Movie from '@icons/bxs-movie.svg'
import Tv from '@icons/bx-tv.svg'

const Nav = styled('nav', {
  width: '100%',
  left: 0,

  '&::before': {
    width: '100%',
    height: '20rem'
  },

  variants: {
    bg: {
      transparent: {
        backgroundColor: 'transparent',
        position: 'absolute',
        marginBottom: '$24',
        '&::before': {
          marginBottom: '$24'
        }
      },
      solid: {
        backgroundColor: 'rgba(47, 69, 80, 0.8)',
        position: 'static',
        marginBottom: '$8',
        '&::before': {
          width: '100%',
          height: '20rem',
          marginBottom: '$8'
        }
      }
    }
  }
})

const NavList = styled('div', {
  width: '85%',
  margin: '2.25rem auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '$10',

  '@bp2': {
    width: '75%'
  },

  '@bp3': {
    width: '65%'
  },

  'a:last-child': {
    mr: 0
  }
})

const NavigationBar: React.FC = () => {
  const router = useRouter()

  // /movies /tv-series /movies/... /movies/[movie]
  console.log(router.pathname)
  const isAbAndTransparent =
    router.pathname !== '/' &&
    router.pathname !== '/404' &&
    router.pathname !== '/500'

  return (
    <Nav bg={isAbAndTransparent ? 'transparent' : 'solid'}>
      <NavList>
        <Box>
          <Link href="/" passHref>
            <h2 style={{ padding: 0, margin: 0 }} className="FirstNavTitle">
              bobo's
            </h2>
            <h2 style={{ padding: 0, margin: 0 }} className="SecondNavTitle">
              zoomer<b>anime</b>
            </h2>
          </Link>
        </Box>

        <Box
          css={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <NavLink
            href="/movies"
            component={
              <Box
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Movie style={{ marginBottom: '0.2rem' }} size="1.85rem" />
                <Box css={{ pb: '$2', position: 'relative' }}>
                  <span>movies</span>
                  <JapaneseHeading css={{ left: 0, top: 5 }}>
                    映画
                  </JapaneseHeading>
                </Box>
              </Box>
            }
          />

          <NavLink
            href="/tv-shows"
            component={
              <Box
                css={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Tv style={{ marginBottom: '0.2rem' }} size="1.85rem" />
                <Box css={{ pb: '$2', position: 'relative' }}>
                  <span>tv shows</span>
                  <JapaneseHeading css={{ left: 0, top: 5 }}>
                    テレビ番組
                  </JapaneseHeading>
                </Box>
              </Box>
            }
          />
        </Box>
      </NavList>
    </Nav>
  )
}

export default NavigationBar
