import React from 'react'
import { Link } from 'react-router-dom';

let Surah=({surah})=>{
    return(
        <>
       {
           surah && <div id={surah.id} className='col-md-3 my-3 mx-5 surah-shower'>
           
           <Link style={{textDecoration:'none'}} to={`surah/${surah.id}`}>
           
           <div className="surah-shower_name">
           <h3>{surah.name_simple}</h3>
           <p>{surah.translated_name.name}</p>
           </div>
           <div className='surah-shower_name_arabic'>
            <p>{surah.name_arabic}</p>
           </div>
           </Link>
       </div>
           
          
       }
       </>
    )
}
export default Surah;