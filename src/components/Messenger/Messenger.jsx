import { Box, Typography } from '@mui/material';
import './Messenger.css';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Messenger({ socket }) {
    const [
        [message, setMessage],
    ] = [useState('')];

    const dispatch = useDispatch();
    const history = useHistory();

    const character = useSelector(store => store.profile.character);
    const messenger = useSelector(store => store.messenger);

    useEffect(() => { // effect function
        let isMounted = true;
        // if the component is currently displaying...
        if (isMounted) {

            // if(messageList.length > 20) {
            //     setList(messageList.slice(1));
            // }

            // setup socket.io listeners
            socket.on('send_message', () => {
                dispatch({ type: 'FETCH_CHAT_HISTORY', payload: messenger.currentRoom.id })
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
    }, [messenger])

    const sendMessage = (e) => {
        e.preventDefault();

        dispatch({ type: 'ADD_TO_HISTORY', 
            payload: {
                location_id: messenger.currentRoom.id, 
                character_id: character.id,
                message: message
            }
        })

        socket.emit('send_message', {room: messenger.currentRoom.room});

        setMessage('');
    }

    const viewOtherProfile = (id) => {
        console.log('VIEW OTHER USER PROFILE', id);
        history.push(`/profile/${id}`);
    }

    const autofill = () => {
        setMessage('That sounds awesome! Can\'t wait to touch base later!')
    }

    return (
        <Box id="messengerPage">
            <Typography id="location">{messenger.currentRoom.room}</Typography>
            <Box id="miniProfile">
                <h3>{character.full_name}</h3>
                <p>Level : {character.level}</p>
                <p>EXP : {character.exp}</p>
            </Box>
            <Box id="whoIsHere">
                <label htmlFor='userList'>Who Is Here:</label>
                <ul id="userList">
                    {messenger.usersInRoom.length > 0 &&
                        messenger.usersInRoom.filter(x => x.room === messenger.currentRoom.room).map(y =>
                            <li key={y.user_id} onClick={() => viewOtherProfile(y.character_id)}>{y.character_name}</li>
                        )}
                </ul>
            </Box>
            <Box id="messaging">
                <label htmlFor='messageList' onClick={autofill}>Messages:</label>
                <ul id="messageList">
                    {messenger.chatHistory.map(message => <li key={message.id}>{message.character_name} says, "{message.message}"</li>)}
                </ul>
            </Box>
            <Box id="messageBox">
                <form onSubmit={sendMessage}>
                    <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button>Send Message</button>
                </form>
            </Box>
        </Box>
    )
}

export default Messenger;