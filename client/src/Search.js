import React, { useState, useEffect, useMemo } from "react"



function Search() {
    const [query, setQuery] = useState('')
    const [users, setUsers] = useState([])
    const [searchList, setSearchList] = useState(false)

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
        return setSearchList(!searchList)
    }
    console.log(searchList)

    return(
        <>
        <div class="friendFinderWrapper">
            <input onClick={showList} value={query} onChange={e => setQuery(e.target.value)} class='friendFinder' type="search" placeholder="Search..."/>
            {searchList && <ul class="friendFinderList">
                {filteredUsers && filteredUsers.map(user =>{
                    return(
                        <li>
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