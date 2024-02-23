import React from "react"
import blank from "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'

function Suggest_Friends(){
    return(
        <div class="content-wrapper">
            <div class="content-container">
                <div class="friend_header">
                    <h4>Friends</h4>
                    <button>See All</button>
                </div>
                <div class="friend_wrapper">
                    <div class="wrapper_header">
                        <div>
                            <img src={blank}/>
                        </div>
                        <div>
                            <h3>Brandon Eleonora</h3>
                            <p>10 Mutual Friends</p>
                        </div>
                        <button><FontAwesomeIcon icon={faMessage} size="xl"/></button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Suggest_Friends