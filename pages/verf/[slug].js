import React,{useEffect} from 'react'
import Link from 'next/link'
import { useStateContext } from '../../context/StateContext'
import styled from 'styled-components'

const Main = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  a{
    background-color:'#0D6EFD'
  }
`
const Verf = ({user}) => {
  const {setuser} = useStateContext()
  const covek = JSON.parse(user)
  useEffect( () => {
    console.log(covek)
    async function fetchData(){
      await fetch(`http://localhost:3000/api/user/${covek.slug}`,{
        method:"POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ })
      })
      console.log('uspeh')
      setuser(covek)
    }
    fetchData()
  }, [])
  
  return (
    <Main>
      <p>Drago nam je sto ste posetili mejl</p>
      <Link href='/'>
        Pristupi aplikaciji
      </Link>
    </Main>
  )
}

export async function getServerSideProps({params:{slug}}){
  const data = await fetch(`http://localhost:3000/api/user/${slug}`)
  const [user1] = await data.json()
  return{
    props:{
        user : JSON.stringify(user1)
    }
  }
}

export default Verf