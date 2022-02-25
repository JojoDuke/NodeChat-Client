import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chats from './components/Chats';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import logo from './components/logo-img.png';



const socket = io("https://nodechat-jd.herokuapp.com/");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
    {/* NAV-BAR */}
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", }}>
          <img 
            alt='logo'
            src={logo}
            style={{  height: "50px", }}
          />
          <div>
            <button className='nav-btns white'>How to use</button>
            <button 
              className='nav-btns black'
              onClick={(e) => {
                e.preventDefault();
                window.location.href='https://twitter.com/itsjojoduke1';
              }}>Follow me on Twitter...</button>
          </div>
        </Toolbar>
      </AppBar>

      {/* HERO SECTION */}
      <Container maxWidth="xl" sx={{ textAlign: "center", marginTop: "60px", }}>
        <Typography variant='h2' fontWeight="600">NodeChat is a live chat app made<br/> with React and Node</Typography>
        <Typography variant='h6' sx={{ color: "gray", }}>Realtime chat using Sockets.io, just open the app<br/> in another window and make sure to join the same room, its that easy!</Typography>
      </Container>

      {!showChat ? (
        <div className='joinChat-div'>
          <h3>Join A Chat</h3>
        <input type="text" placeholder="Name" onChange={ (e) => {setUsername(e.target.value)} }/>
        <input type="text" placeholder="Room ID" onChange={ (e) => {setRoom(e.target.value)} } />
        <button className='nav-btns black join-btn' onClick={joinRoom}>Join A Room</button>
      </div>) : (<Chats socket={socket} username={username} room={room}/>)}
    </div>
  );
}

export default App;
