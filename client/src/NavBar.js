import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { faCircleUser} from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faG } from '@fortawesome/free-solid-svg-icons'
import { faE } from '@fortawesome/free-solid-svg-icons'



function NavBar(){

    const [filterActive, setFilterActive] = useState(false)

    return(
        <div class="navbar-wrapper">
            <div class="navbar-container">
                <div class="top-navbar">
                    <NavLink to={'/'}><span>Gym</span><span>Eco.</span><span><FontAwesomeIcon icon={faG}/></span><span><FontAwesomeIcon icon={faE}/></span></NavLink>
                    <NavLink to={"/"}><FontAwesomeIcon icon={faHouse} size='xl'/><span>Home</span></NavLink>
                    <NavLink to={"/create"}><FontAwesomeIcon icon={faPlusCircle} size='xl'/><span>Create</span></NavLink>
                    <NavLink to={"/messages"}><FontAwesomeIcon icon={faMessage} size='xl'/><span>Messages</span></NavLink>  
                    <NavLink to={"/profile"}><FontAwesomeIcon icon={faCircleUser} size='xl'/><span>Profile</span></NavLink>
                    <div class="filter-container">   
                        <button class="filter-button" onClick={() => setFilterActive(!filterActive)}><FontAwesomeIcon icon={faFilter} size='xl'/><span>Filter</span><span class={`${filterActive ? "filter-down-active" : "filter-down-inactive"}`}><FontAwesomeIcon icon={faAngleDown} /></span><span class={`${filterActive ? "filter-up-active" : "filter-up-inactive"}`}><FontAwesomeIcon icon={faAngleUp} /></span></button>
                        <ul class={`filter-list ${filterActive ? "menu-active" : "menu-inactive"}`}>
                            <li>BodyBuilding</li>
                            <li>Powerlifting</li>
                            <li>CrossFit</li>
                            <li>Powerbuilder</li>
                            <li>Strongman</li>
                            <li>All</li>
                        </ul>
                    </div>
                </div>
                <div class="bottom-navbar">
                    <button><FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" /><span>Logout</span></button>
                    <button><FontAwesomeIcon icon={faBars} size={"xl"}/><span>Other</span></button>
                </div>
            </div>
        </div>
    )
}

export default NavBar