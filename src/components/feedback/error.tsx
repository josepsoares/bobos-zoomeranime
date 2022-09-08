import React from 'react'
import Box from '@components/box'
import JapaneseHeading from '@components/japaneseHeading'
import Container from '@components/layout/container'
import Heading from '@components/heading'
import Image from 'next/image'

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
        <Image
          width="100px"
          height="100px"
          src="/assets/images/pikachu-test.png"
          alt="teste"
        />
      </Box>
    </Container>
  )
}

export default Error
