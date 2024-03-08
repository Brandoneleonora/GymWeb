import React from "react";
import Post from "./Posts";
import Suggest_Friends from "./Friends.js";
import Create_Post from "./Create_Post.js";

function All_Group({filterNav, allPost, setViewUser, user}){
    
    return(
        <div class="post-cont">
            <div class="post-wrapper">
                <Create_Post user={user}/>
                {allPost != null && allPost.map(p => {
                    if (filterNav.toLowerCase() == "all") {
                        if(p.image != null){
                            return(
                                <Post caption={p.body} username={p.post_username} image={p.image}/>
                                )      
                        }                  
                    }
                    else if (filterNav.toLowerCase() == p.post_type){
                        if(p.image != null){
                            return(
                                <Post caption={p.body} username={p.post_username} image={p.image}/>
                            )
                        }
                       
                    }
                    
                })}
            </div>
            <Suggest_Friends setViewUser={setViewUser} user={user}/>
        </div>
    )
}


export default All_Group