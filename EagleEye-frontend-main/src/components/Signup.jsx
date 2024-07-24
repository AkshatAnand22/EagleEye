import { useState, useEffect } from 'react'
export default function Login(){
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const changeEmail = (event)=>setEmail(event.target.value);
    const changePassword = (event)=>setPassword(event.target.value);

    async function signup(){
        let response = await fetch("http://localhost:3000/user/signup",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"email": email, "password": password})
        })

        let data = await response.json();
        console.log(data);

    }

    function handleSubmit(event){
        event.preventDefault();
        signup();
    }

    return (
        <>
            <div>
                <h1>Signup</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" onChange={changeEmail}/>
                    <input type="password" onChange={changePassword}/>
                    <button>Submit</button>
                </form>
            </div>
        </>
    )
}