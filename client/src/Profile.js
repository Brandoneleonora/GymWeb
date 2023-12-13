import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import blank from "./white.jpg"


function Profile({ user, setlogged, post }){
    const [profile, setProfile] = useState("")
    const navigate = useNavigate()
    const [profilePhotos, setProfilePhotos] = useState(post.filter(p => user.id == p.user_id))

    useEffect(() => {
        fetch(`/profile/${user}`)
        .then(res => res.json())
        .then(data => {
            setProfile(data)
        })


       
    }, [])


    function handleOnClick(){
        fetch('/logout')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate("/login")
            setlogged(false)
        })
    }


    return(
        <div class="profile-wrapper">
            <div class="profile-container">
                <div class="left-container">
                    <div class="profile-image">
                        <img src={blank}/>
                        <span>{"Emanuel Smith"}</span>
                    </div>
                    <div class="right-header">    
                        <div class='profile-details'>
                            <ul>
                                <li><span>5</span>Follwers</li>
                                <li><span>200</span>Follwing</li>
                                <li><span>15</span>Posts</li>
                            </ul>
                        </div>
                        <div class="nav-btns">
                            <button>Edit Profile</button>
                            <button onClick={handleOnClick}>Log Out</button>
                        </div>  
                        <div class="profile-bio">
                            <h3>Bio</h3>
                            <p>Hey guys the world looks great when you suck so much dasfadsfasfdafdafdadfafdsafdafdafa</p>
                        </div>
                    </div>
                </div>
                <div class="right-container">
                    <div class="profile-navbar">
                        <div >
                            <h2>Photos</h2>
                        </div>
                    </div>
                    <div class="profile-photos">
                        <ul>
                            {profilePhotos.map(p => {
                                if(p.image !== null){
                                    return(
                                    <li><img src={p.image}/></li>
                                    )
                                }
                            })}  
                        </ul>
                       
                    </div>
                </div>
            </div>
        </div>
    )  
}


export default Profile

