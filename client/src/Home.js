import React, { useState } from "react";
import All_Group from "./All_Group";
import NavBar from "./NavBar.js"
import Create from "./Create.js";

function Home(){
    const [createModal, setCreateModal] = useState(false)

    console.log(createModal)

    return(
        <>
        {createModal ? <Create createModal={createModal} setCreateModal={setCreateModal}/> : null}
        <div class={`wrapper ${createModal ? "no_overflow": null}`}> 
            <NavBar createModal={createModal} setCreateModal={setCreateModal}/>
            <All_Group/>
        </div>
        </>
        
    )
}


export default Home