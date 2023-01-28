import Box from '@components/primitives/box'
import Heading from '@components/primitives/heading'
import JapaneseHeading from '@components/japaneseHeading'
import Text from '@components/primitives/text'

// types
import type { NextComponentType, NextPageContext } from 'next'
import { IStaff } from '@utils/ts/aniListApiTypes'

interface Props {
  data: IStaff[]
}

const Staff: NextComponentType<NextPageContext, {}, Props> = (props: Props) => {
  return (
    <Box>
      <Heading as="h1" css={{ pb: '$4' }}>
        amazing humans who did this
        <JapaneseHeading css={{ left: 0, top: '25%' }}>
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
        {props.data.map((staff: IStaff, index: number) => (
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
              alt={staff.node.name.full}
              src={staff.node.image.large}
            />
            <Heading as="h5" css={{ py: '$2' }}>
              {staff.node.name.full}
            </Heading>
            <Text>{staff.role}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default Staff
