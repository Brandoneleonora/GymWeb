import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import default_image from "./default.jpg"


function Search({ setViewUser, BASE_URL }) {
    const [searchList, setSearchList] = useState(false)
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`${BASE_URL}/users`)
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const viewProfile = (user) => {
        setViewUser(user)
        navigate('userProfile')
        
    }

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            if (user.username){
                return user.username.toLowerCase().includes(query.toLowerCase())
            }
        
    })
    }, [users, query])


    const showList = (e) => {
        setQuery(e.target.value)
    }

    const dontShowList = () => {
        setQuery('')
        setSearchList(false)
    }

    return(
        <>
        <div class="friendFinderWrapper" onClick={e => console.log(e.target)}>
            <div class="friendInputWrapper">
                <input value={query} onChange={showList} class='friendFinder' type="text" placeholder="Search..."/>
                <button onClick={dontShowList}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>    
            {query && <ul class="friendFinderList">
                {filteredUsers.map(user =>{
                    return(
                        <li class={"eachFriend"}>
                            <div>
                                <img src={user.profile_picture ? user.profile_picture : default_image}/>
                                <h3>{user.username}</h3>
                            </div>
                            <button onClick={() => viewProfile(user)}>View Profile</button>
                        </li>
                    )
                })}
                
                
            </ul>}
        </div>
        </>
    )
}



export default Search