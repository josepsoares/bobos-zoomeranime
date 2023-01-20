import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '@stitches/react'

import Box from '@components/primitives/box'
import NavLink from '@components/header/navLink'
import JapaneseHeading from '@components/japaneseHeading'

// icons
import Movie from 'assets/icons/bxs-movie.svg'
import Tv from 'assets/icons/bx-tv.svg'

// TODO - nav

const Nav = styled("nav",<{ pos: string; opc: string; mb: string }>`
  width: 100%;
  position: ${props => props.pos};
  margin-bottom: ${props => props.mb};
  left: 0;
  background-color: ${props => `rgba(47, 69, 80, ${props.opc})`};

  &::before {
    width: 100%;
    height: 20rem;
    margin-bottom: ${props => props.mb};
  }
`)

// TODO - nav list

const NavList = styled('div', {
  width: 85%;
  margin: 2.25rem auto;
  justify-content: center;
  align-items: center;
  @media ${({ theme }) => theme.mediaQueries.sm} {
    width: 83%;
  }
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  a:last-child {
    margin-right: 0 !important;
  }
})

const NavigationBar: React.FC = () => {
  const router = useRouter()
  console.log(router.pathname)

  // /movies /tv-series /movies/... /movies/[movie]
  const isAbAndTransparent =
    router.pathname !== '/' &&
    router.pathname !== '/404' && 
    router.pathname !== '/500'

  const position = isAbAndTransparent ? 'absolute' : 'static'
  const marginBottom = isAbAndTransparent ? '6rem' : '2rem'
  const opacity = isAbAndTransparent ? '0.5' : '0.8'

  return (
    <Nav pos={position} mb={marginBottom} opc={opacity}>
      
          
        <NavList>
          <NavLink
            href="/movies"
            component={
              <Box display="flex" flexDirection="column" alignItems="center">
                <Movie style={{ marginBottom: '0.2rem' }} size="1.85rem" />
                <Box pb={2} position="relative">
                  <span>movies</span>
                  <JapaneseHeading positionX="0" positionY="40">
                    映画
                  </JapaneseHeading>
                </Box>
              </Box>
            }
          />

          <Link href="/" passHref>
            <a>
              <h2 style={{ padding: 0, margin: 0 }} className="FirstNavTitle">
                bobo's
              </h2>
              <h2 style={{ padding: 0, margin: 0 }} className="SecondNavTitle">
                zoomer<b>anime</b>
              </h2>
            </a>
          </Link>

          <NavLink
            href="/tv-series"
            component={
              <Box display="flex" flexDirection="column" alignItems="center">
                <Tv style={{ marginBottom: '0.2rem' }} size="1.85rem" />
                <Box pb={2} position="relative">
                  <span>tv series</span>
                  <JapaneseHeading positionX="0" positionY="40">
                    テレビ番組
                  </JapaneseHeading>
                </Box>
              </Box>
            }
          />
        </NavList>
    
    </Nav>
  )
}

export default NavigationBar
