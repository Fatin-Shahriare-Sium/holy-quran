import React from 'react'
import { useParams } from 'react-router'
import SignalVersesLogic from './signal.verses.logic';
let SingleVerses=()=>{
    let {id}=useParams()
    return(
        <SignalVersesLogic id={id}/>
    )
    
  
}
export default SingleVerses;