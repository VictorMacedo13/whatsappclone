import { useState } from 'react';
import './App.css';
import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';


function App() {
  const [chatVisibility, setchatVisibility] = useState(false)
  const [socket, setSocket] = useState(null)
  const [username, setUsername] = useState(null)

  return (
    <div className="App">
      {
        chatVisibility?<Chat socket={socket} username={username}/>:<Join setSocket={setSocket} setChatVisibility={setchatVisibility} setUsername={setUsername}/>
      }
    </div>
  );
}

export default App;
