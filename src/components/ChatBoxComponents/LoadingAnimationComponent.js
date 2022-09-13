import React, { useState } from 'react'


const LoadingAnimationComponent  =()=>{ 
    return(
        <div className='loading-animation-box'>
            <div className='loading-bubble'></div>
            <div className='loading-bubble'></div>
            <div className='loading-bubble'></div>
        </div>
    );
}

export default LoadingAnimationComponent;