import { useState, useEffect } from 'react'
export default function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const changeEmail = (event)=>setEmail(event.target.value);
    const changePassword = (event)=>setPassword(event.target.value);

    async function login(){
        let response = await fetch("http://localhost:3000/user/login",{
            method: 'POST',
            headers: {
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        })

        let data = await response.json();
        console.log(data);
        localStorage.setItem('auth_token', data.token);

    }

    function handleSubmit(event){
        event.preventDefault();
        login();
    }

    async function loginUsingToken(){
        let response = await fetch("http://localhost:3000/user/login",{
            method: 'POST',
            headers: {
                'auth': localStorage.getItem('auth_token'),
                'Content-Type': 'application/json'
            }
        })

        let data = await response.json();
        console.log(data);
    }

    useEffect(()=>{
        loginUsingToken();
    },[])

    return (
        <>
            <div>
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" onChange={changeEmail}/>
                    <input type="password" onChange={changePassword}/>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}