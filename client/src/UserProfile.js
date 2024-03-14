import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"
import blank from "./white.jpg"


function User_Profile({ viewUser, allPost, user }){
    const userPhotos = allPost.filter(p => viewUser.id === p.user_id)
    const [userValues, setUserValues] = useState({
        backgroundSrc: viewUser.background_image,
        profileSrc: viewUser.profile_picture,
        username: viewUser.username,
        email: viewUser.email,
        bio: viewUser.bio,
        lift_type: viewUser.lift_type,
        followers: viewUser.followers,
        following: viewUser.following
    })
    const [isFriend, setIsFriend] = useState(false)
    const BASE_URL = "https://gymweb-s9ic.onrender.com"


    useEffect(() => {
        fetch(`${BASE_URL}/${user.username}/friends`)
            .then(res => res.json())
            .then(data => {
                data.forEach((e) => {
                    if (e.username === viewUser.username){
                        setIsFriend(true)
                    }
                })
            })
    }, [])   
    
    
        return(
        <> 
        <div class={`profile-wrapper`}>
            <NavBar/>
            <div class="profile-container">
                <div class="image-container">
                    <img src={userValues.backgroundSrc}/>
                </div>
                <div class="bottom-container">
                    <div class="person-container">
                        <div class="person-image">
                            <img src={userValues.profileSrc}/>
                        </div>
                        <div class="about-container">
                            <h2>{userValues.username}</h2>
                            <p>{userValues.lift_type}</p>
                            <p>{userValues.email}</p>
                        </div>
                        <ul class="numbers-container">
                            <li><span>{userValues.followers}</span><span>Followers</span></li>
                            <li><span>{userValues.following}</span><span>Following</span></li>
                            <li><span>{userPhotos.length}</span><span>Posts</span></li>
                        </ul>
                        <div class="bio-container">
                            <p>{userValues.bio}</p>

                        </div>
                        
                    </div>
                    <div class="photo-container">
                        <div class="profile-navbar">
                            <ul>
                                <li><span>Photos</span></li>
                                <li><span>Saved</span></li>
                                <li><span>Liked </span></li>
                            </ul>
                            {isFriend ? <button>Unfriend</button>: <button>Add Friend</button>}
                        </div>
                        <div class="profile-images">
                            <ul>
                                {userPhotos.map(p => {
                                    if (p.image == null) {
                                        return <li><img src={blank}/></li>
                                    }else {
                                        return <li><img src={p.image} /></li>
                                    }
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        </>
        )
}


export default User_Profile