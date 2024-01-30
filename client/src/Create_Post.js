import React from "react"
import blank from "./black.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'

function Create_Post() {
    return(
        <div class="create_post_wrapper">
            <div class="create_post_container">
                <div class="create_post_header">
                    <div>
                        <img src={blank}/>
                    </div>
                    <div>
                        <input placeholder="What's on your mind?"/>
                    </div>    
                </div>
                <div class="create_post_bottom">
                    <ul>
                        <li><button><FontAwesomeIcon icon={faImage} /><span>Image</span></button></li>
                        <li><button><FontAwesomeIcon icon={faVideo} /><span>Video</span></button></li>
                        <li><button><FontAwesomeIcon icon={faPaperclip} /><span>Audio</span></button></li>
                        <li><button>Post</button></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}



export default Create_Post