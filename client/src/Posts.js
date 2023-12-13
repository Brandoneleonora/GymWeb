import React from "react";


function Post({ caption, username, image}){

    console.log(caption, username)
    
    return(
        <div class="post-container">
            <div class="post-header">
                <p>{username}</p>
                <p>Edit</p>
            </div>
            <img src={image} class="post-image"/>
            <div class="post-caption">
                <div class="post-buttons">
                    <div class="left-buttons">
                        <p>Heart</p>
                        <p>Comment</p>
                    </div>
                    <div class="right-buttons">
                        <p>Share</p>
                    </div>
                </div>
                <div class="user-caption">
                    <div class="user-likes">
                        <p><span>200</span>Likes</p>
                    </div> 
                    <div class="post-words">
                        <p><span>{username}</span>{caption}</p>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Post