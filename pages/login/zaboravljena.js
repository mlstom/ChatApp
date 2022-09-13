import React,{useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import styled from 'styled-components'

const Main = styled.div`
  height:100vh;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  gap:20px;

`

const Zaboravljena = () => {
  const [email, setemail] = useState('')
  const [unesi, setunesi] = useState(false)
  const [poslato, setposlato] = useState(false)
  const handle=async(e)=>{
      e.preventDefault()
      if(email){
        await fetch('http://localhost:3000/api/sendmail', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  email,subject:'Promena sifre', html:`Ej , izgleda da je neko zatrazio promenu sifre. Kako bi je promenio samo klikni na link, a ako nisi ti zatrazio samo ignorisi mejl<br/> <a href='http://localhost:3000/login/promena/${email}'>CLick Me </a>`})
        })
        setposlato(true)
      }else{
          setunesi(true)
          setTimeout(()=>{
              setunesi(false)
          },2000)
      }
      
  }
  return (
    <Main>
      <p>Zdravo kako biste vratili loziku molimo vas posetite vas mejl</p>
      {poslato && <p style={{color:'green', margin:0}}>Link za promenu lozike je poslat na vas mejl</p>}
      {unesi && <p style={{color:'red', margin:0}}>Molim vas unesite sve podatke</p>}
      <input type='email' placeholder='inkrist@example.com' value={email} onChange={(e)=>setemail(e.target.value)} />
      <button className="btn btn-primary" type="button" onClick={(e) => handle(e)}>Potvrdi</button>
    </Main>
  )
}

export default Zaboravljena