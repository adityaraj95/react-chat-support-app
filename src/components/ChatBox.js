import React, { useState , useEffect} from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import {CgClose} from 'react-icons/cg';
import { TextField } from '@mui/material';
import {IoIosSend} from 'react-icons/io'
const ChatBox =()=>{ 

    const [messages, setMessages] = useState([]);

    useEffect(()=>{

    },)

    return(
        <div className='chat-window'>
         <div className='titlebar'>
                <p className='titlebar-text' style={{margin:0}}>Chat</p> 
                <CgClose className='close' size={24} color='white'/>
         </div>
            {console.log(messages)}
         <div className='text-container'>
          
         </div>
         <div className='text-input'><input className='iotext'></input><button><IoIosSend color='purple' size={24}/></button></div> 
    
        </div>
    );
}

export default ChatBox;