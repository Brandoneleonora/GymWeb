import React, { useEffect, useState } from "react";
import Post from "./Posts";
import Suggest_Friends from "./Friends.js";


function All_Group(){
    const [post, setPost] = useState(null)

    useEffect(() => {
        fetch("/posts/all")
        .then(res => res.json())
        .then(data => setPost(data))
    },[])

    return(
        <div class="post-cont">
            <div class="post-wrapper">
                {post != null && post.map(p => {
                    return(
                        <Post caption={p.body} username={p.post_username} image={p.image}/>
                    )
                })}
            </div>
            <Suggest_Friends/>
        </div>
    )
}


export default All_Group