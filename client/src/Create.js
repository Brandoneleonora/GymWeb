import React, { useState } from "react"
import white from  "./white.jpg"
function Create({ user, createModal, setCreateModal }){
    const [image, setImage] = useState("")
    const [typeOfPost, setPostType] = useState("")

    return (
        <div class="create-wrapper" onClick={() => setCreateModal(!createModal)}>
            <div class="create-container">
                <div class="create-header">
                    <h3>Share A Memory</h3>
                </div>
                <div class="create-bottom">
                    <button>Check Files</button>
                </div>
            </div>
        </div>
    )
    }

export default Create