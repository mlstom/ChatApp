import Router from 'next/router'
import { useEffect } from 'react'
import { useStateContext } from '../context/StateContext'
import ChatScrin from '../components/ChatScrin';
import LeftPanel from '../components/LeftPanel';
import styled from 'styled-components';

const Main = styled.div`
height:100vh;
width:100vw;
display:flex;
justify-content:center;
align-items:center;
background-color:var(--white);
`
const Cont = styled.div`
background-color:var(--background);
padding:40px;
display:flex;
flex-wrap: wrap;
border-radius:20px;
gap:20px;
box-shadow: 10px 10px 5px #888888;
`

export default function Home() {
  const { user } = useStateContext()

  useEffect(() => {
    if (!user.name) {
      Router.push('/login')
    }
  }, [])
  return (
    <Main>
      <Cont>
        <LeftPanel />
        <ChatScrin />
      </Cont>
    </Main>
  )
}
