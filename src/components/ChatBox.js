import React, { useState , useEffect} from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import {CgClose} from 'react-icons/cg';
import { Input } from '@mui/material';
import {automatedResponse} from './ChatBoxComponents/automatedResponses';
import {IoIosSend} from 'react-icons/io'
import { render } from '@testing-library/react';

const ChatBox =()=>{ 

    const [automatedResponses, setAutomatedResponses] = useState(automatedResponse);
    const [userInput, setUserInput]= useState('') ;
    const [isLoading, setisLoading]= useState(false);
    const [noInputText , setNoInputText] = useState(true);
    const [chatText, setChatText] = useState([]);

    const handleSubmit=(userInput)=>{
        if(userInput.length>0){
            let _userMsg = { data : userInput , createdBy : '$user'}
            setNoInputText(false);
            setChatText(chatText.concat(_userMsg));
            setUserInput('');
        }
     
    }

    const renderChat=(chatText)=>{
        // console.log(chatText);
        if(chatText.length>0){
            return chatText.map(data => {
                if(data.createdBy === '$user'){
                   
                   return <div className='user-text'> {data.data} </div>
    
                }else{
                  return <div className='system-text'>{data.data} </div>
                }
             }   
               
            );
        }else{
            return null;
        }
   
    }
    useEffect(()=>{
        setTimeout(() => {
            if(noInputText){
                setChatText(chatText.concat(automatedResponse));
                setNoInputText(false);
            }
           
         }, 3000);
    
    },[noInputText])

    useEffect(()=>{
        setChatText(chatText.concat(automatedResponses[0]));
        // console.log('initial chattext', chatText)
    },[])

    let chat= chatText && renderChat(chatText);
    return( 
        <div className='chat-window'>
         <div className='titlebar'>
                <p className='titlebar-text' style={{margin:0}}>Chat</p> 
                <CgClose className='close' size={24} color='white'/>
         </div>
         <div className='text-container'>
            {/* { chatText && chatText.map(data =>{
                if(data.createdBy){}else{}
            })} */}
            {chat}
         </div>
         <div className='text-input'>
            <Input className='textField' 
            fullWidth={true} 
            size={14} 
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder='How can we help you today?'
            multiline={true}/>
            <button className='submit-button' onClick={()=>handleSubmit(userInput)} type='submit'><IoIosSend color='purple' size={24}/></button></div> 
    
        </div>
    );
}

export default ChatBox;