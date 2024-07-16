import Peer from 'simple-peer'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react'

const SimplePeerContext = createContext(null as any)

export const useSimplePeer = () => useContext(SimplePeerContext)

export const SimplePeerProvider = ({ children }: { children: ReactNode }) => {
  const [peer, setPeer] = useState<any>()
  useEffect(() => {
    const aa = new Peer({ initiator: true })
    setPeer(aa)
  }, [])
  // console.log(peer)

  return <SimplePeerContext.Provider value={{ peer }}>{children}</SimplePeerContext.Provider>
}
