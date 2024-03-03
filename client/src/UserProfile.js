import React,{ useState } from "react"
import { useNavigate } from "react-router-dom"
import NavBar from "./NavBar"
import blank from "./white.jpg"


function User_Profile({ viewUser, allPost }){
    const navigate = useNavigate()
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