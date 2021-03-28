import React from 'react'

let Audiox=({id})=>{
    return(
        <audio controls   key={id}>
            <source src={id?`https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${id}`:''} type="audio/mpeg"/>
        </audio>
    )
}
export default Audiox;