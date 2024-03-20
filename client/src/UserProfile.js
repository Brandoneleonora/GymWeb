import React, { useState, useEffect } from "react"
import NavBar from "./NavBar"


function User_Profile({ BASE_URL, viewUser, allPost, user }){
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


    useEffect(() => {
        fetch(`/${user.username}/friends`)
            .then(res => res.json())
            .then(data => {
                data.forEach((e) => {
                    console.log(e.username)
                    if (e.username === viewUser.username){
                        setIsFriend(true)
                    }
                })
            })
    }, [])   


    const addFriend = () => {
        fetch(`/${user.username}/friends`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: userValues.username,
                user_id: user.id,
            })
        })
            .then(res => res.json())
            .then((data) => {
                console.log("Success:", data)
                setIsFriend(!isFriend)
            })
            .catch((error) => console.error("Error:", error));
    }

const unAddFriend = () => {
    console.log("not my friend anymore")
} 


    
    
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
                            {isFriend ? <button onClick={unAddFriend}>Unfriend</button>: <button onClick={addFriend}>Add Friend</button>}
                        </div>
                        <div class="profile-images">
                            <ul>
                                {userPhotos.map(p => {
                                    if (p.image != null) {
                                        return <li><img src={p.image}/></li>
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