import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'

const NavLinkEl = styled.a<{ active?: boolean }>`
  outline: 0;
  text-transform: lowercase;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  letter-spacing: 0.09em;
  position: relative;
  cursor: pointer;
  gap: 0.8rem;
  border-radius: 4px;
  z-index: 1;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  transition: ${({ theme }) => theme.transitions.fast};
  color: ${props =>
    props.active ? props.theme.colors.lightPurple : props.theme.colors.white};

  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[4]}`};

  @media ${({ theme }) => theme.mediaQueries.lg} {
    padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]}`};
  }

  &:hover,
  &:active {
    color: ${({ theme }) => theme.colors.lightPurple};
    background-color: #586f7c9a;
  }
`

const NavLink: React.FC<{
  href: string
  component: JSX.Element[] | JSX.Element
}> = ({ href, component }) => {
  const router = useRouter()
  const active = router.pathname === href

  return (
    <Link href={href} passHref>
      <NavLinkEl active={active}>{component}</NavLinkEl>
    </Link>
  )
}

export default NavLink
