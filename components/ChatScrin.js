import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useStateContext } from '../context/StateContext'
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components';

const Main = styled.div`
box-shadow: 0 0 0 1px black;
padding:20px 10px;
`
const Over = styled.div`
height:240px;
overflow: scroll;
overflow-x: hidden;
&::-webkit-scrollbar {
    width: 5px;
}
&::-webkit-scrollbar-track {
    border-radius: 7px;
}
&::-webkit-scrollbar-thumb {
    background-color: var(--plava); 
    border-radius: 3px;
}
&::-webkit-scrollbar-thumb:hover {
    background-color: black 
}

`

let socket;

const ChatScrin = () => {
    const { user, message, messages, setmessage, setmessages } = useStateContext()
    const { username } = user

    async function fetcServer() {
        await fetch('/api/socketio')
        socket = io()
        socket.on('updatedMessages', messages => setmessages(messages))
    }

    useEffect(() => {
        fetcServer()
    }, [])

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('newMessage', [
            ...messages,
            { message, username }
        ])
        setmessage('')
    }
    const handleEnter = (e) => {
        if (e.keyCode == 13) {
            sendMessage(e)
        }
    }
    return (
        <Main>
            <Over>
                {
                    messages?.map((msg, index) =>
                        <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                            <p>{msg.username} : </p>
                            <p>{msg.message}</p>
                        </div>
                    )
                }
            </Over>
            <div style={{ display: 'flex', gap: '10px',marginTop:'20px'}}>
                <input type='text' value={message} onChange={(e) => setmessage(e.target.value)} onKeyUp={(e) => handleEnter(e)} />
                <button type='button' className='btn btn-primary' onClick={(e) => sendMessage(e)} >Potvrdi</button>
            </div>

        </Main>
    )
}
export default ChatScrin