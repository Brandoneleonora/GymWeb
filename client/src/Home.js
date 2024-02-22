import React, { useState } from "react";
import All_Group from "./All_Group";
import NavBar from "./NavBar.js"

function Home({createModal, setCreateModal}){
    return(
        <>
        <div class={`wrapper ${createModal ? "no_overflow": null}`}> 
            <NavBar createModal={createModal} setCreateModal={setCreateModal}/>
            <All_Group/>
        </div>
        </>
        
    )
}


export default Home