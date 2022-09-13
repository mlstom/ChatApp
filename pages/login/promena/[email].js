import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components'
import Router from 'next/router';

const Main = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  gap:20px;
`

const Promena = ({user}) => {
  const covek = JSON.parse(user)
  const [pass, setpass] = useState('')
  const [cpass, setcpass] = useState('')
  const [greska, setgreska] = useState(false)
  const [uspesno, setuspesno] = useState(false)
  const handle= async(e)=>{
    e.preventDefault()
    if(pass && cpass && pass==cpass){
       await fetch(`http://localhost:3000/api/user/email/${covek.email}`,{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({pass })
       })
       setuspesno(true)
       setTimeout(()=>{
          Router.push('/login')
       },2000)
    }else{
      setgreska(true)
      setTimeout(()=>{
        setgreska(false)
      },2000)
    }
  }
  return (
    <Main>
        <p>Promeni lozinku</p>
        {greska && <p style={{color:'red', margin:0}}>Molim vas unesite ispravno podatke</p>}
        {uspesno && <p style={{color:'green', margin:0}}>Uspesno ste promenili sifru </p>}
        <input type='password' placeholder='password' value={pass} onChange={(e)=>setpass(e.target.value)} />
        <input type='password' placeholder='Confitm password' value={cpass} onChange={(e)=>setcpass(e.target.value)} />
        <button className="btn btn-primary" type="button" onClick={(e) => handle(e)}>Potvrdi</button>
    </Main>
  )
}
export async function getServerSideProps({params:{email}}){
  const data = await fetch(`http://localhost:3000/api/user/email/${email}`)
  const [user1] = await data.json()
  return{
    props:{
        user: JSON.stringify(user1)
    }
  }
}
export default Promena