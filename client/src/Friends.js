import React, { useEffect, useState } from "react"
import blank from "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

function Suggest_Friends({ user }){
    const [friends, setFriends] = useState([])


    useEffect(() => {
        fetch(`/${user.username}/friends`)
            .then(res => res.json())
            .then(data => setFriends(data))
    }, [])
   
    console.log(friends)

    return(
        <div class="content-wrapper">
            <div class="content-container">
                <div class="friend_header">
                    <h4>Friends</h4>
                    <button>See All</button>
                </div>
                <input type="search" placeholder="Search..."/>
                <div class="friend_wrapper">
                    <ul class="wrapper_header">
                        {friends && friends.map(friend =>{
                            return(
                                <li>
                                    <div>
                                        <img src={friend.profile_picture}/>
                                        <h3>{friend.username}</h3>
                                        <button><FontAwesomeIcon icon={faMessage} size="xl"/></button>
                                    </div>
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