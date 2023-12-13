import React, { useState } from "react"
import white from  "./white.jpg"
function Create({ user }){
    const [image, setImage] = useState("")
    const [typeOfPost, setPostType] = useState("")

        
    function previewFile(){
        const inputFile = document.querySelector('#upload-image')
        const chosenImage = document.querySelector("#chosen-image")
        const nxtBtn = document.querySelector(".post-button")
        const cancel = document.querySelector(".cancel-button")
       
        const reader = new FileReader()
        reader.readAsDataURL(inputFile.files[0])

        reader.onload = () => {
            chosenImage.src = reader.result;
            setImage(reader.result)
            nxtBtn.classList.add("active")
            cancel.classList.add("active")

        }
    }

    function removeActive(){
        const caption = document.querySelector(".caption-field")
        const inputButton = document.querySelector("#upload-button")
        const imageContainer = document.querySelector(".image-container")
        const cancel = document.querySelector(".cancel-button")
        const backBtn = document.querySelector(".back-button")
        const fnlBtn = document.querySelector(".final-button")
        const nxtBtn = document.querySelector(".post-button")
        const postType = document.querySelector(".type-dropdown")

        postType.classList.remove("active")
        inputButton.classList.remove("active")
        caption.classList.remove("active")     
        imageContainer.classList.remove("active")  
        cancel.classList.add("active")
        backBtn.classList.remove("active")
        fnlBtn.classList.remove("active")
        nxtBtn.classList.add("active")
        
    }

    function nextActive(){
        const postType = document.querySelector(".type-dropdown")
        const caption = document.querySelector(".caption-field")
        const inputButton = document.querySelector("#upload-button")
        const imageContainer = document.querySelector(".image-container")
        const nxtBtn = document.querySelector(".post-button")
        const fnlBtn = document.querySelector(".final-button")
        const backBtn = document.querySelector(".back-button")
        const cancel = document.querySelector(".cancel-button")
        

        postType.classList.add("active")
        inputButton.classList.add("active")
        caption.classList.add("active")     
        imageContainer.classList.add("active")  
        nxtBtn.classList.remove("active")
        fnlBtn.classList.add("active")
        backBtn.classList.add("active")
        cancel.classList.remove("active")
    }

    function originalPost(){
        const cancel = document.querySelector(".cancel-button")
        const nxtBtn = document.querySelector(".post-button")
        const chosenImage = document.querySelector("#chosen-image")

        chosenImage.src = white
        cancel.classList.remove("active")
        nxtBtn.classList.remove("active")
    }

    function sumbitRequest(){
        const postType = document.querySelector(".type-dropdown")
        const caption = document.querySelector(".caption-field").value
        const fnlBtn = document.querySelector(".final-button")
        const backBtn = document.querySelector(".back-button")
        const inputButton = document.querySelector("#upload-button")
        const imageContainer = document.querySelector(".image-container")
        const user_caption = document.querySelector(".caption-field")
        const chosenImage = document.querySelector("#chosen-image")

        fetch(`/posts/${typeOfPost}`,{
            method: 'POST',
            headers: {"Content-type": "application/json"},
            body:  JSON.stringify({
                post_type: typeOfPost,
                post_username : user.username,
                image: image,
                body: caption,
                user: user.id
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            user_caption.value = ''
            
        })
        postType.classList.remove("active")
        inputButton.classList.remove("active")
        user_caption.classList.remove("active")     
        imageContainer.classList.remove("active")
        fnlBtn.classList.remove("active")
        backBtn.classList.remove("active")  
        chosenImage.src = white
    }
        

    return(
        <div class="create-wrapper">
            <div class="create-container">
                <section class="create-header">
                    <h1>New Post</h1>
                    <button class="post-button" onClick={nextActive}>Next</button>
                    <button class="back-button" onClick={removeActive}>&#8592;</button>
                    <button class="final-button" onClick={sumbitRequest}>Post</button>
                    <button class="cancel-button" onClick={originalPost}>Cancel</button>
                </section>
                <section class="image-container">
                    <div>
                        <img id="chosen-image" src={white}/>
                        <input type="file" id="upload-image" onChange={previewFile}/>
                        <label for="upload-image" id="upload-button" >
                            Upload Image
                        </label>
                    </div>
                    <div>
                        <textarea class="caption-field" placeholder="Post Caption..." />
                        <select onChange={e => setPostType(e.target.value)} class="type-dropdown">
                            <option value="">--Choose Post Type--</option>
                            <option value="powerlifter">PowerLifter</option>
                            <option value="bodybuilder">Bodybuilding</option>
                            <option value="powerbuilder">Powerbuilding</option>
                            <option value="crossfit">Crossfit</option>
                            <option value="workingout">Just Working Out</option>
                            <option value="all">All</option>
                        </select>
                    </div>
                </section>
            </div>
        </div>
    )
}



export default Create