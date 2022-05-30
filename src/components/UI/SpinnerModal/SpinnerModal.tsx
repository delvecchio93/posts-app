import React from 'react';
import ReactDOM from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';

import './SpinnerModal.css';

const Spinner:React.FC = () => {
  return <div className='loader'></div>
};

const SpinnerModal = () => {
  return <>
  { ReactDOM.createPortal(<Backdrop/>, document.getElementById("backdrop-root") as HTMLElement) }
  { ReactDOM.createPortal(<Spinner/>, document.getElementById("overlay-root") as HTMLElement) }
  </>
}

export default SpinnerModal;