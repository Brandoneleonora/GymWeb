import React, { useEffect, useState } from "react";
import Post from "./Posts";
import Suggest_Friends from "./Friends.js";
import Create_Post from "./Create_Post.js";
import Search from "./Search.js";

function All_Group({ BASE_URL, filterNav, allPost, setViewUser, user}){
    const [friends, setFriends] = useState([])
    const [likedPost, setLikedPost] = useState()

    useEffect(() => {
        fetch(`${user.username}/friends`)
            .then(res => res.json())
            .then(data => setFriends(data))
    }, [])

    useEffect(() => {
        (async () => {
          try{
            const resp = await fetch(`${user.username}/liked`)
            if (!resp.ok) {
              throw Error("Bad Response")
            }
            const data = await resp.json()
            setLikedPost(data)
          }catch (error){
            console.log(error)
          }
         
        }
        )();
      }, [])
    

    return(
        <div class="post-cont">
            <div class="post-wrapper">
                <Search BASE_URL={BASE_URL} setViewUser={setViewUser}/>
                <Create_Post user={user}/>
                {allPost && allPost.map(p => {
                    if (filterNav.toLowerCase() == "all" || filterNav.toLowerCase() == p.post_type) {
                      if(p.image != null){
                        return(likedPost && <Post post_id={p.id} caption={p.body} username={p.post_username} image={p.image} likes={p.likes} BASE_URL={BASE_URL} user={user} likedPost={likedPost}/>)      
                      }                  
                    }       
                })}
            </div>
            <Suggest_Friends friends={friends} setViewUser={setViewUser}/>
        </div>
    )
}


export default All_Group