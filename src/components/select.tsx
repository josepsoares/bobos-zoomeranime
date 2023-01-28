import * as Select from '@radix-ui/react-select'
import { styled } from '@styles/stitches.config'

const SelectTrigger = styled(Select.SelectTrigger, {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '4px',
  padding: '0 15px',
  fontSize: '13px',
  lineHeight: 1,
  height: '35px',
  gap: '5px',
  backgroundColor: 'transparent',
  color: '$lightBlue',
  boxShadow: '$shadowlightPurple',
  border: 'solid 2px',
  borderColor: '$lightPurple',

  '&:hover': {
    backgroundColor: '$darkBlue',
    color: '$lightPurple'
  },
  '&:focus': {
    boxShadow: '$shadowLightBlue'
  },
  '&[data-placeholder]': {
    color: '$lightBlue'
  }
})

const SelectIcon = styled(Select.SelectIcon, {
  fill: '$lightBlue'
})

const SelectContent = styled(Select.SelectContent, {
  overflow: 'hidden',
  backgroundColor: '$gray900',
  borderRadius: '6px',
  boxShadow:
    '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)'
})

const SelectViewport = styled(Select.SelectViewport, {
  padding: '5px'
})

const SelectLabel = styled(Select.SelectLabel, {
  padding: '0 25px',
  fontSize: '14px',
  lineHeight: '25px',
  color: '$lightPurple'
})

const SelectSeparator = styled(Select.SelectSeparator, {
  height: '1px',
  backgroundColor: '$gray700',
  margin: '5px'
})

const SelectItemIndicator = styled(Select.SelectItemIndicator, {
  position: 'absolute',
  mr: '$1',
  left: 0,
  width: '20px',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  svg: {
    fill: 'white'
  }
})

const SelectItem = styled(Select.SelectItem, {
  fontSize: '13px',
  lineHeight: 1,
  color: '$gray300',
  borderRadius: '3px',
  display: 'flex',
  alignItems: 'center',
  height: '25px',
  padding: '0 35px 0 25px',
  position: 'relative',
  userSelect: 'none',

  '&[data-highlighted]': {
    outline: 'none',
    backgroundColor: '$lightPurple',
    color: '$lightGrey'
  }
})

export {
  SelectTrigger,
  SelectIcon,
  SelectContent,
  SelectViewport,
  SelectLabel,
  SelectSeparator,
  SelectItemIndicator,
  SelectItem
}
