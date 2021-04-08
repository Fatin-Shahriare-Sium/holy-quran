import React from 'react'
import { useParams } from 'react-router'
import err from '../assets/err.svg'
import SignalVersesLogic from './signal.verses.logic';
let SingleVerses=()=>{
    let {id}=useParams()
    return(
        // <SignalVersesLogic id={id}/>
            <div className='container-fluid'>
               
               
                <div className="row error-shower">
                    <div className="col-md-3 col-offset-2 text">
                    <h1>Sorry,We are working to fix errors.</h1>
                    </div>
                    <div className="col-md-4 col-offset-2">
                    <img  src={err} alt=''/>
                    </div>
                </div>
                
                
            </div>
    )
    
  
}
export default SingleVerses;