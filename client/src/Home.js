import React from "react";
import Footer from "./Footer";
import All_Group from "./All_Group";
import Groups from "./Group.js"
import Suggest_Friends from "./Friends.js";

function Home(){

    return(
        <>
        <div class='wrapper'>
           <div>hello</div>
            <div>
                <Groups/>
                <All_Group/>
            </div>
            <Suggest_Friends/>
        </div>
        <section class="footer">
            <Footer/>
        </section>
        </>
        
    )
}


export default Home