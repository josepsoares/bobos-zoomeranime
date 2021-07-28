import React from 'react'
import Box from '@components/box'
import Image from '@components/image'
import JapaneseHeading from '@components/japaneseHeading'
import Container from '@components/layout/container'
import Heading from '@components/heading'

const Error: React.FC<{ error: string }> = ({ error }) => {
  console.log(error)
  return (
    <Container>
      <Box
        display="flex"
        textAlign="center"
        justifyContent="center"
        alignItems="center"
      >
        <Box py={6}>
          <Box>
            <Heading type="h2">
              <span>Error</span>
              <JapaneseHeading>誤り</JapaneseHeading>
            </Heading>

            <p>It appears something went wrong...</p>
          </Box>
        </Box>
        <Image src="pikachu-test.png" alt="teste" />
      </Box>
    </Container>
  )
}

export default Error
