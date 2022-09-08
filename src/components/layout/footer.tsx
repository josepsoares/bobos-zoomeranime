import React from 'react'
import styled from 'styled-components'

const FooterEl = styled.footer`
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  margin-top: 1.5rem;
  padding: 2.25rem 0;

  & > p {
    color: gray;
    font-size: small;
    font-size: 10px;
  }
`

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
