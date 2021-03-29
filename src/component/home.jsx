import axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from './loading'
import Surah from './showSurah'

let Home=()=>{
    
    let[loading,setLoading]=useState(true)
    useEffect(()=>{
        window.addEventListener('resize',()=>{
            console.log(window.innerWidth);
            if(window.innerWidth>790){
                dispatch({type:Actions.SET_SHOW,payload:false})
            }
        })
    },[])
    let Actions={
        SET_Chapter:'set-chapter',
        SET_SHOW:'show',
        SET_SEARCH:'search'
    }
    let reducer=(state,action)=>{
        if(action.type===Actions.SET_Chapter){
            return{
                ...state,
                chapters:action.payload
            }
        }else if(action.type===Actions.SET_SHOW){
            return{
                    ...state,
                    show:action.payload
            }
        }else if(action.type===Actions.SET_SEARCH){
            return{
                ...state,
                search:action.payload
            }
        }
        return state
    }
   let [state,dispatch]= useReducer(reducer,{show:false,search:''})
    useEffect(()=>{
        axios.get('https://api.quran.com/api/v4/chapters?language=en').then(res=>{

            dispatch({type:Actions.SET_Chapter,payload:res.data.chapters})
            setTimeout(() => {
                setLoading(false)  
               }, 1600);
        }).catch(error=>{
            setLoading(true)
        })
       
    },[Actions.SET_Chapter])

    function toggleBurger(){
        dispatch({type:Actions.SET_SHOW,payload:!state.show})
    }
    let handleSearch=(e)=>{
        dispatch({type:Actions.SET_SEARCH,payload:e.target.value})
    }
    function filteredChapter(){
       
        return state.chapters.filter(sig=>sig.name_simple.toLowerCase().includes(state.search.toLowerCase()))
    }

    // function forResize(){
    //     if(window.innerWidth>=781){
    //         dispatch({type:Actions.SET_SHOW,payload:false})
           
    //       }
    // }
    // window.addEventListener('resize',forResize)
    return(
        <>
        <div className='home-nav'>
            <p>THE HOLY QURAN</p>
            <div className={state.show?'home-nav_list active':'home-nav_list'}>
                <Link to='/'>HOME</Link>
                <Link to='/'>About us</Link>
                <Link to='/credit'>CREDIT</Link>
            </div>
            <div onClick={toggleBurger}  className='home-nav--burger'>
            <i class="fas fa-bars"></i>
            </div>
        </div>
        <div className='home-landingpage'>
        <p className='home-landingpage-font'>The Holy Quran</p>
        <br/>
        <div style={{display:'flex'}}>
        <p className='home-landingpage-light'>The light o </p>
        <p className='home-landingpage-dark'>f darkness</p>
        </div>
       

        </div>
        <div className="container-fluid surah-container">
            <div className='surah-container__input mx-auto '>
                <input placeholder='Search-surah' onChange={(event)=>handleSearch(event)} type='text' ></input>
                <div className='surah-container__icon-search'>
            <i class="fas fa-search"></i>
            </div>
            </div>
            
            <div className="row">
            {
            loading?<Loading/>:state.chapters && filteredChapter().map((sig,index)=><Surah key={index} surah={sig}/>)
          
        }
            </div>
        </div>
      
        </>
    )
}
export default Home;