import Box from '@components/primitives/box'

const Container: React.FC<{
  children: JSX.Element | JSX.Element[] | React.ReactNode
}> = ({ children }) => {
  return (
    <Box
      css={{
        margin: '0 auto',
        '@bp1': {
          width: '85%'
        },
        '@bp2': {
          width: '83%'
        },
        '@bp4': {
          width: '75%'
        }
      }}
    >
      {children}
    </Box>
  )
}

export default Container
