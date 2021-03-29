import React,{useEffect, useState} from 'react'
import axios from 'axios'
import copy from "copy-to-clipboard";   
import Loading from './loading'
import { useParams } from 'react-router'
let SingleVerses=()=>{
    let {id}=useParams()
    let [info,setInfo]=useState('')
    let[load,setLoad]=useState(true)
    let[text,setText]=useState('')
    useEffect(()=>{
        axios.get(`http://api.alquran.cloud/v1/ayah/${id}/ar.alafasy`).then(res=>{
            
            setInfo(res.data.data)
            console.log(res);
        })
        axios.get(`http://api.alquran.cloud/v1/ayah/${id}/en.asad`).then(res=>{
            console.log(res.data.data.text);
            setText(res.data.data.text)
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
                              <p style={{color:'white'}}>{id}</p>
                          </div>
                          <div onClick={copying}  className='tools-play'>
                          <button data-clipboard-target="#need" className='btn btn-dark'>
                          <i style={{fontSize:'43px',color:'white'}} className="fas fa-copy"></i>
                          </button>
                         
                          </div>
                          <div className='tools-share'>
                          
                          <i style={{fontSize:'43px',color:'white'}} class="fas fa-share-alt-square"></i>
                          </div>
  
                      </div>
                  </div>
                  <div className="col-md-10 ayah-container-wrapper">
                      
                 <div id='ayath' style={{direction:'rtl'}} className='ayah-container'>
                     <p>{info.text}</p>
                  </div>

                 <div className='ayah-container-transilition' style={{display:'flex',position:'relative'}}>
                     <p>{text}</p>
                </div>
        
              
              <audio controls>
                  <source src={info.audio} type="audio/mpeg"/>
              </audio>
             
                  </div>
                  
              </div>
          
         </div>
          }
       
          
          </>
    )
}
export default SingleVerses;