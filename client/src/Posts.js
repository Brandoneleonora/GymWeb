import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function Post({ BASE_URL, allPost,  caption, username, image, likes}){

    const [ open, setOpen ] = useState(false)
    const [ liked , setLiked ] = useState(false)

    useEffect(() => {
        (async () => {
          try{
            const resp = await fetch(`${BASE_URL}/${username}/liked`)
            if (!resp.ok) {
              throw Error("Bad Response")
            }
            const data = await resp.json()
            console.log(data)
          }catch (error){
            console.log(error)
          }
         
        }
        )();
      }, [])


    return(
        <div class="post-container">
            <div class="post-header">
                <div>
                    <p>{username}</p>
                </div>
                <div class="header_right">
                    <button class={`icon_btn `} onClick={() => setOpen(!open)}><FontAwesomeIcon icon={faEllipsis} size={"xl"} /></button>
                    <ul class={`edit_list ${open ? "active" : "inactive"}`}>
                        <li><button><FontAwesomeIcon icon={faBookmark} size={"xl"} /><span>Save</span></button></li>
                        <li><button><FontAwesomeIcon icon={faEdit} size={"xl"} /><span>Edit</span></button></li>
                        <li><button><FontAwesomeIcon icon={faTrash} size={"xl"} /><span>Delete</span></button></li>
                    </ul>
                </div>
                
            </div>
            <img src={image} class="post-image"/>
            <div class="post-caption">
                <div class="post-buttons">
                    <div class="left-buttons">
                        <button onClick={() => setLiked(!liked)} class={`heart_btn ${liked ? "liked" : "notLiked"}`}><FontAwesomeIcon icon={faHeart} size={"xl"} /></button>
                        <button><FontAwesomeIcon icon={faComment} size={"xl"} /></button>
                    </div>
                    <div class="right-buttons">
                    <button><FontAwesomeIcon icon={faShare} size={"xl"} /></button>
                    </div>
                </div>
                <div class="user-caption">
                    <div class="user-likes">
                        <p><span>{likes}</span>Likes</p>
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