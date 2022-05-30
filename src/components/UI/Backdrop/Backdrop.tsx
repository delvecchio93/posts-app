import React from 'react';
import './Backdrop.css';

const Backdrop: React.FC<{handleClick?: () => void}> = (props) => <div className='backdrop' onClick={props.handleClick}></div>

export default Backdrop;