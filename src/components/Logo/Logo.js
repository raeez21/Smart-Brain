import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png'
import './Logo.css'
const Logo = () =>{
    return(
        <div className='ma4 mt0' style={{ width: '150px', height: '150px' }}>
            <Tilt>
                <div className='br2 shadow-2 tilt' style={{ width: '100%', height: '100%',backgroundColor: 'darkgreen' }}>
                    <img alt='logo' src={brain}/>
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;