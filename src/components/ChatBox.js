import React, { useState , useEffect} from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import {CgClose} from 'react-icons/cg';
import { Input } from '@mui/material';
import {automatedResponse} from './ChatBoxComponents/automatedResponses';
import {IoIosSend} from 'react-icons/io'
const ChatBox =()=>{ 

    const [automatedResponses, setAutomatedResponses] = useState(automatedResponse);
    const [userInput, setUserInput]= useState('') ;
    const [isLoading, setisLoading]= useState(false);
    const [chatText, setChatText] = useState([]);

    const handleSubmit=(userInput)=>{
        setChatText(chatText.concat(userInput));
        setUserInput('');
    }

    useEffect(()=>{
        // console.log(automatedResponses);
    },)
    return(
        <div className='chat-window'>
         <div className='titlebar'>
                <p className='titlebar-text' style={{margin:0}}>Chat</p> 
                <CgClose className='close' size={24} color='white'/>
         </div>
         <div className='text-container'>
     
         </div>
         <div className='text-input'>
            <Input className='textField' 
            fullWidth={true} 
            size={14} 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='How can we help you today?'
            multiline={true}/>
            <button onClick={()=>handleSubmit(userInput)} type='submit'><IoIosSend color='purple' size={24}/></button></div> 
    
        </div>
    );
}

export default ChatBox;