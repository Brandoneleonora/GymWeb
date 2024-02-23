import React, { useState } from "react";
import All_Group from "./All_Group";
import NavBar from "./NavBar.js"

function Home({createModal, setCreateModal, filterNav, setFilterNav}){
    return(
        <>
        <div class={`wrapper ${createModal ? "no_overflow": null}`}> 
            <NavBar createModal={createModal} setCreateModal={setCreateModal} filterNav={filterNav} setFilterNav={setFilterNav}/>
            <All_Group filterNav={filterNav}/>
        </div>
        </>
        
    )
}


export default Home