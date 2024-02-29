import React, { useState } from "react";
import Post from "./Posts";
import Suggest_Friends from "./Friends.js";
import Create_Post from "./Create_Post.js";

function All_Group({filterNav, allPost, setAllPost}){

    return(
        <div class="post-cont">
            <div class="post-wrapper">
                <Create_Post/>
                {allPost != null && allPost.map(p => {
                    if (filterNav.toLowerCase() == "all") {
                        return(
                            <Post caption={p.body} username={p.post_username} image={p.image}/>
                            )                        
                    }
                    else if (filterNav.toLowerCase() == p.post_type){
                       return(
                        <Post caption={p.body} username={p.post_username} image={p.image}/>
                        )
                    }
                    
                })}
            </div>
            <Suggest_Friends/>
        </div>
    )
}


export default All_Group