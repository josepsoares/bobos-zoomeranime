import styled from 'styled-components'

const ImageTitle = styled.div`
  position: relative;
  text-align: center;

  & > img {
    opacity: 0.5;
    width: 100%;
    height: auto;
  }

  & > h1 {
    padding: ${props => props.theme.spacing.one};
    border: 4px solid ${props => props.theme.colors.lightPurple};
    color: ${props => props.theme.colors.white};
    background-color: rgba(88, 111, 124, 0.4);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export default ImageTitle
