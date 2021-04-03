import axios from 'axios';
import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useParams } from 'react-router';
import {Link} from 'react-router-dom'
import Loading from './loading';
import ShowAyath from './showAyath'
import Verses from './verses';
import {Modal,ModalBody,ModalHeader} from 'reactstrap'
let Mainx=()=>{
    let {id}=useParams()
    let nav=useRef()
    let[back,setBack]=useState(false)
    let[searchValue,setSearchValue]=useState('')
  let Actions={
        SET_DATA:'set-data',
        UPDATE_DATA:'update-data',
        pageNumIncrease:'set-page-num',
        pageNumReduce:'page-reduce',
        SET_VERSE:'set-verse',
        SET_CHAPTER:'set-chapter',
        ALL_CHAPTER:'all_chapter',
        TOOGLEX:'toggle-show',
        SET_SHOW:'show',
        SHOW_VERSES:'show-verses',
        TOGGLE_VERSES:'toggle-verses',
        CHANGE_LANGUAGE:'change-language',
        SET_MODAL:'modal-set',
        SET_ERROR:'error'
    }
    let reducer=(state,action)=>{
        if(action.type===Actions.SET_DATA){
            return {
                ...state,
                data:action.payload.data,
                verseLength:action.payload.verseLength,
                loading:action.payload.loading,
                
            }
        }else if(action.type===Actions.pageNumIncrease){
            return{
                ...state,
                currentPage:state.currentPage+1
            }
        }else if(action.type===Actions.pageNumReduce){

            return{
                ...state,
                currentPage:state.currentPage>=0?state.currentPage-1:state.currentPage
            }
        }else if(action.type===Actions.SET_CHAPTER){
            return{
                ...state,
                chapter:action.payload.chapter,
                currentPage:1
            }
        }else if(action.type===Actions.ALL_CHAPTER){
            return  {
                ...state,
                all:action.payload.all
            }
        }else if(action.type===Actions.TOOGLEX){
            return  {
                ...state,
                show:action.payload
            }
        }else if(action.type===Actions.SET_SHOW){
            return{
                ...state,
                show:action.payload
            }
        }else if(action.type===Actions.SHOW_VERSES){
            return{
                ...state,
                verses:action.payload,
            }
        }else if(action.type===Actions.TOGGLE_VERSES){
            return{
                ...state,
                verses:action.payload
            }
        }else if(action.type===Actions.CHANGE_LANGUAGE){
            return{
                ...state,
                transLanguage:action.payload
            }
        }else if(action.type===Actions.SET_MODAL){
            return{
                ...state,
                modal:action.payload
            }
        }else if(action.type===Actions.SET_ERROR){
            return{
                ...state,
                loading:true
            }

        }

        return state;
    }

    let [state,dispatch]=useReducer(reducer,{currentPage:1,loading:true,show:false,verses:false,transLanguage:'de',modal:false})

    useEffect(()=>{
      return  axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=${state.transLanguage}&words=true&word_fields=text_uthmani&page=${state.currentPage}&per_page=10`).then(res=>
       
        {
            let arr=[]
            for(let i=0;i<res.data.verses.length;i++){
                
                arr.push(i)
                
                
            }
            
            arr.splice(arr.length,0)
           
            dispatch({type:Actions.SET_DATA,payload:{data:res.data.verses,verseLength:arr,loading:false}})
          
       




        }
       
        ).catch(error=>{
            dispatch({type:Actions.SET_ERROR})
        })
       
    },[state.currentPage, id, state.transLanguage, Actions.SET_DATA, Actions.SET_ERROR])
   useEffect(()=>{
   return axios.get(`https://api.quran.com/api/v4/chapters/${id}?language=en`).then(res=>
    dispatch({type:Actions.SET_CHAPTER,payload:{chapter:res.data.chapter}})
   ).catch(error=>{
       dispatch({type:Actions.SET_ERROR})
   })
   },[Actions.SET_CHAPTER, Actions.SET_ERROR, id])


   useEffect(()=>{
   return axios.get('https://api.quran.com/api/v4/chapters?language=en').then(res=>{
            dispatch({type:Actions.ALL_CHAPTER,payload:{all:res.data.chapters}})
    }).catch(error=>{
        dispatch({type:Actions.SET_ERROR})
    })
    
 },[Actions.ALL_CHAPTER, Actions.SET_ERROR])

   
    
    function filterdChapter(){
        return state.all && state.all.filter((sig,index)=>sig.name_simple.toLowerCase().includes(searchValue.toLowerCase()) )
        
    }


    function change(){
        
       
        if(window.scrollY>=0){
            setBack(true)
        }else{
            setBack(false)
        }

    }


    window.addEventListener('scroll',change)
    let next=()=>{
        dispatch({type:Actions.pageNumIncrease})
    }
    let pre=()=>{
        dispatch({type:Actions.pageNumReduce})
    }

    function versesKey(i){
        return state.data[i].verse_key
        
     }

    function  audiox(i){
         return state.data[i].id
     }
   
    function toggleShow(){
        if(state.modal===false){
            dispatch({type:Actions.TOOGLEX,payload:!state.show})
            dispatch({type:Actions.SHOW_VERSES ,payload:false})
        }
        
       
    }

    function toggleVerses(){
        if(state.modal===false){
            dispatch({type:Actions.TOGGLE_VERSES ,payload:!state.verses})
        dispatch({type:Actions.SET_SHOW,payload:false})
        }
        console.log('toggle');
    }
    let changeLanguage=(e)=>{
       
        dispatch({type:Actions.CHANGE_LANGUAGE,payload:e.target.value})
        dispatch({type:Actions.SET_MODAL,payload:!state.modal})
        
    }
    function toggleModal(){
        dispatch({type:Actions.SET_MODAL,payload:!state.modal})
        dispatch({type:Actions.SHOW_VERSES ,payload:false})
        dispatch({type:Actions.SET_SHOW,payload:false})
    }
    return(
        <div style={{backgroundColor:'black'}} className='container-all'>

        <div ref={nav} className={back?'container-all__navbar container-all__navbar__back--color':'container-all__navbar'}>
          <div onClick={toggleShow} className='container-all__navbar--current-surah '>
          {
                state.chapter&&<div  className="controller_capter-info">
                <p>{state.chapter.name_simple}</p><p>{state.chapter.translated_name.name}</p>
                
                </div>
            
            } 
           
          </div>

         

          <div onClick={toggleVerses} className='container-all__navbar--verses'>
            <p>verse1</p>
            
          </div>
          <div style={{cursor:'pointer'}} className='container-all__navbar--surah-info'>
          <div onClick={toggleModal}>
          <i style={{fontSize:'2rem'}} class="fas fa-ellipsis-v"></i>
          </div>
          <div>
          <Modal   isOpen={state.modal}>
              <ModalHeader toggle={toggleModal}>
              <p  style={{fontWeight:'bolder',letterSpacing:'4px'}}>More Details</p>
              </ModalHeader>
              <ModalBody>
                  <p style={{fontWeight:'bolder',letterSpacing:'2px',fontSize:'2rem'}}>See the details of this surah</p>
              <Link to={`/info/${id}`}><button className='container-all__navbar--surah-info--modal mb-4'>Surah Info</button></Link>
              <h2><b>Change Transilation language:</b></h2>
              <select onChange={(event)=>{changeLanguage(event)}} style={{width:'300px',fontSize:'2rem'}}>
                <option value="en">English</option>
                  <option value='bn'>Bangla</option>
                  <option value='ur'>Urdu</option>
              </select>
              </ModalBody>
          </Modal>
          </div>
                
            
          </div>
          
        </div>


        <div style={state.show?{display:'block'}:{display:'none'}} className='container-all__tabs'>
        <input type='text' className='my-3' placeholder='Search Surah' onChange={(event)=>setSearchValue(event.target.value)}/>
            <div  className='container-all__tabs--container'>
            
         {  state.all&&
              filterdChapter().map((sig,index)=><div onClick={toggleShow}  className='container-all__tabs--container--name'>
                  <Link key={index} to={`/surah/${sig.id}`}>
                  <p>{sig.name_simple}</p><p>{sig.translated_name.name}</p>
                  </Link>
              </div>)
          
         }
           
            </div>
         
            </div>


            <div style={state.verses?{display:'block'}:{display:'none'}} className='verses'>
                
               
                    {
                        state.chapter&&<Verses verses={state.chapter}/>
                    }
                

            </div>



            <div className='container-all__bismillah'>
                <div className='container-all__bismillah--holder w-50 mx-auto'>
                    <p style={{color:'white',textAlign:'center'}}>&#65021;</p>
                
                </div>
            </div>
      
{
  
    state.loading? <Loading/>:
     state.verseLength.map((i,index)=><ShowAyath key={index} data={state.data[i].words} text={state.data} keyx={versesKey(i)} audiox={audiox(i)} index={i}/>)
}
    <div className='button-controller w-50'>
    <div className='button-controller_align'>
    <button  style={{fontSize:'2rem'}} className='btn btn-outline-dark my-3 mx-3' onClick={()=>pre()}>Previous</button>
<button style={{fontSize:'2rem'}} className='btn btn-outline-dark my-3 ' onClick={()=>next()}>Next page</button>
    </div>
    </div>
        </div>
    )
}
export default Mainx;