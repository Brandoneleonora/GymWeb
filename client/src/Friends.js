import React, { useState, useMemo, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import blank from "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

function Suggest_Friends({  user, setViewUser  }){
    const [query, setQuery] = useState('')
    const [friends, setFriends] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`/${user.username}/friends`)
            .then(res => res.json())
            .then(data => setFriends(data))
    }, [])


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
                                        <img src={friend.profile_picture} onClick={() => viewProfile(friend)}/>
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