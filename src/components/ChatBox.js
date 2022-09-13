import React, { useState , useEffect} from 'react'
// import CloseIcon from '@mui/icons-material/Close';
import {CgClose} from 'react-icons/cg';
import { Input } from '@mui/material';
import {automatedResponse} from './chatboxcomponents/automatedResponses';
import SendIcon from '@mui/icons-material/Send';
// import { render } from '@testing-library/react';
import LoadingAnimationComponent from './chatboxcomponents/LoadingAnimationComponent';

const ChatBox =()=>{ 

    const [automatedResponses, setAutomatedResponses] = useState(automatedResponse); // automated responses would be added to chat text based on user input
    const [userInput, setUserInput]= useState('') ; // User Input string is pushed to chat text upon submit
    const [isLoading, setisLoading]= useState(false); // boolean for displaying loading animation
    const [isActive , setIsActive] = useState(true); //flag for displaying loading animation
    const [chatText, setChatText] = useState([]); //Chat Text is a first in first out array which stores the chat conversation in order.
    const [time , setTime] = useState(0); // setclock for 5 second timeout upon no user input
    const [input , setInput] = useState(false);

    const handleSubmit=(userInput)=>{ // Submit function
        if(userInput.length>0){
            let _userMsg = { data : userInput , createdBy : '$user'}
            setChatText(chatText.concat(_userMsg));
            setUserInput('');
            setIsActive(false);
            setisLoading(false);
        }
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
                setTime((time) => time + 10);
              }, 10);
        }
 
    },[isActive])
    useEffect(()=>{ //chaining react hooks to set 5 second timeout upon no user input
        // console.log('check if hook is called',time);
        if(time>5000 && isActive){
            // console.log('do the loading animation', time);
            setisLoading(true);
            setTimeout(() => { // TODO : resolve edge case where user input comes while animation in progress
                    setChatText(chatText.concat(automatedResponses[1])); // do loading animation for 3 seconds before rendering next response
                setisLoading(false);
              }, 3000);
          
            setTime(0);
            setIsActive(false);
        }
    },[time, isActive])
    useEffect(()=>{ // hook for everytime chat gets updated
        let random = 2 +  Math.floor(Math.random() * (automatedResponses.length - 2)); //generating random number to pick automated response
        // console.log('random number is', random);
        chatText.map((data , i, arr)=>{ // prepare user response after latest query
            if(i === chatText.length -1 && data.createdBy === '$user' ){
                setTimeout(() => { // TODO : resolve edge case where user input comes while animation in progress
                    setChatText(chatText.concat(automatedResponses[random])); // do loading animation for 3 seconds before rendering next response
                setisLoading(false);
                setTime(0);
                isActive(true);
              }, 5000);
                
            }
        })
        // console.log('added chat text', chatText);
    },[chatText])

    let chat= chatText && renderChat(chatText);
    return( 
        <div className='chat-window'>
         <div className='titlebar'>
                <p className='titlebar-text' style={{margin:0}}>Chat</p> 
                <CgClose className='close' size={24} color='white' onClick={()=>{}}/>
         </div>
         <div className='text-container'>
            {/* { chatText && chatText.map(data =>{
                if(data.createdBy){}else{}
            })} */}
            {chat}
            { isLoading && <LoadingAnimationComponent/>}
            {/* <LoadingAnimationComponent/> */}
         </div>
         <div className='text-input'>
            <Input 
            fullWidth={true} 
            size={12} 
            value={userInput}
            onChange={(e) => {setUserInput(e.target.value); setIsActive(false);}}
            placeholder='How can we help you today?'
            multiline={true}
            disableUnderline={true}/>
    
            <button className='submit-button' onClick={()=>handleSubmit(userInput)} type='submit'><SendIcon className='send-icon' size={24} /></button></div> 
    
        </div> 
    );
}

export default ChatBox;