import { useEffect, useRef, useState } from "react"
import style from './Chat.module.css'

export default function Chat({socket, username}) {

    const messageRef = useRef()
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
     socket.on('receive_message', data => {
        setMessageList((current)=>[...current, data])
     })
     return () => socket.off('receive_message')
    }, [socket])
    

    const handleSubmit = async() =>{
        const message = messageRef.current.value
        console.log("teste");
        if (message.trim()) {
            socket.emit('message', message)
            clearInput()
            focusInput()
        }
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
            </div>
        </div>
        <div className={style['input-card']}>
            <input onKeyDown={(e)=>getEnterKey(e)} type="text" ref={messageRef} placeholder='Mensagem'/>
            <button onClick={()=>handleSubmit()}>Enviar</button>
        </div>
      </div>
    )
  } 