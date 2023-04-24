import io from 'socket.io-client';
import { useState, useEffect } from 'react'
import './App.css'
const socket = io.connect('http://localhost:3001');

function App() {
    const [message, setMessage] = useState("");
    const [messageReceived, setMessageReceived] = useState("");
    const sendMessage = () => {
        socket.emit("send_message", {
            message
        });
    };

    useEffect(() => {
        socket.on("receive_message", ( data ) => {
            setMessageReceived( data.message )
        })
    }, [ socket ]);


    return (
    <>
        <h1>Hey there</h1>
        <div className="App">
            <input
                onChange={ (event) => {
                    setMessage(event.target.value)
                }}
                placeholder="MESSAGE"
            />
            <button
                onClick={ sendMessage }
            >
                Send message
            </button>
            <h1>Message:</h1>
            {
                messageReceived
            }

        </div>
    </>
  )
}

export default App
