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
  const [filterNav, setFilterNav] = useState("All")
  const navigate = useNavigate()


  useEffect(() => {
    (async () => {
      try{
        const resp = await fetch("/me")
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
        const resp = await fetch("/home")
        if (!resp.ok) {
          throw Error("Bad Response")
        }
        const data = await resp.json()
        setAllPost(data)
      }catch (error){
        console.log(error)
      }
     
    }
    )();
  }, [])

  
  
  return (
    <main>
      {createModal ? <Create user={user} createModal={createModal} setCreateModal={setCreateModal}/> : null}
      <Routes>
        <Route path="/" element={user && <Home setViewUser={setViewUser} user={user} createModal={createModal} setCreateModal={setCreateModal} filterNav={filterNav} setFilterNav={setFilterNav} allPost={allPost} setAllPost={setAllPost}/>}/>
        <Route path="profile" element={user && <Profile setUser={setUser} user={user} post={allPost} createModal={createModal} setCreateModal={setCreateModal}/>}/>
        <Route path='login' element={<LogIn setUser={setUser}/>}/>
        <Route path="signup" element={<SignUp setUser={setUser}/>}/>
        <Route path="messages" element={user && <Messages createModal={createModal} setCreateModal={setCreateModal}/>}/>
        <Route path='userProfile' element={user && <User_Profile allPost={allPost} viewUser={viewUser} user={user} />}/>
      </Routes>
    </main>
   
  )
}


export default App;


