import React from "react";
import Footer from "./Footer";
import All_Group from "./All_Group";
import Groups from "./Group.js"
import Suggest_Friends from "./Friends.js";

function Home(){

    return(
        <>
        <div class='wrapper'>
           <div class="left_wrapper">
                <Groups/>
            </div>
            <div class="middle_wrapper">
                <div class="bottom-portion">
                    <All_Group/>
                </div>
            </div>
            <div class="right_wrapper">
                <Suggest_Friends/>
            </div>
        </div>
        <section class="footer">
            <Footer/>
        </section>
        </>
        
    )
}


export default Home