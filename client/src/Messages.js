import React, { useEffect, useState } from "react"
import NavBar from "./NavBar";
import default_image from "./default.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'

function Messages({createModal, setCreateModal, socket, user }) {
    const [chats, setChats] = useState()
    const [messages, setMessages] = useState()
    const [chatDetails, setChatDetails] = useState({
        chat_id: "",
        chat_name: "",
        chat_background: ""
    })

    const checkingEnter = (event) => {
        if (event.key == "Enter"){
            socket.connect()
            socket.emit("user_join", user.username)
            socket.emit("new_message", event.target.value)
            
            fetch(`messages/${chatDetails.chat_id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message_body: event.target.value,
                    message_user: user.username
                })
            })
                .then(res => res.json())
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => console.error("Error:", error));
                event.target.value = ''
        }

        
    }

    const chatClick = (chat) => {
        (async () => {
            try{
              const resp = await fetch(`/messages/${chat.id}`)
              if (!resp.ok) {
                throw Error("Bad Response")
              }
              const data = await resp.json()
              setMessages(data)
            }catch (error){
              console.log(error)
            }
          }
          )()

        setChatDetails({
            chat_id: chat.id,
            chat_name: chat.chat_name,
            chat_background: chat.chat_background ? chat.chat_background : default_image
        })
    }


    useEffect(() => {
        (async () => {
            try{
              const resp = await fetch(`/chats/${user.username}`)
              if (!resp.ok) {
                throw Error("Bad Response")
              }
              const data = await resp.json()
              setChats(data)
            }catch (error){
              console.log(error)
            }
           
          }
          )()

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
                    <div class="people-container-header">
                        <h2>Chats</h2>
                        <span><FontAwesomeIcon icon={faPenToSquare}/></span>
                    </div>
                    
                    <ul>
                        {chats && chats.map(chat => {
                            return(
                                <li onClick={() => chatClick(chat)}>
                                    <img src={default_image}/>
                                    <div>
                                        <span>{chat.chat_name}</span>
                                        <span>Something in here</span>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div class="people-messages-container">
                    <div class="chat-container">
                        {chatDetails && <div class="chat_header">
                            <img src={chatDetails.chat_background}/>
                            <h2>{chatDetails.chat_name}</h2>
                        </div>}
                        <ul id="chat-list">      
                            {messages && messages.map((m) => {
                                if(m.message_user == user.username){
                                    return(
                                        <li class="main-message">
                                            <span>{m.message_user}</span>
                                            <p>{m.message_body}</p>
                                        </li>
                                    )
                                }else{
                                    return(
                                        <li class="secondary-message">
                                            <span>{m.message_user}</span>
                                            <p>{m.message_body}</p>
                                        </li>
                                    )
                                }
                                
                            })}
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