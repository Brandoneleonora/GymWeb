import React, { useState, useEffect, useMemo } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'


function Search() {
    const [searchList, setSearchList] = useState(false)
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("users")
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            if (user.username){
                return user.username.toLowerCase().includes(query.toLowerCase())
            }
        
    })
    }, [users, query])


    const showList = () => {
        if (searchList === false){
            setSearchList(!searchList)
        }     
    }

    const dontShowList = () => {
        if (searchList === true){
            setSearchList(!searchList)
            setQuery('')
        }     
    }


    return(
        <>
        <div class="friendFinderWrapper" onClick={e => console.log(e.target)}>
            <div class="friendInputWrapper">
                <input onClick={showList} value={query} onChange={e => setQuery(e.target.value)} class='friendFinder' type="text" placeholder="Search..."/>
                <button onClick={dontShowList}><FontAwesomeIcon icon={faXmark} size="xl"/></button>
            </div>    
            {searchList && <ul class="friendFinderList">
                {filteredUsers && filteredUsers.map(user =>{
                    return(
                        <li class={"eachFriend"}>
                            <div>
                                <img src={user.profile_picture}/>
                                <h3>{user.username}</h3>
                            </div>
                            <button>View Profile</button>
                        </li>
                    )
                })}
                
                
            </ul>}
        </div>
        </>
    )
}



export default Search