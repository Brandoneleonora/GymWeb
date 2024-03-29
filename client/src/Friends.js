import React, { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import default_image from "./default.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

function Suggest_Friends({ friends, setViewUser}){
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    
    
    const viewProfile = (user) => {
        setViewUser(user)
        navigate('userProfile')
        
    }


    const filteredFriends = useMemo(() => {
        return friends.filter(friend => {
            if (friend.username){
                return friend.username.toLowerCase().includes(query.toLowerCase())
            }
        
    })
    }, [friends, query])


    return(
        <div class="content-wrapper">
            <div class="content-container">
                <div class="friend_header">
                    <h4>Friends</h4>
                </div>
                <input value={query} onChange={(e) => setQuery(e.target.value)} type="search" placeholder="Search..."/>
                <div class="friend_wrapper">
                    <ul class="wrapper_header">
                        {filteredFriends && filteredFriends.map(friend =>{
                            return(
                                <li>
                                    <div>
                                        <img src={friend.profile_picture ? friend.profile_picture : default_image} onClick={() => viewProfile(friend)}/>
                                        <h3>{friend.username}</h3>
                                    </div>
                                    <button><FontAwesomeIcon icon={faMessage} size="xl"/></button>
                                </li>
                            )
                        })}
                        
                        
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default Suggest_Friends