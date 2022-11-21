import './Messenger.css';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';


function Messenger({ socket }) {
    const [
        [message, setMessage],
        [messageList, setList],
        [room, setRoom]
    ] = [useState(''), useState([]), useState('Capitol')];

    const character = useSelector(store => store.profile);

    const dispatch = useDispatch();

    useEffect(() => { // effect function
        let isMounted = true;

        // dispatch({ type: 'FETCH_CHARACTER' });

        // if the component is currently displaying...
        if (isMounted) {
            // tell the server that the user is currently
            // looking at the messenger
            // socket.emit('active_messenger', character);

            // setup socket.io listeners
            socket.on('send_message', msg => {
                setList(messageList.concat(msg));
            })

            // default room emit
            socket.emit('join_room', room, res => { 
                setList(messageList.concat(res.message));
            })
        }

        // when the component is done displaying...
        return () => { // cleanup function
            // tell the server that the user is leaving
            // the messenger ui
            // socket.emit('inactive_messenger', character);

            // remove listeners to avoid memory leak
            isMounted = false;
            socket.removeAllListeners();
        }
    }, [messageList])

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('send_message', {
            msg: message, character: character, room: room
        });
        setMessage('');
    }

    const joinRoom = (room) => {
        setRoom(room);
        socket.emit('join_room', room, res => {
            setList(messageList.concat(res.message));
        });
    }

    return (
        <div id="messengerPage">
            <div id="roomNav">
                <button onClick={() => joinRoom('Capitol')}>Capitol</button>
                <button onClick={() => joinRoom('Forest')}>Forest</button>
                <button onClick={() => joinRoom('Beach')}>Beach</button>
            </div>
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