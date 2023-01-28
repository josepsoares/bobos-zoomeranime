// props.theme.colors.mediumBlue
// props.theme.colors[props.color]

import { styled } from '@styles/stitches.config'

const JapaneseHeading = styled('span', {
  $$left: '40%',
  $$top: '-10%',
  $$color: '$mediumBlue',
  wordBreak: 'keep-all',
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  position: 'absolute',
  color: '$$color',
  left: '$$left',
  top: '$$top',
  opacity: '0.3',
  zIndex: '-1'
})

export default JapaneseHeading
