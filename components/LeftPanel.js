import React from 'react'
import Notifications from './Notifications'
import { useStateContext } from '../context/StateContext'
import styled from 'styled-components'
import Router from 'next/router'

const Main = styled.div`
    background-color:var(--blue);
    padding:10px 10px;
    gap:20px;
    display:flex;
    flex-direction:column;
    justify-content: space-between;
    align-items:center;
    border-radius:10px;
    box-shadow: 7px 7px 7px #888888;
    img{
        border-radius:50%;
    }
    @media only screen and (max-width: 600px) {
        display:flex;
        width:100%;
        justify-content: space-between;
    }

`
const UserInfo = styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
color:var(--white);
p{
    margin:0
}
`
const LogOut = styled.button`

`

const LeftPanel = () => {
    const { user, setuser } = useStateContext()
    return (
        <Main>

            <img src={user?.imageUrl} width='100' height='100' alt='proba' />

            <UserInfo>
                <h2>{user?.username}</h2>
                <p>{user.name} {user.surname}</p>
                <p>{user.email}</p>
            </UserInfo>
            <LogOut className='btn btn-primary' onClick={()=>{Router.push('/login');setuser({})}}>
                LogOut
            </LogOut>
            <Notifications />
        </Main>
    )
}

export default LeftPanel