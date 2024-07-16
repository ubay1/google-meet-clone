import Peer from 'simple-peer'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react'

const SimplePeerContext = createContext(null as any)

export const useSimplePeer = () => useContext(SimplePeerContext)

export const SimplePeerProvider = ({ children }: { children: ReactNode }) => {
  const [peerBase, setpeerBase] = useState<any>()

  useEffect(() => {
    const aa = new Peer({ initiator: true })
    setpeerBase(aa)
  }, [])
  // console.log(peer)

  return <SimplePeerContext.Provider value={{ peerBase }}>{children}</SimplePeerContext.Provider>
}
