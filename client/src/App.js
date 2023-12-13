import React, { useState, useEffect } from "react";
import "./App.css"
import {Routes, Route, Navigate} from 'react-router-dom'
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
  const [username, setUsername] = useState('')
  const [userId, setUserId] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [allPost, setAllPost] = useState(null)
  const [profilePhotos, setProfilePhotos] = useState()
 
  useEffect(() => {
    (async () => {
      try{
        const resp = await fetch("/checksession")
        if (!resp.ok) {
          throw Error("Bad Response")
        }
        const data = await resp.json()
        setLoggedIn(true)
        setUsername(data.username)
      }catch (error){
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
        setProfilePhotos(allPost.filter(e => userId == e.user_id))
      }catch (error){
        console.log("error")
      }
     
    }
    )();
  }, [])


  return (
    <main>
      {loggedIn ? <NavBar/> : console.log("hello")}
      <Routes>
        <Route path="/" element={loggedIn ? <Home/> : <Navigate replace to={"/login"} />}/>
        <Route path="profile" element={loggedIn ? <Profile user={username} setlogged={setLoggedIn} post={profilePhotos}/> : <Navigate replace to={"/login"} />}/>
        <Route path='groups' element={loggedIn ? <Groups/> : <Navigate replace to={"/login"} />}/>
        <Route path='login' element={<LogIn setUser={setUsername} setlogged={setLoggedIn} setUserId={setUserId}/>}/>
        <Route path="signup" element={<SignUp setuser={setUsername} setlogged={setLoggedIn} setUserId={setUserId}/>}/>
        <Route path="/create" element={<Create user={username} userId={userId}/>}/>
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


