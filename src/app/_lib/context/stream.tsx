import { createContext, ReactNode, useRef } from 'react'

export const StreamContext = createContext(null as any)

export const StreamContextProvider = ({ children }: { children: ReactNode }) => {
  const ref1 = useRef()
  const ref2 = useRef()

  return <StreamContext.Provider value={{ ref1, ref2 }}>{children}</StreamContext.Provider>
}
