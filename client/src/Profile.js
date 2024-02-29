import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import landscape from "./landscape.jpg"
import whiteblank from "./road.jpg"
import profile from "./profile.jpg"
import ProfileModal from "./ProfileModal"
import NavBar from "./NavBar.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'



function Profile({ user, setlogged, post, createModal, setCreateModal }){
    const navigate = useNavigate()
    const profilePhotos = post.filter(p => user.id === p.user_id)
    const [showModal, setShowModal] = useState(false)
    const [backgroundSrc, setBackgroundSrc] = useState(user.background_image)
    const [profileSrc, setProfileSrc] = useState(user.profile_picture)

    console.log(profileSrc)

    function handleLogOut(){
        fetch('/logout')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            navigate("/login")
            setlogged(false)
        })
    }

    
    const changeBackroundImage = (event) => {
        const file = event.target.files[0]

        if (file) {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setBackgroundSrc(fileReader.result)
            }
            fileReader.readAsDataURL(file)
        }

    }

    return(
        <div class="profile-wrapper">
            <NavBar createModal={createModal} setCreateModal={setCreateModal}/>
            {showModal && <ProfileModal setShowModal={setShowModal} showModal={showModal}/>}
            <div class="profile-container">
                <div class="image-container">
                    <img src={backgroundSrc}/>
                    <input type="file" id="file" name="file"  accept="image/*" onChange={changeBackroundImage} onClick={event => event.target.value = null} hidden/>
                    <label for="file"><span><FontAwesomeIcon icon={faImage} /><span>Choose Image</span></span></label>
                </div>
                <div class="bottom-container">
                    <div class="person-container">
                        <img src={profileSrc}/>
                        <div class="about-container">
                            <h2>{user.username}</h2>
                            <p>{user.lift_type}</p>
                            <p>{user.email}</p>
                        </div>
                        <ul class="numbers-container">
                            <li><span>{user.followers}</span><span>Followers</span></li>
                            <li><span>{user.following}</span><span>Following</span></li>
                            <li><span>{profilePhotos.length}</span><span>Posts</span></li>
                        </ul>
                        <div class="bio-container">
                            <p>Bio</p>

                        </div>
                        
                    </div>
                    <div class="photo-container">
                        <div class="profile-navbar">
                            <ul>
                                <li><span>Photos</span></li>
                                <li><span>Saved</span></li>
                                <li><span>Liked </span></li>
                                <li><span>Edit Profile</span></li>
                            </ul>
                            <button onClick={handleLogOut}>Log Out</button>
                        </div>
                        <div class="profile-images">
                            <ul>
                                {profilePhotos.map(p => {
                                    if (p.image == null) {
                                        return <li><img src={whiteblank}/></li>
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
    )  
}


export default Profile

