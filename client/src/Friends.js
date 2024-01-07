import React from "react"
import blank from "./white.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

function Suggest_Friends(){
    return(
        <div class="content-wrapper">
            <div class="content-container">
                <div class="friend_header">
                    <h4>Friend Request</h4>
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
                        <div><FontAwesomeIcon icon={faUserPlus} size="lg"/></div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Suggest_Friends