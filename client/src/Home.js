import React from "react";
import bodybuilding from "./bodybuilding.jpg"
import powerlift from "./powerlift.jpg"
import cross from "./crossfit.jpg"
import all from "./all.jpg"
import powerbuild from "./powerbuild.jpg"
import work from "./workingout.jpg"
import Footer from "./Footer";

function Home(){

    return(
        <div class='wrapper'>
            <section class="init-image">
                <div>
                    <h1>Train, Connect, Share</h1>
                </div>
                
            </section>
            <section class="bodybuilding-section section-styles">
                <div class="grid-descriptions">
                    <h2>Bodybuilding</h2>
                    <span>The practice of enhancing ones physique by gaining muscle through resistance training</span>
                </div>
                <div class="section-images">
                    <img src={bodybuilding}/>
                </div>
            </section>
            <section class="powerlifting-section section-styles">
                <div class="section-images">
                    <img src={powerlift}/>
                </div>
                <div class="grid-descriptions">
                    <h2>Powerlifting</h2>
                    <span>Trying to become as strong as possible on the three major compound movments squat, bench, deadlift with not much concern for muscles and aestetic </span>
                </div>
            </section>
            <section class="powerbuilding section section-styles">
                <div class="grid-descriptions">
                    <h2>Powerbuilding</h2>
                    <span>Trying to become as strong as possible on the three major compound movments squat, bench, deadlift but, at the same time trying to build some muscles</span>
                </div>
                <div class="section-images">
                    <img src={powerbuild}/>
                </div>
            </section>
            <section class="crossfit-section section-styles">
                <div class="section-images">
                    <img src={cross}/>
                </div>
                <div class="grid-descriptions">
                    <h2>Crossfit</h2>
                    <span>High-intensity exercise program with challenging, heart-pumping movements majority will be compound movements</span>
                </div>
            </section>
            <section class="all-section section-styles">
                <div class="grid-descriptions">
                    <h2>Just Working Out</h2>
                    <span>You dont consider yourself any special type of lifter you're just working out to stay healthy</span>
                </div>
                <div class="section-images">
                    <img src={work}/>
                </div>
            </section>
            <section class="workingout-section section-styles">
                <div class="section-images">
                    <img src={all}/>
                </div>
                <div class="grid-descriptions">
                    <h2>All</h2>
                    <span>All of us together</span>
                </div>
            </section>
            <section class="footer">
                <Footer/>
            </section>
        </div>
    )
}


export default Home