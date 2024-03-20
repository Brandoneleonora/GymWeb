import React, { useEffect, useState } from "react";
import Post from "./Posts";
import Suggest_Friends from "./Friends.js";
import Create_Post from "./Create_Post.js";

function All_Group({ BASE_URL, filterNav, allPost, setViewUser, user}){
    const [friends, setFriends] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}/${user.username}/friends`)
            .then(res => res.json())
            .then(data => setFriends(data))
    }, [])

    

    return(
        <div class="post-cont">
            <div class="post-wrapper">
                <Create_Post user={user}/>
                {allPost && allPost.map(p => {
                    if (filterNav.toLowerCase() == "all" || filterNav.toLowerCase() == p.post_type) {
                      if(p.image != null){
                        return(<Post post_id={p.id} caption={p.body} username={p.post_username} image={p.image} likes={p.likes} BASE_URL={BASE_URL} user={user}/>)      
                      }                  
                    }       
                })}
            </div>
            <Suggest_Friends friends={friends} setViewUser={setViewUser}/>
        </div>
    )
}


export default All_Group