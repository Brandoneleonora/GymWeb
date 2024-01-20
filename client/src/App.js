import React, { useState, useEffect } from "react";
import "./App.css"
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom'
import SignUp from "./SignUp";
import Home from "./Home";
import LogIn from "./LogIn";
import NavBar from "./NavBar";
import Groups from "./Group";
import Profile from "./Profile";
import All_Group from "./All_Group";
import Bodybuilder_Group from "./Bodybuilder_Group";
import Crossfit_Group from "./Crossfit_Group";
import Powerbuilder_Group from "./Powerbuilder_Group";
import Powerlifter_Group from "./Powerlifter_Group";
import Workingout_Group from "./Workingout_Group";
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
        <Route path="/create" element={<Create user={user} />}/>
        <Route path="posts/powerlifter" element={<Powerlifter_Group/>}/>
        <Route path="posts/powerbuilder" element={<Powerbuilder_Group/>}/>
        <Route path="posts/crossfit" element={<Crossfit_Group/>}/>
        <Route path="posts/all" element={<All_Group/>}/>
        <Route path="posts/just working out" element={<Workingout_Group/>}/>
        <Route path="posts/bodybuilder" element={<Bodybuilder_Group/>}/>


      </Routes>
    </main>
   
  )
}


export default App;


