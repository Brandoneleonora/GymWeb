import React from 'react'
import { NavLink } from 'react-router-dom'



function NavBar(){
    return(
        <div class="navbar-container">
            <div class="navbar-logo">
                <NavLink to={'/'}><span>Gym</span><span>Eco.</span></NavLink>
            </div>
            <div class='navbar-options'>
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={'/groups'}>Groups</NavLink>
                <NavLink to={"/create"}>Create</NavLink>
                <NavLink to={"/profile"}>Profile</NavLink>
            </div>
        </div>
    )
}

export default NavBar