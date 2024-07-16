import Peer from 'peerjs'
import { createContext, useState, useEffect, useContext, ReactNode } from 'react'
import { usePeerStore } from '@lib/stores/join-room'

const PeerContext = createContext(null as any)

export const usePeer = () => useContext(PeerContext)

export const PeerProvider = ({ children }: { children: ReactNode }) => {
  const peer = new Peer()

  const { id, myStream, remoteStream, conn, setConn, setMyStream, setRemoteStream, setCall } =
    usePeerStore()

  const connectToPeer = (peerId: string) => {
    setTimeout(() => {
      console.log('id: ' + peerId)
      const conn = peer.connect(peerId)
      conn.on('open', () => {
        console.log('Connected to: ' + peerId)
        setConn(conn)
      })

      conn.on('data', (data: any) => {
        console.log('Received', data)
      })
    }, 1000)
  }

  const startCall = (peerId: any, localStream: any) => {
    setTimeout(() => {
      // const stream = localStream
      // console.log('localStream = ', stream.getTracks())

      if (!localStream) {
        console.error('No media stream available to call.')
        return
      }
      const call = peer.call(peerId, localStream)
      if (!call) {
        console.error('Failed to create call.')
        return
      }
      call.on('stream', (localStream) => {
        console.log('localStream - ', localStream)
        // setRemoteStream(localStream)
      })
      setCall(call)
    }, 1000)
  }

  const sendMessage = (message: any) => {
    if (conn && conn.open) {
      conn.send(message)
    }
  }

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      setMyStream(stream)
    } catch (error) {
      console.error('Error accessing media devices.', error)
    }
  }

  return (
    <PeerContext.Provider
      value={{ id, connectToPeer, startCall, sendMessage, myStream, remoteStream, getMediaStream }}
    >
      {children}
    </PeerContext.Provider>
  )
}
