import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'


function LogIn({ setUser }){
    let password = useRef()
    let user = useRef()
    const navigate = useNavigate()
    const BASE_URL = "https://gymweb-s9ic.onrender.com"
    
    function onSubmit(e){
        e.preventDefault()
        fetch(`/login`,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body:  JSON.stringify({
                username : user.current.value,
                password: password.current.value
            })
        })
        .then(res => {
            if (!res.ok){
                throw new Error("Username or Passworcd is incorrect!")
            }
            return res.json()
        })
        .then(data => {
            setUser(data)
            navigate('/')
            console.log(data)
        })
        .catch(err => {
            console.log(err.message)
        })
    }



    return(
        <div class="container">  
            <div class="form-container">
                <div class="logo-container">
                    <h2><span>Gym</span><span>Eco.</span></h2>
                </div>
                <div class="login-container">
                    <form class="login-form" onSubmit={onSubmit}>
                        <h2>Log In</h2>
                        <input placeholder={"Username..."} ref={user} type="text"/>
                        <input placeholder={"Password..."} ref={password} type="password"/>
                        <button type="submit">Log In</button>
                        <p>Already have an Account?<a href={"/signup"}>Sign Up</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}



export default LogIn