import React, { createElement, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'


function Create({ user, createModal, setCreateModal }){
    const [image, setImage] = useState(true)
    const [imgSrc, setImgSrc] = useState("#")
    const [typeOfPost, setPostType] = useState("All")
    const [createFilter, setCreateFilter] = useState(false)




    const previewImage = (event) => {
        const file = event.target.files[0]

        if (file) {
            const fileReader = new FileReader()
            fileReader.onload = () => {
                setImgSrc(fileReader.result)
            }
            fileReader.readAsDataURL(file)
        }

        setImage(!image)
    }


    const backButton = (e) => {
        const input = document.getElementById("file")

        if (input.files) {
            setImage(!image)
        }
    }


    const closeCreate = (event) => {
        if (event.target == document.querySelector(".create-wrapper")) {
            setCreateModal(!createModal)
        }
    }

    const filterClick = (event) => {
        setCreateFilter(!createFilter)
        setPostType(event.target.innerHTML)
    }
    


    return (
        <div class="create-wrapper" onClick={closeCreate}>
        <button class={"create_exit"} onClick={() => setCreateModal(!createModal)}><span><FontAwesomeIcon icon={faX} size='xl' /></span></button>
            <div class="create-container">
                <div class="create-header">
                {image ? null : <button class="back_button" onClick={backButton}>Back</button>}
                    <h3>Share A Memory</h3>
                {image ? null : <button class="create_post" >Post</button>}
                </div>
                <div class="create-bottom">
                    <div class={`${image ? "bottom-default" : "bottom-image"}`}>
                        <input type="file" id="file" name="file"  accept="image/*" onChange={previewImage} onClick={event => event.target.value = null} hidden/>
                        {image ? null : <img id="previewImage" src={imgSrc} alt="previewImage"/> }
                        {!image && <div class="right-container">
                        <textarea class={"caption_holder"} placeholder="Caption Here..."></textarea>
                        <div class="filter-create">
                            <button onClick={() => setCreateFilter(!createFilter)}>{typeOfPost}{createFilter ? <span><FontAwesomeIcon icon={faAngleUp} size='xl' /></span> : <span><FontAwesomeIcon icon={faAngleDown} size='xl' /></span>}</button>
                             <ul onClick={filterClick} class={`create-filter-list ${createFilter ? "menu-active" : "menu-inactive"}`}>
                                <li>BodyBuilding</li>
                                <li>Powerlifting</li>
                                <li>CrossFit</li>
                                <li>Powerbuilder</li>
                                <li>Strongman</li>
                                <li>All</li>
                            </ul>
                        </div>
                       
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