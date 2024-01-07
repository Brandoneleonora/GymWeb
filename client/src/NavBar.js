import React from 'react'
import { NavLink } from 'react-router-dom'
import blank from "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'


function NavBar(){
    return(
        <div class="navbar-container">
            <div class="navbar-logo">
                <NavLink to={'/'}><span>Gym</span><span>Eco.</span></NavLink>
            </div>
            <div class='navbar-options'>
                <NavLink to={"/"}><FontAwesomeIcon icon={faHouse} size='xl'/></NavLink>
                <NavLink to={"/create"}><FontAwesomeIcon icon={faPlusCircle} size='xl'/></NavLink>
                <NavLink to={"/messages"}><FontAwesomeIcon icon={faComment} size='xl'/></NavLink>  
                <NavLink to={"/profile"}><img src={blank}/></NavLink>
            </div>
        </div>
    )
}

export default NavBar