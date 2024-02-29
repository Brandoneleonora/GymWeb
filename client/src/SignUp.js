import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import landscape from "./landscape.jpg"
import defaultPic from "./default.jpg"


function SignUp({ setUser, setlogged }){

    const [values, setValues] = useState({
        first_name:'',
        last_name:'',
        username:'',
        password:'',
        followers: 0,
        following: 0,
        email:'',
        lift_type: '',
        bio:''
    })
    const [defaultImage, setDefaultImage] = useState(null)
    const [defaultProfile, setDefaultProfile] = useState(null)

    const navigate = useNavigate()


    useEffect(() => {
            fetch(landscape)
                .then(res => res.blob())
                .then(data => {
                    const fr = new FileReader()
                    fr.readAsDataURL(data)
                    fr.onload = () => setDefaultImage(fr.result)
                })

            fetch(defaultPic)
                .then(res => res.blob())
                .then(data => {
                    const fr = new FileReader()
                    fr.readAsDataURL(data)
                    fr.onload = () => setDefaultProfile(fr.result)
                })
    }, [])



    const onSubmit = e => {
        e.preventDefault()

        fetch("signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: values.first_name,
                last_name: values.last_name,
                username: values.username,
                password: values.password,
                followers: values.followers,
                following: values.following,
                bio: values.bio,
                email: values.email,
                lift_type: values.lift_type,
                background_image: defaultImage,
                profile_picture: defaultProfile
            })
          })
          .then(res => {
            // if (!res.ok){
            //     throw Error("Failed Fetch")
            // }
            return res.json()
          })
          .then(data => {
            console.log(data)
            setUser(data)
            navigate('/')
        })
          .catch(err => console.log(err.message))
            
    }

    const inputChange = e => setValues({...values, [e.target.name]: e.target.value})


    return(
        <div class="container">  
            <div class="form-container">
                <div class="logo-container">
                    <h2><span>Gym</span><span>Eco.</span></h2>
                </div>
                <div class="signup-container">
                    <form class="signup-form" onSubmit={onSubmit}>
                        <h2>Sign Up</h2>
                        <input placeholder={"First Name..."} name ="first_name" onChange={inputChange}  type="text"/>
                        <input placeholder={"Last Name..."} name ="last_name" onChange={inputChange}  type="text"/>
                        <input placeholder={"Username..."} name ="username" onChange={inputChange}  type="text"/>
                        <input placeholder={"Password..."} name ="password" onChange={inputChange} type="password"/>
                        <button type="submit">Sign Up</button>
                        <p>Already have an Account?<a href={"/login"}>Log In</a></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp