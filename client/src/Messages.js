import React from "react"
import NavBar from "./NavBar";
import default_image from "./default.jpg"

function Messages({createModal, setCreateModal}) {
    return(
        <div class="messages-wrapper">
            <NavBar createModal={createModal} setCreateModal={setCreateModal}/>
            <div class="messages-container">
                <div class='people-container'>
                    <ul>
                        <li>
                            <a href={'#'}>
                                <img src={default_image}/>
                                <span>Kristen</span>
                            </a>  
                        </li>
                        <li>
                            <a href={'#'}>
                                <img src={default_image}/>
                                <span>Kristen Eleonora</span>
                            </a>  
                        </li>
                    </ul>
                </div>
                <div class="people-messages-container">
                    <div class="chat-container">
                        <ul>
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>
                            <li class="secondary-message">
                                <span>Kristen</span>
                                <p>Pretty Good</p>
                            </li>
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>                            
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>                                             
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>
                            <li class="secondary-message">
                                <span>Kristen</span>
                                <p>Pretty Good</p>
                            </li>
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>                            
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>                                             
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>
                            <li class="secondary-message">
                                <span>Kristen</span>
                                <p>Pretty Good</p>
                            </li>
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>                            
                            <li class="main-message">
                                <span>Brandon</span>
                                <p>How are you doing today?</p>
                            </li>                                             
                        </ul>
                        <div class="input-message-container">
                            <input placeholder={"Send Message..."}/>
                            <button>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;