import React from 'react';
import './FaceRecognition.css'
const FaceRecognition = ({imageUrl, box}) =>{
    return(
        <div className='center ma'>
            <div className='absolute mt2'>
                {
                imageUrl ? (<div>
                            <img id='inputimage' alt="img" src={imageUrl} width='500px' height="auto"/>
                            <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow,left:box.leftCol}}> </div>
                            </div>) : 
                        ( <p> </p>)
                }
            </div>
        </div>
    );
}

export default FaceRecognition;