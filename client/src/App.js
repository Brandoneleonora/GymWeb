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
  const [user, setUser] = useState('')
  const [viewUser, setViewUser] = useState('')
  const [friends, setFriends] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [allPost, setAllPost] = useState(null)
  const [createModal, setCreateModal] = useState(false)
  const navigate = useNavigate()
  const [filterNav, setFilterNav] = useState("All")

  // useEffect(() => {
  //   (async () => {
  //     try{
  //       const resp = await fetch("/checksession")
  //       if (!resp.ok) {
  //         throw Error("Bad Response")
  //       }
  //       const data = await resp.json()
  //       setLoggedIn(true)
  //       setUser(data)
  //     }catch (error){
  //       navigate('login')
  //       console.log("error")
  //     }
     
  //   }
  //   )();
  // }, [])


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

  console.log(viewUser)
  
  
  return (
    <main>
      {createModal ? <Create createModal={createModal} setCreateModal={setCreateModal}/> : null}
      <Routes>
        <Route path="/" element={<Home setViewUser={setViewUser} user={user} createModal={createModal} setCreateModal={setCreateModal} filterNav={filterNav} setFilterNav={setFilterNav} allPost={allPost} setAllPost={setAllPost}/>}/>
        <Route path="profile" element={<Profile setUser={setUser} user={user} setlogged={setLoggedIn} post={allPost} createModal={createModal} setCreateModal={setCreateModal}/>}/>
        <Route path='login' element={<LogIn setUser={setUser} setlogged={setLoggedIn} />}/>
        <Route path="signup" element={<SignUp setUser={setUser} setlogged={setLoggedIn}/>}/>
        <Route path="messages" element={<Messages createModal={createModal} setCreateModal={setCreateModal}/>}/>
        <Route path='userProfile' element={<User_Profile allPost={allPost} viewUser={viewUser}/>}/>
      </Routes>
    </main>
   
  )
}


export default App;


