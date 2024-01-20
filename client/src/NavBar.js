import React from 'react'
import { NavLink } from 'react-router-dom'
import blank from "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser} from '@fortawesome/free-solid-svg-icons'

function NavBar(){
    return(
        <div class="navbar-container">
            <NavLink to={'/'}><span>Gym</span><span>Eco.</span></NavLink>
            <NavLink to={"/"}><FontAwesomeIcon icon={faHouse} size='xl'/><span>Home</span></NavLink>
            <NavLink to={"/create"}><FontAwesomeIcon icon={faPlusCircle} size='xl'/><span>Create</span></NavLink>
            <NavLink to={"/messages"}><FontAwesomeIcon icon={faComment} size='xl'/><span>Messages</span></NavLink>  
            <NavLink to={"/profile"}><FontAwesomeIcon icon={faCircleUser} size='xl'/><span>Profile</span></NavLink>
        </div>
    )
}

export default NavBar