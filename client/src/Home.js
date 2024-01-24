import React from "react";
import Footer from "./Footer";
import All_Group from "./All_Group";
import Groups from "./Group.js"
import Suggest_Friends from "./Friends.js";
import NavBar from "./NavBar.js"

function Home(){

    return(
        <>
        <div class='wrapper'>
            <NavBar/>
            <All_Group/>
            <Suggest_Friends/>
        </div>
        </>
        
    )
}


export default Home