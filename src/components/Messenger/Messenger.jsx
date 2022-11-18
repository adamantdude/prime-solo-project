import { useEffect, useState } from "react";
import { io } from "socket.io-client"

const socket = io.connect("http://localhost:3000");

function Messenger() {
    const [
        [message, setMessage],
        [messageList, setList]
    ] = [useState(''), useState([])];

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            socket.on('send_message', msg => {
                setList(messageList.concat(msg));
            })
        }
    }, [messageList])

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('send_message', message);
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