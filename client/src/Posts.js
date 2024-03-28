import React, { useState, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart} from '@fortawesome/free-solid-svg-icons'
import { faComment } from '@fortawesome/free-solid-svg-icons'
import { faShare } from '@fortawesome/free-solid-svg-icons'
import { faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { faBookmark } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


function Post({ savedPost, likedPost, user, post_id ,BASE_URL ,  caption, username, image, likes}){

    const [ open, setOpen ] = useState(false)
    const [ liked , setLiked ] = useState(false)
    const [likeNumber, setLikeNumber] = useState(likes == null ? 0 : likes)
    const [save, setSave] = useState("Save")

    useEffect(() => {
        if(likedPost){
            likedPost.map(post => {
                if (post.id == post_id){
                    setLiked(true)
                }
            })
        }
       
        if(savedPost){
            savedPost.map(post => {
                if (post.id == post_id){
                    setSave("Unsave")
                }
            })
        }
    },[])


    const saveImage = () => {
        if (save == "Save"){
            fetch(`${post_id}/${user.username}/save_unsave`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.error("Error:", error));
            setSave("Unsave")
        }
        else {
            fetch(`${post_id}/${user.username}/save_unsave`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify()
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => console.error("Error:", error));
            setSave("Save")
            }
    }



    const likedPicture = () => {

        fetch (`post/${post_id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: likeNumber + 1
            })
        })    
            .then(res => res.json())
            .then((data) => {
                console.log("Success", data)
            })

        fetch(`${post_id}/${user.username}/like_unlike`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.error("Error:", error));

            setLiked(!liked)
            setLikeNumber(likeNumber + 1)
        
    }

    const unlikedPicture = () => {

        fetch (`post/${post_id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: likeNumber - 1
            })
        })  
            .then(res => res.json())
            .then((data) => {
                console.log("Success:", data)
            })


        fetch(`${post_id}/${user.username}/like_unlike`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify()
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data)
            })
            .catch((error) => console.error("Error:", error));

            setLiked(!liked)
            setLikeNumber(likeNumber - 1)

    }

    return(
        <div class="post-container">
            <div class="post-header">
                <div>
                    <p>{username}</p>
                </div>
                <div class="header_right">
                    <button class={`icon_btn `} onClick={() => setOpen(!open)}><FontAwesomeIcon icon={faEllipsis} size={"xl"} /></button>
                    <ul class={`edit_list ${open ? "active" : "inactive"}`}>
                        {user.username != username && <li><button onClick={saveImage}><FontAwesomeIcon icon={faBookmark} size={"xl"} /><span>{save}</span></button></li>}
                        {user.username == username && <li><button><FontAwesomeIcon icon={faEdit} size={"xl"} /><span>Edit</span></button></li>}
                        {user.username == username && <li><button><FontAwesomeIcon icon={faTrash} size={"xl"} /><span>Delete</span></button></li>}
                    </ul>
                </div>
                
            </div>
            <img src={image} class="post-image"/>
            <div class="post-caption">
                <div class="post-buttons">
                    <div class="left-buttons">
                        {liked && liked ? <button onClick={unlikedPicture} class={`heart_btn liked`}><FontAwesomeIcon icon={faHeart} size={"xl"} /></button>
                        : <button onClick={likedPicture} class={`heart_btn notLiked`}><FontAwesomeIcon icon={faHeart} size={"xl"} /></button>}
                        <button><FontAwesomeIcon icon={faComment} size={"xl"} /></button>
                    </div>
                    <div class="right-buttons">
                    <button><FontAwesomeIcon icon={faShare} size={"xl"} /></button>
                    </div>
                </div>
                <div class="user-caption">
                    <div class="user-likes">
                        <p><span>{likeNumber}</span>Likes</p>
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