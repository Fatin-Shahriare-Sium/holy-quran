import React from 'react'

let Footer=()=>{
let date=new Date()
let year=date.getFullYear()
    return(
        <div className='container-fluid footer'>
            <div className='footer-container'>
            <p>All Rights Reserved By © al-quran.com {year}</p>

            </div>
        </div>
    )
}
export default Footer;