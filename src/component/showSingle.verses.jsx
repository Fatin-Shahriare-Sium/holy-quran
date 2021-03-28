import React,{useEffect, useState} from 'react'
import axios from 'axios'
import copy from "copy-to-clipboard";   
import Loading from './loading'
import { useParams } from 'react-router'
let SingleVerses=()=>{
    let {id}=useParams()
    let [info,setInfo]=useState('')
    let[load,setLoad]=useState(true)
    
    useEffect(()=>{
        axios.get(`https://api.quran.com/api/v4/verses/by_key/${id}?language=en&words=true&word_fields=text_uthmani`).then(res=>{
            
            setInfo(res.data.verse)
            console.log(res);
        })
        setTimeout(() => {
            setLoad(false)
        }, 1000);
    },[id])
    function copying(){
        let ayath=document.getElementById('ayath')
        copy(ayath.textContent)
        
        console.log(ayath);
    }
  
    return(
          <>
        
          {
              load?<Loading/>:<div className='container-fluid ayath-shower mt-1'>
              <div className='row'>
                  <div className='col-md-2 tools '>
                      <div className='tools-flex'>
                          <div className='tools-key'>
                              <p style={{color:'white'}}>{info.verse_key}</p>
                          </div>
                          <div onClick={copying}  className='tools-play'>
                          <button data-clipboard-target="#need" className='btn btn-dark'>
                          <i style={{fontSize:'43px',color:'white'}} class="fas fa-copy"></i>
                          </button>
                         
                          </div>
                          <div className='tools-share'>
                          
                          <i style={{fontSize:'43px',color:'white'}} class="fas fa-share-alt-square"></i>
                          </div>
  
                      </div>
                  </div>
                  <div className="col-md-10 ayah-container-wrapper">
                      {
                 <div id='ayath' style={{direction:'rtl'}} className='ayah-container'>{info.words.map(
                  (sig,index)=>sig.char_type_name==='end'?<p id='need' key={index} className='ayah-end data' data-log={sig.translation.text}>{sig.text_uthmani}</p>:<span id={index}><p className='data' data-log={sig.translation.text}>{sig.text_uthmani}</p>
                  </span>
                 
                 )}</div>
              }
  
                   {
                 <div className='ayah-container-transilition' style={{display:'flex',position:'relative'}}>{info.words.map(
                  (sig,index)=>sig.char_type_name==='end'?'':<p key={index} className='px-1'>{sig.translation.text}</p>
                  
                 )}</div>
              }
              
              <audio controls>
                  <source src={`https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${info.id}`} type="audio/mpeg"/>
              </audio>
            
                  </div>
                  
              </div>
          
         </div>
          }
       
          
          </>
    )
}
export default SingleVerses;