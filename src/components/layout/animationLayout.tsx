import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

const AnimationLayout: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children
}) => {
  const AnimationContainer = styled(motion.div)`
    width: 100%;
  `

  return <AnimationContainer>{children}</AnimationContainer>
}

export default AnimationLayout
