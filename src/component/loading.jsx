import React from 'react'

let Loading=()=>{
    return(
        <div className='loader'>
            <div class="spinner-grow" style={{width: '3rem', height: '3rem'}} role="status">
                
</div>
<p style={{fontSize:'2rem',position:'absolute',top:'57%'}}>...Loading</p>
        </div>
    )
}
export default Loading;