import React, { useState } from 'react'
import styled from 'styled-components'
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import { useStateContext } from '../context/StateContext';
import Router from 'next/router';

const Form = styled.form`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:20px;
`
const Email = styled.div`

`
const Pass = styled.div`

`
const Flex = styled.div`
display:flex;
gap:3px;
p{
    margin:0;
}
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
padding: 80px 50px;
border-radius:30px;

`
const Login = () => {
    const { setuser } = useStateContext()
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [nema, setnema] = useState(false)
    const [nepostoji, setnepostoji] = useState(false)
    const [verf, setverf] = useState(false)
    const handle = async (e) => {
        e.preventDefault();
        if (email && pass) {
            const data = await fetch(`http://localhost:3000/api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ pass, email })
            })
            const user = await data.json()
            console.log(user)
            if (user.length !== 0) {
                if (user[0].verifikacija) {
                    setuser(user[0])
                    Router.push('/')
                } else {
                    setverf(true)
                    setTimeout(() => {
                        setverf(false)
                    }, 2000)
                }
            } else {
                setnepostoji(true)
                setTimeout(() => {
                    setnepostoji(false)
                }, 2000)
            }
        } else {
            setnema(true)
            setTimeout(() => {
                setnema(false)
            }, 2000)
        }
    }
    return (
        <Main1>
            <Cont1>
                <Title>Login</Title>
                <hr color='black' width='180px' />
                {nema && <p style={{ color: 'red', margin:0 }}>Molimo Vas unesite sva polja</p>}
                {nepostoji && <p style={{ color: 'red' , margin:0}} >Ne postoji korisnik sa takvim podacima</p>}
                {verf && <p style={{ color: 'green' , margin:0}} >Posetite mejl da biste potvrdili korisnika</p> }
                <Form>
                    <Email>
                        <input type='email' placeholder='email or username' autoComplete='none' onChange={(e) => setemail(e.target.value)} value={email} />
                    </Email>

                    <Pass>
                        <input type='password' placeholder='password' onChange={(e) => setpass(e.target.value)} value={pass} />
                    </Pass>
                    <Flex>
                        <p>Nemate nalog?</p> <Link href='/register'>Registuj se</Link>
                    </Flex>
                    <Flex>
                        <p>Zaboraviliste siftu?</p> <Link href='/zaboravljena'>Promeni sifru</Link>
                    </Flex>
                    <button className="btn btn-primary" type="button" onClick={(e) => handle(e)}>Potvrdi</button>
                </Form>
            </Cont1>
        </Main1>
    )
}

export default Login