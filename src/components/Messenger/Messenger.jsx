import './Messenger.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Messenger({ socket }) {
    const [
        [message, setMessage],
        [messageList, setList],
    ] = [useState(''), useState([])];

    const dispatch = useDispatch();
    const history = useHistory();

    const character = useSelector(store => store.profile.character);
    const messenger = useSelector(store => store.messenger);

    useEffect(() => { // effect function
        let isMounted = true;
        // if the component is currently displaying...
        if (isMounted) {

            if(messageList.length > 20) {
                setList(messageList.slice(1));
            }

            // setup socket.io listeners
            socket.on('send_message', msg => {
                setList(messageList.concat(msg));
            })

            socket.on('user_list', (listOfUsers) => {
                dispatch({ type: 'FETCH_LIST_OF_NAMES', payload: listOfUsers })
            })
        }

        // when the component is done displaying...
        return () => { // cleanup function

            // remove listeners to avoid memory leak
            isMounted = false;
            socket.removeAllListeners();
        }
    }, [messageList, messenger])

    const sendMessage = (e) => {
        e.preventDefault();

        socket.emit('send_message', {
            message: message,
            char: character.full_name,
            room: messenger.currentRoom,
        });
        setMessage('');
    }

    const viewOtherProfile = (id) => {
        console.log('VIEW OTHER USER PROFILE', id);
        history.push(`/profile/${id}`);
    }

    return (
        <div id="messengerPage">
            <h1 id="location">{messenger.currentRoom}</h1>
            <div id="miniProfile">
                <p>{character.full_name}</p>
                <p>Level : {character.level}</p>
                <p>EXP : {character.exp}</p>
            </div>
            <div id="whoIsHere">
                <label htmlFor='userList'>Who Is Here:</label>
                <ul id="userList">
                    {messenger.usersInRoom.length > 0 &&
                        messenger.usersInRoom.filter(x => x.room === messenger.currentRoom).map(y =>
                            <li key={y.user_id} onClick={() => viewOtherProfile(y.character_id)}>{y.character_name}</li>
                        )}
                </ul>
            </div>
            <div id="messaging">
                <label htmlFor='messageList'>Messages:</label>
                <ul id="messageList">
                    {messageList.length > 0 && messageList.map((sent, i) => <li key={i}>{sent}</li>)}
                </ul>
            </div>
            <div id="messageBox">
                <form onSubmit={sendMessage}>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button>Send Message</button>
                </form>
            </div>
        </div>
    )
}

export default Messenger;