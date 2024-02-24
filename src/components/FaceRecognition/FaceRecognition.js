import React from 'react';

const FaceRecognition = ({imageUrl}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                {
                imageUrl ? (<img alt="img" src={imageUrl} width='500px' height="auto"/>) : 
                        ( <p> </p>)
                }
            </div>
        </div>
    );
}

export default FaceRecognition;