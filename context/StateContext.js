import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const StateContext = ({children}) => {
  const [user, setuser] = useState({})
  const [active, setactive] = useState([])
  const [message, setmessage] = useState('')
  const [messages, setmessages] = useState([])
  return (
    <Context.Provider
      value={{
        user,
        message,
        messages,
        active,
        setactive,
        setmessages,
        setmessage,
        setuser
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);