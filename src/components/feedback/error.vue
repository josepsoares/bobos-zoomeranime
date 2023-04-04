import Image from 'next/image'

import Box from '@components/primitives/box'
import Container from '@components/primitives/container'
import Heading from '@components/primitives/heading'

import JapaneseHeading from '@components/japaneseHeading'

const Error: React.FC<{ error: string }> = ({ error }) => {
  console.log(error)
  return (
    <Container>
      <Box
        css={{
          display: 'flex',
          textAlign: 'center',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box css={{ py: '$6' }}>
          <Box>
            <Heading as="h2">
              <span>Error</span>
              <JapaneseHeading>誤り</JapaneseHeading>
            </Heading>

            <p>It appears something went wrong...</p>
          </Box>
        </Box>
        <Image
          width={100}
          height={100}
          src="/assets/images/pikachu-test.png"
          alt="teste"
        />
      </Box>
    </Container>
  )
}

export default Error
