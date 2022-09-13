import React, { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useStateContext } from '../context/StateContext'

let socket

const Notifications = () => {
  const {active, setactive} = useStateContext()
  async function fetcServer() {
    await fetch('/api/socketio')
    socket = io()
    socket.on('joind',act => setactive(act))
  }

  useEffect(() => {
    fetcServer()
  }, [])

  return (
    <div>Notifications</div>
  )
}

export default Notifications