import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";


function SignUp({ setUser, setlogged, setUserId }){
    let first_name = useRef()
    let last_name = useRef()
    let password = useRef()
    let user = useRef()
    const navigate = useNavigate()

    function onSubmit(e){
        e.preventDefault()

        fetch("/signup", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body:  JSON.stringify({
                first_name: first_name.current.value,
                last_name: last_name.current.value,
                username: user.current.value,
                password: password.current.value
            })
        })
        .then(res => {
            if (!res.ok){
                throw new Error("Input fields must not be empty or to long")
            }
            res.json()
        })
        .then(data => {
            console.log(data)
            setUser(data.username)
            setUserId(setUserId)
            setlogged(true)
            navigate('/')
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
                <div class="signup-container">
                    <form class="signup-form" onSubmit={onSubmit}>
                        <h2>Sign Up</h2>
                        <input placeholder={"First Name..."} ref={first_name} type="text"/>
                        <input placeholder={"Last Name..."} ref={last_name} type="text"/>
                        <input placeholder={"Username..."} ref={user} type="text"/>
                        <input placeholder={"Password..."} ref={password} type="password"/>
                        <button type="submit">Sign Up</button>
                        <p>Already have an Account?<a href={"/login"}>Log In</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp