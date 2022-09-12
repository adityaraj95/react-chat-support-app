import React, { useState , useEffect} from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import {CgClose} from 'react-icons/cg';


const ChatBox =()=>{ 

    const [messages, setMessages] = useState([]);

    useEffect(()=>{
        setMessages('hola amigo');
        setMessages('123');
        setMessages('abc');
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
         <div className='text-input'></div>
        </div>
    );
}

export default ChatBox;