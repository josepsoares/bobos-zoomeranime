import Link from 'next/link'
import { useRouter } from 'next/router'
import { styled } from '@stitches/react'

const NavLinkEl = styled(Link, {
  outline: 0,
  textTransform: 'lowercase',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  letterSpacing: '0.09em',
  position: 'relative',
  cursor: 'pointer',
  gap: '0.8rem',
  borderRadius: 4,
  zIndex: 1,
  transition: '$fast',
  padding: '$4',
  fontWeight: 'normal',
  color: '#fff',

  '@bp4': {
    py: '$4',
    px: '$6'
  },

  '&:hover, &:active': {
    color: '$lightPurple',
    backgroundColor: '#586f7c9a'
  },

  variants: {
    active: {
      true: {
        fontWeight: 'bold',
        color: '$lightPurple'
      }
    }
  }
})

const NavLink: React.FC<{
  href: string
  component: JSX.Element[] | JSX.Element
}> = ({ href, component }) => {
  const router = useRouter()
  const active = router.pathname === href

  return (
    <NavLinkEl active={active} href={href}>
      {component}
    </NavLinkEl>
  )
}

export default NavLink
