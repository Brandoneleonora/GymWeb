import React from "react";
import Footer from "./Footer";
import All_Group from "./All_Group";
import Groups from "./Group.js"
function Home(){

    return(
        <div class='wrapper'>
            <Groups/>
            <All_Group/>
            <section class="footer">
                <Footer/>
            </section>
        </div>
    )
}


export default Home