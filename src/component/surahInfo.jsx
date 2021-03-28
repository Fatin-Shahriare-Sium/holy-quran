
import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router'
let SurahInfo=()=>{
    let {id}=useParams()
    let data=useRef()
    let[chapter,setChapter]=useState('')
    useEffect(()=>{
        axios.get(`https://api.quran.com/api/v4/chapters/${id}/info?language=en`).then(res=>{
           
            
            data.current.innerHTML=res.data.chapter_info.text
        })
        console.log(data);
        axios.get(`https://api.quran.com/api/v4/chapters/${id}?language=en`).then(res=>{
            setChapter(res.data.chapter)
            console.log(res.data.chapter);
        })
    },[])
   
    return(
        <div className='container-fluid surah-info'>
            <div>
                {
                    chapter && <div className='surah-info__start'>
                        <h1>{chapter.name_simple}</h1>
                        <h2>{`Verses: ${chapter.verses_count}`}</h2>
                        
                        <h3>{`${chapter.revelation_place}`}</h3>
                    </div>
                }
            </div>
            <div className='surah-info__text' ref={data}>
               
            </div>
          
        </div>
    )
}
export default SurahInfo;