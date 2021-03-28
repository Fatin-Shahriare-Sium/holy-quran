import React from 'react'
import Audiox from './audio';
import copy from "copy-to-clipboard";

let ShowAyath=(props)=>{
    // useEffect(()=>{
    //     let copyText=copy.current.innerText
      
      
    //     document.execCommand("copy");
    // },[])
 function copying(){
     console.log('Allah is Almighty');
     let forCopy=document.getElementById(`para${props.index}`)
     console.log(forCopy);
      copy(forCopy.innerText)
  }
    return(
        <>
       
        <div key={props.index} className='container-fluid ayath-shower mt-1'>
            <div className='row'>
                <div className='col-md-2 tools '>
                    <div className='tools-flex'>
                        <div className='tools-key'>
                            <p style={{color:'white'}}>{props.keyx}</p>
                        </div>
                        <div onClick={copying}  className='tools-play'>
                        <i style={{fontSize:'30px',color:'white',cursor:'pointer'}} class="fas fa-copy" ></i>
                  
                        </div>
                        <div className='tools-share'>
                        
                        <i style={{fontSize:'43px',color:'white'}} class="fas fa-share-alt-square"></i>
                        </div>

                    </div>
                </div>
                <div className="col-md-10 ayah-container-wrapper">
                    {
               <div className='ayah-container' style={{display:'flex',position:'relative'}}>{props.data&&props.data.map(
                (sig,index)=>sig.char_type_name==='end'?<p key={index} className='ayah-end data' data-log={sig.translation.text}>{sig.text_uthmani}</p>:<span id={index}><p className='data' data-log={sig.translation.text}>{sig.text_uthmani}</p>
                </span>
               
               )}</div>
            }

                 {
               <div id={`para${props.index}`} className='ayah-container-transilition' style={{display:'flex',position:'relative'}}>{props.text&&props.text[props.index].words.map(
                (sig,index)=>sig.char_type_name==='end'?'':<p className='px-1'>{sig.translation.text}</p>
                
               )}</div>
            }
            
            {props.audiox&&
            <Audiox id={props.audiox}/>
            }
           
                </div>
                
            </div>
        
        </div>
        </>
    )
}
export default ShowAyath;