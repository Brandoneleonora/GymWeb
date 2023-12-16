import React from "react"


function ProfileModal({ setShowModal, showModal }){


    const closeModal = () => {
        setShowModal(!showModal)
    }

    const closeModalWithOverlay = () => {
            setShowModal(!showModal)
    }

    return(
        <div class="profileModal-overlay" onClick={closeModalWithOverlay}>
            <div class="profileModal-container">
                <h2>Account details</h2>
                <form>
                <label>First Name<input/></label>
                <label>Last Name<input/></label>
                <label>Username<input/></label>
                <label>Lifter Type<input/></label>
                <label>Bio<input/></label>
                <label>Gender<input/></label>
                <div>
                    <button onClick={closeModal}>Close</button>
                </div>
                </form>    

                
            </div>
        </div>
      
    )
}


export default ProfileModal