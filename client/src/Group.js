import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import builder from "./builder.jpg"
import crossfit from "./crossfit.jpg"
import power from "./power.jpg"
import powerbuilder from "./powerbuilder.jpg"
import workingout from "./working.jpg"
import all from "./all.jpg"


function Groups(){
    const navigate = useNavigate()

    useEffect(() => {
        const groups = document.querySelectorAll(".post-group")
        console.log(groups)
        for(let i = 0; i < groups.length; i++){
            groups[i].addEventListener("click", () => {
                navigate(`/posts/${(groups[i].childNodes[0].innerHTML).toLowerCase()}`)
            })
        }
    },[])



    return(
        <div class="group_wrapper">
            <div class="post-group bodybuilder">
                <h2>Bodybuilder</h2>
            </div>
            <div class="post-group powerlifter">
                <h2>Powerlifter</h2>
            </div>
            <div class="post-group powerbuilder">
                <h2>Powerbuilder</h2>
            </div >
            <div class="post-group crossfit">
                <h2>Crossfit</h2>
            </div>
            <div class="post-group workingout">
                <h2>Just Working Out</h2>
            </div>
            <div class="post-group all">
                <h2>All</h2>  
            </div>
      </div>
    )
}

export default Groups    
