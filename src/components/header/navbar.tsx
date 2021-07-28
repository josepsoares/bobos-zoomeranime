import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useWindowSize } from 'react-use'
import styled from 'styled-components'

import { Home, Movie } from '@styled-icons/boxicons-solid'
import { Menu, Tv } from '@styled-icons/boxicons-regular'
import Box from '@components/box'
import NavLink from '@components/header/navLink'
import JapaneseHeading from '@components/japaneseHeading'

const Nav = styled.nav<{ pos: string; opc: string; mb: string }>`
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
`

const NavList = styled.div`
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
`

const NavigationBar: React.FC = () => {
  const router = useRouter()
  console.log(router.pathname)

  // /movies /tv-series /movies/... /movies/[movie]
  const isAbAndTransparent =
    router.pathname !== '/' &&
    router.pathname !== '/about' &&
    router.pathname !== '/404'

  const position = isAbAndTransparent ? 'absolute' : 'static'
  const marginBottom = isAbAndTransparent ? '6rem' : '2rem'
  const opacity = isAbAndTransparent ? '0.5' : '0.8'
  const [isOpen, setOpen] = useState(false)
  const { width } = useWindowSize()

  const toggle = () => {
    setOpen(!isOpen)
  }

  return (
    <Nav pos={position} mb={marginBottom} opc={opacity}>
      {width < 768 ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="85%"
            margin="0 auto"
          >
            <Menu size="2rem" onClick={toggle} />

            <Link href="/" passHref>
              <a>
                <h2 className="FirstNavTitle">bobo's</h2>
                <h2 className="SecondNavTitle">
                  zoomer<b>anime</b>
                </h2>
              </a>
            </Link>
          </Box>
          <AnimatePresence initial={false}>
            {isOpen && (
              <motion.section
                key="content"
                initial="collapsed"
                animate="open"
                exit="collapsed"
                variants={{
                  open: {
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98]
                    }
                  },
                  collapsed: {
                    opacity: 0,
                    height: 0,
                    transition: {
                      duration: 0.5,
                      ease: [0.04, 0.62, 0.23, 0.98],
                      delay: 0.3
                    }
                  }
                }}
              >
                <motion.div
                  variants={{
                    open: {
                      scale: 1,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98],
                        delay: 0.2
                      }
                    },
                    collapsed: {
                      scale: 0.8,
                      opacity: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.04, 0.62, 0.23, 0.98]
                      }
                    }
                  }}
                  style={{
                    transformOrigin: 'top center',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    padding: '2rem 0',
                    width: '85%',
                    margin: '0 auto'
                  }}
                >
                  <NavLink
                    href="/"
                    component={
                      <Box position="relative">
                        <Home style={{ marginRight: '1rem' }} size="1.85rem" />
                        <span>home</span>
                        <JapaneseHeading>ホーム</JapaneseHeading>
                      </Box>
                    }
                  />
                  <NavLink
                    href="/movies"
                    component={
                      <Box position="relative">
                        <Movie style={{ marginRight: '1rem' }} size="1.85rem" />
                        <span>movies</span>
                        <JapaneseHeading>映画</JapaneseHeading>
                      </Box>
                    }
                  />
                  <NavLink
                    href="/tv-series"
                    component={
                      <Box position="relative">
                        <Tv style={{ marginRight: '1rem' }} size="1.85rem" />
                        <span>tv series</span>
                        <JapaneseHeading>テレビ番組</JapaneseHeading>
                      </Box>
                    }
                  />
                </motion.div>
              </motion.section>
            )}
          </AnimatePresence>
        </>
      ) : (
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
      )}
    </Nav>
  )
}

export default NavigationBar
