import React, { useState, useEffect } from "react";
import "./App.css"
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import SignUp from "./SignUp";
import Home from "./Home";
import LogIn from "./LogIn";
import Profile from "./Profile";
import Messages from "./Messages";
import Create from "./Create";




function App() {
  const [user, setUser] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)
  const [allPost, setAllPost] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try{
        const resp = await fetch("/checksession")
        if (!resp.ok) {
          throw Error("Bad Response")
        }
        const data = await resp.json()
        setLoggedIn(true)
        setUser(data)
      }catch (error){
        navigate('login')
        console.log("error")
      }
     
    }
    )();
  }, [])


  useEffect(() => {
    (async () => {
      try{
        const resp = await fetch("posts/all")
        if (!resp.ok) {
          throw Error("Bad Response")
        }
        const data = await resp.json()
        setAllPost(data)
      }catch (error){
        console.log("error")
      }
     
    }
    )();
  }, [])

  
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="profile" element={<Profile user={user} setlogged={setLoggedIn} post={allPost}/>}/>
        <Route path='login' element={<LogIn setUser={setUser} setlogged={setLoggedIn} />}/>
        <Route path="signup" element={<SignUp setuser={setUser} setlogged={setLoggedIn}/>}/>
        <Route path="create" element={<Create user={user} />}/>
        <Route path="messages" element={<Messages/>}/>
      </Routes>
    </main>
   
  )
}


export default App;


