import React, { useState } from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import Router from 'next/router';
import { FiUploadCloud } from 'react-icons/fi'
import { AiFillDelete } from 'react-icons/ai'
import { client } from '../client'
import { v4 as uuidv4 } from 'uuid';

const Form = styled.form`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:20px;
label{
  font-size:50px;
  cursor:pointer;
}
`
const Email = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:20px;
input{
  width:160px;
}
`
const Pass = styled.div`
display:flex;
justify-content:center;
align-items:center;
gap:20px;
input{
  width:160px;
}
`
const Flex = styled.div`
display:flex;
gap:3px;
flex-direction:column;
justify-content:center;
align-items:center;
p{
  margin:0;
}
`
const Flex1 = styled.div`
display:flex;
gap:3px;

`
const Main1 = styled.div`
height:100vh;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
width:100vw;
`
const Title = styled.p`
font-size:30px;
margin:0;
`

const Cont1 = styled.div`
background-color: var(--background);
padding: 50px 30px;
border-radius:30px;

`
const File = styled.input`
display:none;
`



const Register = ({ users }) => {
  const slug = uuidv4()
  const [name, setname] = useState('')
  const [surname, setsurname] = useState('')
  const [email, setemail] = useState('')
  const [username, setusername] = useState('')
  const [pass, setpass] = useState('')
  const [cpass, setcpass] = useState('')
  const [slika, setslika] = useState()
  const [wuser, setwuser] = useState(false)
  const [wmail, setwmail] = useState(false)
  const [wrongImage, setwrongImage] = useState(false)
  const [razs, setrazs] = useState(false)
  const [unesisve, setunesisve] = useState(false)
  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/jpg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/tiff') {
      setwrongImage(false)
      client.assets
        .upload("image", selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
        .then((doc) => {
          setslika(doc)
        })
    } else {
      setwrongImage(true)
      setTimeout(() => {
        setwrongImage(true)
      }, 2000)
    }

  }

  const proveriUsername = async (e) => {
    setwuser(false)
    e.preventDefault()
    setusername(e.target.value)
    users?.map((covek) => {
      if (covek.username == e.target.value) {
        setwuser(true)
      }
    }
    )

  }
  const proveriMail = async (e) => {
    setwmail(false)
    e.preventDefault()
    setemail(e.target.value)
    users?.map((covek) => {
      if (covek.email == e.target.value) {
        setwmail(true)
      }
    }
    )

  }
  const handle = async (e) => {
    e.preventDefault();
    if (cpass && pass && pass == cpass) {
      if (name && surname && username && email && slika) {
        await fetch('http://localhost:3000/api/users', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pass, email, name, surname, username, url: slika.url ,slug})
        })
        await fetch('http://localhost:3000/api/sendmail', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({  email,subject:'Verifikacija email-a', html:`Hi there , there is a link for verifivcation your new account ${username} <br/> <a href='http://localhost:3000/verf/${slug}'>CLick Me </a>`})
        })

      } else {
        setunesisve(true)
        setTimeout(() => {
          setunesisve(false)
        }, 2000)
      }
    } else {
      setrazs(true)
      setTimeout(() => {
        setrazs(false)
      }, 2000)
    }

  }
  return (
    <Main1>
      <Cont1>
        <Title>Register</Title>
        <hr color='black' width='180px' />
        <Form>
          {wrongImage && <p style={{ color: 'red', margin: 0 }} > Uneliste video ili neki drugi ne podrzani format</p>}
          {wmail && <p style={{ color: 'red', margin: 0 }}>Ovaj mail vec koristi nase usluge</p>}
          {wuser && <p style={{ color: 'red', margin: 0 }}>Ovaj username se vec koristi</p>}
          {razs && <p style={{ color: 'red', margin: 0 }}>Uneliste razlicite sifre</p>}
          {unesisve && <p style={{ color: 'red', margin: 0 }}>Morate da unesete sve podatke</p>}

          <Email>
            <input type='text' placeholder='name' autoComplete='none' value={name} onChange={(e) => setname(e.target.value)} />
            <input type='text' placeholder='surname' autoComplete='none' value={surname} onChange={(e) => setsurname(e.target.value)} />
          </Email>

          <input type='email' placeholder='email' autoComplete='none' value={email} onChange={(e) => proveriMail(e)} />
          <input type='text' placeholder='username' autoComplete='none' value={username} onChange={(e) => proveriUsername(e)} />
          <Pass>
            <input type='password' placeholder='password' value={pass} onChange={(e) => setpass(e.target.value)} />
            <input type='password' placeholder='Confirm password' value={cpass} onChange={(e) => setcpass(e.target.value)} />
          </Pass>

          {slika ?
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={slika?.url} alt='slika' width='200px' height='200px' />
              <p onClick={() => setslika(null)} style={{ fontSize: '50px', cursor: 'pointer', textAlign: 'center' }} ><AiFillDelete /></p>
            </div>
            :
            <Flex>
              <p style={{ textAlign: 'center' }}>Profile photo:</p>
              <label htmlFor='file' > <FiUploadCloud style={{ color: '#0D6EFD' }} /> </label >
              <File type='file' id='file' onChange={(e) => uploadImage(e)} />
            </Flex>
          }

          <Flex1>
            <p>Vec imate nalog?</p> <Link href='/login'>Prijavi se</Link>
          </Flex1>
          <button className="btn btn-primary" type="button" onClick={(e) => handle(e)}>Potvrdi</button>
        </Form>
      </Cont1>
    </Main1>
  )
}

export async function getServerSideProps() {
  const users = await fetch('http://localhost:3000/api/users')
  return {
    props: { users: await users.json() }
  }
}

export default Register