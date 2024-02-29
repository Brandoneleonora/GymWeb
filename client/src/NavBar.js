import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
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
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faMoon } from '@fortawesome/free-solid-svg-icons'



function NavBar({setCreateModal, createModal, filterNav, setFilterNav}){
    const [darkMode, setDarkMode] = useState(true)
    const [filterActive, setFilterActive] = useState(false)
    const navigate = useNavigate()


    const changeFilter = (e) => {
        setFilterNav(e.target.innerHTML)
        setFilterActive(!filterActive)
    }


    const logout = () => {
        fetch("/logout")
            .then(res => res.json())
            .then(data => {
                console.log(data)
                navigate('/login')
            })
    }

    return(
        
        <div class="navbar-wrapper">
            <div class="navbar-container">
                <div class="top-navbar">
                    <NavLink to={'/'}><span>Gym</span><span>Eco.</span><span><FontAwesomeIcon icon={faG}/></span><span><FontAwesomeIcon icon={faE}/></span></NavLink>
                    <NavLink to={"/"}><FontAwesomeIcon icon={faHouse} size='xl'/><span>Home</span></NavLink>
                    <button onClick={()=>{setCreateModal(!createModal)}}><FontAwesomeIcon icon={faPlusCircle} size='xl'/><span>Create</span></button>
                    <NavLink to={"/messages"}><FontAwesomeIcon icon={faMessage} size='xl'/><span>Messages</span></NavLink>  
                    <NavLink to={"/profile"}><FontAwesomeIcon icon={faCircleUser} size='xl'/><span>Profile</span></NavLink>
                    {darkMode ?
                    <button onClick={() => {
                        document.body.classList.toggle("dark-mode")
                        setDarkMode(!darkMode)
                    }}><FontAwesomeIcon icon={faSun} size='xl'/><span>Light Mode</span></button> :
                    <button onClick={() => {
                        document.body.classList.toggle("dark-mode")
                        setDarkMode(!darkMode)
                    }} ><FontAwesomeIcon icon={faMoon} size='xl'/><span>Dark Mode</span></button>
                    }
                    <div class="filter-container">   
                        <button class="filter-button" onClick={() => {setFilterActive(!filterActive)}}><FontAwesomeIcon icon={faFilter} size='xl'/><span>{filterNav}</span>{filterActive ? <span><FontAwesomeIcon icon={faAngleUp} /></span> : <span><FontAwesomeIcon icon={faAngleDown} /></span>}</button>
                        <ul class={`filter-list ${filterActive ? "menu-active" : "menu-inactive"}`} onClick={changeFilter}>
                            <li>BodyBuilding</li>
                            <li>Powerlifter</li>
                            <li>CrossFit</li>
                            <li>Powerbuilder</li>
                            <li>Strongman</li>
                            <li>All</li>
                        </ul>
                    </div>
                </div>
                <div class="bottom-navbar">
                    <button onClick={logout}><FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" /><span>Logout</span></button>
                    <button><FontAwesomeIcon icon={faBars} size={"xl"}/><span>Other</span></button>
                </div>
            </div>
        </div>
    )
}

export default NavBar