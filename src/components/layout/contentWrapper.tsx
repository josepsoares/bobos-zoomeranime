import React from 'react'

const ContentWrapper: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({
  children
}) => {
  return <div>{children}</div>
}

export default ContentWrapper
