import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

let Verses=({verses})=>{
    let[search,setSearch]=useState('')
    let[versesx,setVersesx]=useState('')
    useEffect(()=>{
        let arr=[]
    for(var i=1;i<=verses.verses_count;i++){
        arr.push(i)
    }
    setVersesx(arr)
    },[verses])
    function filtered(){
      
        return versesx&& versesx.filter(sig=>sig.toString().toLowerCase().includes(search.toLowerCase()))
        
       
    }
    return(
        <div className='verses-details--container'>
            <input onChange={(event)=>setSearch(event.target.value)} type='text' placeholder='Search Verses'/>
            <div className='scroll'>
               
            {versesx&&
                filtered().map((sig,index)=><div key={index} className='verses-details'><Link key={index} to={`/single/verses/${verses.id}:${sig}`}><p style={{color:'white'}}>{`verses ${sig}`}</p></Link></div>)
            }
            </div>
        </div>
    )
}
export default Verses;