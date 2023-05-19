import React, {useRef} from 'react'
import io from 'socket.io-client'
import style from './Join.module.css'

export default function Join({setSocket, setChatVisibility, setUsername}) {

  const usernameRef = useRef()

  const handleSubmit = async() => {
    const username = usernameRef.current.value
    if (username.trim()) {
        const socket = await io.connect('http://localhost:3001')
        socket.emit('set_username', username)
        setSocket(socket)
        setUsername(username)
        return setChatVisibility(true) 
    }
  }
  const getKey = (e) =>{
    if(e.key === 'Enter'){
      handleSubmit()
    }
  }
  return (
    <div className={style['conteiner']}>
        <h1>Entrar</h1>
        <div className={style['form']}>
          <input className={style['input']} onKeyDown={(e)=>getKey(e)} type="text" ref={usernameRef} placeholder='Nome de usuário'/>
          <button className={style['button']} onClick={()=>handleSubmit()}>Entrar</button>
        </div>
    </div>
  )
}
