import React, { useState , useEffect} from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import {CgClose} from 'react-icons/cg';
import { Input } from '@mui/material';
import {automatedResponse} from './ChatBoxComponents/automatedResponses';
import {IoIosSend} from 'react-icons/io'
import { render } from '@testing-library/react';

const ChatBox =()=>{ 

    const [automatedResponses, setAutomatedResponses] = useState(automatedResponse); // automated responses would be added to chat text based on user input
    const [userInput, setUserInput]= useState('') ; // User Input string is pushed to chat text upon submit
    // const [isLoading, setisLoading]= useState(false); // boolean for displaying loading animation
    const [isActive , setIsActive] = useState(true); //flag for displaying loading animation
    const [chatText, setChatText] = useState([]); //Chat Text is a first in first out array which stores the chat conversation in order.
    const [timeout , setTimeout] = useState(0);

    const handleSubmit=(userInput)=>{ // Submit function
        if(userInput.length>0){
            let _userMsg = { data : userInput , createdBy : '$user'}
            setChatText(chatText.concat(_userMsg));
            setUserInput('');
            setIsActive(false);
        }
        console.log('check timer',timeout);
     
    }

    const renderChat=(chatText)=>{ // Rendering what to be displayed in chat upon submit
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
    // useEffect(()=>{      //I like to not remove code which did not work as it teaches more than what worked. 
    //     setTimeout(() => {
    //         if(noInputText){
    //             setChatText(chatText.concat(automatedResponse));
    //             setNoInputText(false);
    //         }
           
    //      }, 3000);
    
    // },[noInputText])

    useEffect(()=>{ // Loading the chat box for the first time , set the initial chat text to desired message
        // let interval;
        setChatText(chatText.concat(automatedResponses[0]));

    },[])
    useEffect(()=>{  // TODO : improve timeout logic //// started timer which renders loading animation upon no user input within 3000ms
        let interval;
        // console.log('check is active', isActive);
        if(isActive){
            // console.log('is active should be true');
            interval = setInterval(() => {
                setTimeout((timeout) => timeout + 10);
              }, 10);
        }
        return () => clearInterval(interval);
    },[isActive])
    useEffect(()=>{ //chaining react hooks to set 3 second timeout upon no user input
        if(timeout>3000 && isActive){
            // console.log('do the loading animation', timeout);
            setChatText(chatText.concat(automatedResponses[1]));
            setTimeout(0);
            setIsActive(false);
        }
    },[timeout])
    useEffect(()=>{ // hook for everytime chat gets updated
        
    },[chatText])

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