import JapaneseHeading from '@components/japaneseHeading'
import Box from '@components/primitives/box'
import Heading from '@components/primitives/heading'

// types
import type { NextComponentType, NextPageContext } from 'next'
import type { ICharacter } from '@utils/ts/aniListApiTypes'

interface Props {
  data: ICharacter[]
}

const Characters: NextComponentType<NextPageContext, {}, Props> = (
  props: Props
) => {
  return (
    <Box>
      <Heading as="h1" css={{ pb: '$4' }}>
        stinky main characters
        <JapaneseHeading css={{ left: 0, top: '-25%' }}>
          ボボ の 電波な奴
        </JapaneseHeading>
      </Heading>
      <Box
        css={{
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'row',
          justifyContent: 'center',
          gridGap: '$4'
        }}
      >
        {props.data.map((char: ICharacter, index: number) => (
          <Box
            css={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            key={index}
          >
            <img
              width={100}
              height={100}
              alt={char.node.name.first}
              src={char.node.image.large}
            />
            <Heading as="h5" css={{ py: '$2' }}>
              {char.node.name?.first} <br /> {char.node.name?.last}
            </Heading>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Characters
