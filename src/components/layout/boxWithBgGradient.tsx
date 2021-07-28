import styled from 'styled-components'

// margin-bottom: 1.5rem;
//     padding-top: 5rem;
//     /* padding-bottom: 10rem; */
//     display: -webkit-box;
//     display: -webkit-flex;
//     display: -ms-flexbox;
//     display: flex;
//     -webkit-flex-direction: column;
//     -ms-flex-direction: column;
//     flex-direction: column;
//     -webkit-box-pack: center;
//     -webkit-justify-content: center;
//     -ms-flex-pack: center;
//     justify-content: center;
//     -webkit-align-items: center;
//     -webkit-box-align: center;
//     -ms-flex-align: center;
//     align-items: center;
//     position: relative;
//     opacity: 1;
//     z-index: -1;
//     width: 100%;
//     height: 100vh;
//     align-items: center;
//     justify-content: center;

const BoxWithBgGradient = styled.div<{ img: string }>`
  margin-bottom: ${({ theme }) => theme.spacing[6]};
  padding-top: 25rem;
  padding-bottom: 10rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  opacity: 1;
  z-index: -1;
  width: 100%;

  &::before {
    background-image: ${props =>
      `linear-gradient(to bottom, rgba(255, 192, 203, 0.4) 0%, rgba(255, 192, 203, 0.2) 30%, #1919197d 80%, #191919 90%), url(${props.img})`};
    filter: grayscale(100%);
    opacity: 0.3;
    background-size: cover;
    background-position: center;
    content: '';
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

export default BoxWithBgGradient
