import React, { createElement, useState } from "react"
import white from  "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'


function Create({ user, createModal, setCreateModal }){
    const [image, setImage] = useState(true)
    const [typeOfPost, setPostType] = useState("")


    const previewImage = (event) => {
        const file = event.target.files[0]
        const imageContainer = document.getElementById("previewImage")

        if (file) {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                imageContainer.src = fileReader.result
            }
            fileReader.readAsDataURL(file)
        }

        setImage(!image)
    }


    const backButton = () => {
        const input = document.getElementById("file")

        if (input.files) {
            setImage(!image)
        }
    }
    
    return (
        <div class="create-wrapper">
        <button class={"create_exit"} onClick={() => setCreateModal(!createModal)}><span><FontAwesomeIcon icon={faX} size='xl' /></span></button>
            <div class="create-container">
                <div class="create-header">
                {image ? null : <button class="back_button" onClick={backButton}>Back</button>}
                    <h3>Share A Memory</h3>
                {image ? null : <button class="create_post" >Post</button>}
                </div>
                <div class="create-bottom">
                    <div class={`${image ? "bottom-default" : "bottom-image"}`}>
                        <input type="file" id="file" name="file"  accept="image/*" onChange={previewImage} hidden/>
                        {image ? <img id="previewImage" src="#" alt="previewImage" hidden/> : <img id="previewImage" src="#" alt="previewImage"/> }
                        {!image && <div class="right-container">
                        <textarea class={"caption_holder"} placeholder="Caption Here..."></textarea>
                        </div>}    
                        <div class="create_default">
                            {image && <span><FontAwesomeIcon icon={faImage} size='xl' /></span>}
                            {image && <label for="file">Check Files</label>}
                        </div>
                        
                    </div>    
                </div>
                
            </div>   
        </div>
    )
    }

export default Create