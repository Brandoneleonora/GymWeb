import React, { useEffect, useRef, useState } from "react"
import NavBar from "./NavBar";
import default_image from "./default.jpg"

function Messages({createModal, setCreateModal, socket}) {

    const checkingEnter = (event) => {
        if (event.key == "Enter"){
            socket.connect()
            socket.emit("new_message", event.target.value)
            event.target.value = ''
        }
        
    }

    useEffect(() => {
        socket.on("chat", (data) => {
            let ul = document.getElementById("chat-list")
            let li = document.createElement("li")
            let span = document.createElement("span")
            let p = document.createElement("p")
            const nodes = [span , p]
            li.classList.add("main-message")
            for(let i=0; i < nodes.length; i++){
                if (nodes[i] == p){
                    nodes[i].innerHTML = data["message"]
                }
                else if (nodes[i] == span){
                    nodes[i].innerHTML = "Brandon"
                }
                li.appendChild(nodes[i])
            }
            ul.appendChild(li)
                    })
    },[])

    

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
                        <ul id="chat-list">      
             
                        </ul>
                        <div class="input-message-container">
                            <input onKeyUp={(event)=> checkingEnter(event)} placeholder={"Send Message..."}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Messages;