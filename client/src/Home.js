import React, { useState, useEffect } from "react";
import All_Group from "./All_Group";
import NavBar from "./NavBar.js"
import Search from "./Search.js";

function Home({user, createModal, setCreateModal, filterNav, setFilterNav, allPost, setAllPost}){


    return(
        <>
            <div class={`${createModal ? "no_overflow": "wrapper"}`}> 
                <Search/>
                <NavBar createModal={createModal} setCreateModal={setCreateModal} filterNav={filterNav} setFilterNav={setFilterNav}/>
                <All_Group user={user} filterNav={filterNav} allPost={allPost} setAllPost={setAllPost}/>
            </div>
        </>
        
    )
}


export default Home