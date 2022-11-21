import './Messenger.css';
import { useEffect, useState } from "react";
import { io } from "socket.io-client"
import { useSelector } from 'react-redux';

const socket = io.connect("http://localhost:3000");

function Messenger() {
    const [
        [message, setMessage],
        [messageList, setList]
    ] = [useState(''), useState([])];

    const character = useSelector(store => store.profile);

    useEffect(() => { // effect function
        let isMounted = true; 
        
        // if the component is currently displaying...
        if (isMounted) {
            // setup socket.io listeners
            socket.on('send_message', msg => {
                setList(messageList.concat(msg));
            })
        }

        // when the component is done displaying...
        return () => { // cleanup function
            // remove listeners to avoid memory leak
            isMounted = false;
            socket.removeAllListeners();
        }
    }, [messageList])

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('send_message', message, character);
        setMessage('');
    }

    return (
        <div id="messengerPage">
            <h1>Messages!</h1>
            <ul>
                {messageList.length > 0 && messageList.map((sent, i) => <li key={i}>{sent}</li>)}
            </ul>
            <form onSubmit={sendMessage}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                <button>Send Message</button>
            </form>
        </div>
    )
}

export default Messenger;