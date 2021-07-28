import styled from 'styled-components'

const ImageBox: React.FC<{
  h: string
  image: string
  title: string
  nativeTitle: string
}> = ({ h, image, title, nativeTitle }) => {
  const ImageBoxEl = styled.div<{
    h?: string
  }>`
    position: relative;
    padding: 0;
    opacity: 1;
    width: 100%;
    height: ${props => props.h || '45vh'};
    background-image: url(${image});
    background-size: cover;
    background-position: center;
    box-shadow: ${({ theme }) => theme.shadows.black};

    &:before {
      z-index: 0;
      position: absolute;
      content: '';
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.85;
      transition: ${({ theme }) => theme.transitions.normal};
      background-image: ${({ theme }) => theme.colors.blueGradient};
    }

    &:hover:before,
    &:active:before,
    &:hover > aside,
    &:active > aside {
      opacity: 0;
    }

    & > aside {
      z-index: 3;
      opacity: 0.85;
      height: ${props => props.h || '45vh'};
      width: 100%;
      margin: 0;
      opacity: 1;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      letter-spacing: 0.1em;
      text-align: center;
      transition: ${({ theme }) => theme.transitions.normal};

      h4 {
        margin: 0;
        padding: 1rem;
        max-width: 70%;
        border: 3px solid ${({ theme }) => theme.colors.lightPurple};
        color: ${({ theme }) => theme.colors.white};
      }

      h5 {
        margin: 0;
        max-width: 70%;
        word-break: break-word;
        opacity: 0.25;
        color: ${({ theme }) => theme.colors.lightBlue};
        font-weight: normal;
        position: absolute;
        font-size: ${({ theme }) => theme.sizes[8]};
        transform: translate(0%, 8%);
      }
    }
  `

  return (
    <ImageBoxEl h={h || '45vh'}>
      <aside>
        <h4>{title}</h4>
        <h5>{nativeTitle}</h5>
      </aside>
    </ImageBoxEl>
  )
}

export default ImageBox
