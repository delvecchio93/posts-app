import { Button } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";

import "./MessageModal.css";

type MessageModel = {
  type?: string;
  message: string;
  title?: string;
  onCancel: () => void;
  onConfirm?: () => void;
}

const Message: React.FC<MessageModel> = (props) => {
  return (
    <div className={'message_modal'}>
      <h2 className="message_title">{props.title === undefined ? "Something went wrong!" : props.title}</h2>
      <span className="message_message">{props.message}</span>
      <div className='btns_container'>
        {props.type === 'delete' && <Button variant="outlined" style={{marginRight: '20px'}} onClick={props.onConfirm}>Confirm</Button>}
        <Button variant="contained" color='error' onClick={props.onCancel}>Close</Button>
      </div>
    </div>
  );
};

const MessageModal: React.FC<MessageModel> = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop handleClick={props.onCancel}/>,
        document.getElementById("backdrop-root") as HTMLElement
      )}
      {ReactDOM.createPortal(
        <Message title={props.title} type={props.type} message={props.message} onConfirm={props.onConfirm} onCancel={props.onCancel}/>,
        document.getElementById("overlay-root") as HTMLElement
      )}
    </>
  );
};

export default MessageModal;
