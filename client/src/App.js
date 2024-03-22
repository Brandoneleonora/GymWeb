import React, { useState, useEffect } from "react";
import "./App.css"
import {Routes, Route, useNavigate} from 'react-router-dom'
import SignUp from "./SignUp";
import Home from "./Home";
import LogIn from "./LogIn";
import Profile from "./Profile";
import Messages from "./Messages";
import Create from "./Create";
import User_Profile from "./UserProfile";



function App() {
  const [user, setUser] = useState(null)
  const [viewUser, setViewUser] = useState('')
  const [allPost, setAllPost] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const BASE_URL = "https://gymweb-s9ic.onrender.com"
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      try{
        const resp = await fetch(`/me`)
        if (!resp.ok) {
          throw Error("Bad Response")
        }
        const data = await resp.json()
        setUser(data)
      }catch (error){
        console.log(error)
        navigate('login')
      }
     
    }
    )();
  }, [])


  useEffect(() => {
    (async () => {
      try{
        const resp = await fetch(`/home`)
        if (!resp.ok) {
          throw Error("Bad Response")
        }
        const data = await resp.json()
        setAllPost(data.reverse())
      }catch (error){
        console.log(error)
      }
     
    }
    )();
  }, [])

  
  
  return (
    <main>
      {createModal ? <Create BASE_URL={BASE_URL} user={user} createModal={createModal} setCreateModal={setCreateModal}/> : null}
      <Routes>
        <Route path="/" element={<Home BASE_URL={BASE_URL} setViewUser={setViewUser} user={user} createModal={createModal} setCreateModal={setCreateModal} allPost={allPost} setAllPost={setAllPost}/>}/>
        <Route path="profile" element={user && < Profile BASE_URL={BASE_URL} setUser={setUser} user={user} post={allPost} createModal={createModal} setCreateModal={setCreateModal}/>}/>
        <Route path='login' element={<LogIn BASE_URL={BASE_URL} setUser={setUser}/>}/>
        <Route path="signup" element={<SignUp BASE_URL={BASE_URL} setUser={setUser}/>}/>
        <Route path="messages" element={user && <Messages BASE_URL={BASE_URL} createModal={createModal} setCreateModal={setCreateModal}/>}/>
        <Route path='userProfile' element={user && <User_Profile BASE_URL={BASE_URL} allPost={allPost} viewUser={viewUser} user={user} />}/>
      </Routes>
    </main>
   
  )
}


export default App;


