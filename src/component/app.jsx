import React, { useEffect }  from 'react'
import Mainx from './main'
import Home from './home'
import {BrowserRouter,Switch,Route} from 'react-router-dom'

import SingleVerses from './showSingle.verses'
import SurahInfo from './surahInfo'
import Credit from './credit'
import Footer from './footer'
import ReactGA from 'react-ga';

let App=()=>{
    useEffect(()=>{
        ReactGA.initialize('G-7FZZV9PZKQ',{
            cookieFlags: 'max-age=7200;secure;samesite=none'
        });
       
ReactGA.pageview(window.location.pathname + window.location.search)
    },[])
    return(
        
        <BrowserRouter>
       
        <Switch>

        <Route exact path='/'>
        <Home/>
        </Route>
       
        <Route exact path='/surah/:id'>
            
            <Mainx/>
        </Route>
   
      
       <Route path='/single/verses/:id'>
       <SingleVerses/>
       </Route>
       
       <Route path='/info/:id'>
       <SurahInfo/>
       </Route>
       <Route path='/credit'>
       <Credit/>
       </Route>
      
        </Switch>
        <Footer/>
        </BrowserRouter>
           
       
           
    )
}
export default App;