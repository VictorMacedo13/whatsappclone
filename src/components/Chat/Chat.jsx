import { useEffect, useRef, useState } from "react";
import style from './Chat.module.css';
import {ReactComponent as Btn} from '../../assets/btn.svg';

export default function Chat({socket, username}) {

    const messageRef = useRef()
    const scrollRef = useRef(null)
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
     socket.on('receive_message', data => {
        setMessageList((current)=>[...current, data])
        
    })
    return () => socket.off('receive_message')
}, [socket])

useEffect(() => {
    focusInput()
}, [])

useEffect(() => {
    // if (messageList.length >0) {
        
    //     if (messageList[messageList.length-1].author === username) {
    //         scrollDown() 
    //     }
    // }
    scrollDown() 
}, [messageList])

    const handleSubmit = async() =>{
        const message = messageRef.current.value
        console.log("teste");
        if (message.trim()) {
            socket.emit('message', message)
            clearInput()
            focusInput()
            
        }
    }

    const scrollDown = () => {
        scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    const clearInput = () =>{
        messageRef.current.value = ''
    }
    const focusInput = () =>{
        messageRef.current.focus()
    } 

    const getEnterKey = (e) =>{
       if(e.key === 'Enter')
        handleSubmit()
    } 

    return (
      <div>
        <div className={style['header-card']}>
            <h1>ZAPZAP</h1>
        </div>
        <div className={style['container']}>
            <div className={style['content']}>


                {
                    messageList.map((message,index) => (
                       
                        username === message.author ? (
                            <div className={style['message-space']}>
                                <div className={style['message-card-green']}>
                                    <p key={index}>{message.author}: {message.text}</p>
                                </div>
                            </div>
                        ):(
                            <div className={style['message-card']}>
                            <p key={index}>{message.author}: {message.text}</p>
                            </div>
                        )
                        
                        ))
                        }
                <div ref={scrollRef}/>
            </div>
        </div>
        <div className={style['input-card']}>
            <input className={style['input']} onKeyDown={(e)=>getEnterKey(e)} type="text" ref={messageRef} placeholder='Mensagem'/>
            <Btn className={style['btn']} onClick={()=>handleSubmit()} />
            {/* <button className={style['button']} onClick={()=>handleSubmit()}>Enviar</button> */}
        </div>
      </div>
    )
  } 