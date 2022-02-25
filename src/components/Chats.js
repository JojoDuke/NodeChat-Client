import '../App.css';
import React from 'react'
import { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

function Chats({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        // Stop user from sending empty messages
        if(currentMessage !==""){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        };
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
            //setCurrentMessage("");
        });
    }, [socket]);

  return (
    <div className='window'>
        <div className="chat-body">
            <ScrollToBottom className="message-container"> 
                {messageList.map((messageContent) => {
                    return <div className='message-item' id={username === messageContent.author ? "receiver" : "sender"}>
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p>{messageContent.time + ","}</p>
                                <p>{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                })}
            </ScrollToBottom>
        </div>

        <div className="chat-footer">
            <input 
                type="text" 
                value={currentMessage}
                placeholder='Type message' 
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => {e.key === "Enter" && sendMessage();}}
                />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chats;