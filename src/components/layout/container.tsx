import Box from '@components/box'

const Container: React.FC<{
  children: JSX.Element | JSX.Element[] | React.ReactNode
}> = ({ children }) => {
  return (
    <Box width={['85%', null, null, '82.5%']} margin="0 auto">
      {children}
    </Box>
  )
}

export default Container
