import React, { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom"
import Carousel from 'react-simply-carousel';

function Groups(){
    const navigate = useNavigate()
    const [activeSlide, setActiveSlide] = useState(0);

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
        <div class="carousel-wrapper">
            <section class="group-grid">
                <div class="post-group">
                    <h2>Bodybuilder</h2>
                </div>
                <div class="post-group">
                    <h2>Powerlifter</h2>
                </div>
                <div class="post-group">
                    <h2>Powerbuilder</h2>
                </div >
                <div class="post-group">
                    <h2>Crossfit</h2>
                </div>
                <div class="post-group">
                    <h2>Just Working Out</h2>
                </div>
                <div class="post-group">
                    <h2>All</h2>   
                </div>
            </section>
        </div>
    )
}

export default Groups