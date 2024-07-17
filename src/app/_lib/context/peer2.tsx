import Peer from 'peerjs'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react'

const PeerContext = createContext(null as any)

export const useNewPeer = () => useContext(PeerContext)

export const NewPeerProvider = ({ children }: { children: ReactNode }) => {
  const [peerRoom, setPeerRoom] = useState<any>()
  const [peerUser, setPeerUser] = useState<any>()

  return (
    <PeerContext.Provider value={{ peerRoom, setPeerRoom, peerUser, setPeerUser }}>
      {children}
    </PeerContext.Provider>
  )
}
