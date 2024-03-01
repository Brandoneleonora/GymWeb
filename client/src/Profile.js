import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import whiteblank from "./road.jpg"
import ProfileModal from "./ProfileModal"
import NavBar from "./NavBar.js"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'



function Profile({ setUser, user, setlogged, post, createModal, setCreateModal }){
    const navigate = useNavigate()
    const profilePhotos = post.filter(p => user.id === p.user_id)
    const [showModal, setShowModal] = useState(false)
    const [profileValues, setProfileValues] = useState({
        backgroundSrc: user.background_image,
        editButton: false,
        profileSrc: user.profile_picture,
        username: user.username,
        email: user.email,
        bio: user.bio,
        lift_type: user.lift_type,
        followers: user.followers,
        following: user.following
    })
    

    useEffect(() => {
        if (profileValues.backgroundSrc !== user.background_image){
            fetch(`profile/${user.username}`, {
                method: 'PATCH',
                headers: {"Content-type": 'application/json'},
                body: JSON.stringify({
                    background_image: profileValues.backgroundSrc
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }
        else if (profileValues.profileSrc !== user.profile_picture){
            fetch(`profile/${user.username}`, {
                method: 'PATCH',
                headers: {"Content-type": 'application/json'},
                body: JSON.stringify({
                    profile_picture: profileValues.profileSrc
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }
        else if (profileValues.bio !== user.profile_picture){
            fetch(`profile/${user.username}`, {
                method: 'PATCH',
                headers: {"Content-type": 'application/json'},
                body: JSON.stringify({
                    profile_picture: profileValues.profileSrc
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }

        else if (profileValues.email !== user.profile_picture){
            fetch(`profile/${user.username}`, {
                method: 'PATCH',
                headers: {"Content-type": 'application/json'},
                body: JSON.stringify({
                    profile_picture: profileValues.profileSrc
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }

        else if (profileValues.lift_type !== user.profile_picture){
            fetch(`profile/${user.username}`, {
                method: 'PATCH',
                headers: {"Content-type": 'application/json'},
                body: JSON.stringify({
                    profile_picture: profileValues.profileSrc
                })
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setUser(data)
            })
        }
        
    },[profileValues])
    


    const handleLogOut = () =>{
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
                setProfileValues({...profileValues, backgroundSrc: fileReader.result})
            }
            fileReader.readAsDataURL(file)
        }

       

    }


    const changeProfileImage = (event) => {
        const file = event.target.files[0]

        if (file) {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setProfileValues({...profileValues, profileSrc: fileReader.result})
            }
            fileReader.readAsDataURL(file)
        }

    }

    const editProfileButton = () => {
        setProfileValues({...profileValues, editButton: !profileValues.editButton})
    }



    return(
        <>                
        {showModal && <ProfileModal setShowModal={setShowModal} showModal={showModal}/>}
            <div class={`profile-wrapper ${showModal && "no-overflow"}`}>
                <NavBar createModal={createModal} setCreateModal={setCreateModal}/>
                <div class="profile-container">
                    <div class="image-container">
                        <img src={profileValues.backgroundSrc}/>
                        <input type="file" id="file" name="file"  accept="image/*" onChange={changeBackroundImage} onClick={event => event.target.value = null} hidden/>
                        <label for="file"><span><FontAwesomeIcon icon={faImage} /><span>Choose Image</span></span></label>
                    </div>
                    <div class="bottom-container">
                        <div class="person-container">
                            <div class="person-image" onMouseEnter={editProfileButton} onMouseLeave={editProfileButton}>
                                <img src={profileValues.profileSrc}/>
                                <input type="file" id="profile" name="profile"  accept="image/*" onChange={changeProfileImage} onClick={event => event.target.value = null} hidden/>
                                {profileValues.editButton && <label for="profile" class="edit_image">Edit Image</label>}
                            </div>
                            <div class="about-container">
                                <h2>{user.username}</h2>
                                <p>{profileValues.lift_type}</p>
                                <p>{profileValues.email}</p>
                            </div>
                            <ul class="numbers-container">
                                <li><span>{profileValues.followers}</span><span>Followers</span></li>
                                <li><span>{profileValues.following}</span><span>Following</span></li>
                                <li><span>{profilePhotos.length}</span><span>Posts</span></li>
                            </ul>
                            <div class="bio-container">
                                <p>{user.bio}</p>

                            </div>
                            
                        </div>
                        <div class="photo-container">
                            <div class="profile-navbar">
                                <ul>
                                    <li><span>Photos</span></li>
                                    <li><span>Saved</span></li>
                                    <li><span>Liked </span></li>
                                    <li><span onClick={() => setShowModal(!showModal)}>Edit Profile</span></li>
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
        </>
    )  
}


export default Profile

