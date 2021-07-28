import React from 'react'
import styled from 'styled-components'
import { UpArrow } from '@styled-icons/boxicons-regular'

const ScrollToTopButton = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.theme.colors.lightPurple};
  background-color: ${props => props.theme.colors.black};
  z-index: 3;
  position: fixed;
  left: 82.5%;
  top: 90%;
  border-radius: 50%;
  transition: ${props => props.theme.transitions.normal};
  box-shadow: ${props => props.theme.shadows.black};

  svg {
    transition: ${props => props.theme.transitions.normal};
    color: ${props => props.theme.colors.darkBlue};
  }

  &:hover,
  &:active {
    background-color: ${props => props.theme.colors.darkBlue};
    box-shadow: ${props => props.theme.shadows.lightPurple};

    svg {
      color: ${props => props.theme.colors.lightBlue};
    }
  }

  @media ${props => props.theme.breakpoints.sm} {
    left: 88%;
  }

  @media ${props => props.theme.breakpoints.md} {
    left: 92.5%;
  }

  @media ${props => props.theme.breakpoints.lg} {
    left: 94%;
    top: 90%;
  }
`

class ScrollingWrapper extends React.Component {
  state = { hasScrolled: false }

  componentDidMount(): void {
    window.addEventListener('scroll', this.onScroll)
  }

  onScroll = (): void => {
    if (window.scrollY > 500 && !this.state.hasScrolled) {
      this.setState({ hasScrolled: true })
    } else if (window.scrollY < 500 && this.state.hasScrolled) {
      this.setState({ hasScrolled: false })
    }
  }

  scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  render(): JSX.Element {
    const checkOpacity = this.state.hasScrolled ? 0.9 : 0
    const display = this.state.hasScrolled ? 'flex' : 'none'

    return (
      <>
        <ScrollToTopButton
          style={{ opacity: checkOpacity, display: display }}
          onClick={this.scrollToTop}
        >
          <UpArrow />
        </ScrollToTopButton>
        {this.props.children}
      </>
    )
  }
}

export default ScrollingWrapper
