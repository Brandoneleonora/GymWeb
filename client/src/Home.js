import React, { useState, useEffect } from "react";
import All_Group from "./All_Group";
import NavBar from "./NavBar.js"
import Search from "./Search.js";

function Home({ setViewUser, user, createModal, setCreateModal, allPost, setAllPost, BASE_URL}){
    const [filterNav, setFilterNav] = useState("All")

    return(
        <>
            <div class={`${createModal ? "no_overflow": "wrapper"}`}> 
                <NavBar createModal={createModal} setCreateModal={setCreateModal} filterNav={filterNav} setFilterNav={setFilterNav}/>
                <All_Group user={user} filterNav={filterNav} allPost={allPost} setAllPost={setAllPost} setViewUser={setViewUser} BASE_URL={BASE_URL}/>
            </div>
        </>
        
    )
}


export default Home