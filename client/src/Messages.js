import React from "react"
import NavBar from "./NavBar";
import blank from "./white.jpg"
import blackblank from "./black.jpg"

function Messages() {
    return(
        <div class="messages-wrapper">
            <NavBar/>
            <div class="messages-container">
                <div class='people-container'>
                    <ul>
                        <li>
                            <img src={blank}/>
                            <span>Kristen</span>
                        </li>
                        <li>
                            <img src={blackblank}/>
                            <span>Kristen Eleonora</span>
                        </li>
                        <li>
                            <img src={blank}/>
                            <span>Kristen Eleonora</span>
                        </li>
                        <li>
                            <img src={blackblank}/>
                            <span>Kristen Eleonora</span>
                        </li>
                    </ul>
                </div>
                <div class="people-messages">
                    <div class="people-messages-container">
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
                            <li class="secondary-message">
                                <span>Kristen</span>
                                <p>Pretty Good</p>
                            </li>                            
                            <li class="secondary-message">
                                <span>Kristen</span>
                                <p>Pretty Good</p>
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
                            <li class="secondary-message">
                                <span>Kristen</span>
                                <p>Pretty Good</p>
                            </li>                                                    
                        </ul>
                    </div>
                    <div class="input-message-container">
                        <input placeholder={"Send Message..."}/>
                        <button>Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;