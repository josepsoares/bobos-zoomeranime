import { useRef, useEffect, useState, ReactPortal } from 'react'
import { createPortal } from 'react-dom'

const ClientOnlyPortal: React.FC<{
  children: JSX.Element[] | JSX.Element
  selector: string
}> = ({ children, selector }): ReactPortal | null => {
  const ref = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [selector])

  return mounted ? createPortal(children, ref.current) : null
}

export default ClientOnlyPortal
