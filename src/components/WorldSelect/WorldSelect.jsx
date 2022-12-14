import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './WorldSelect.css';

function WorldSelect({ socket, user }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const messenger = useSelector(store => store.messenger);
    const character = useSelector(store => store.profile.character);

    useEffect(() => {
        dispatch({ type: 'FETCH_ROOMS' })
    }, [])

    const setLocation = (room, id) => {
        socket.emit('uniqueIDSET', {
            user_id: user.id,
            character_name: character.full_name,
            character_id: character.id
        });
        socket.emit('join_room', room, messenger.currentRoom.room);
        dispatch({ type: 'JOIN_ROOM', payload: {room: room, id: id}});
        dispatch({ type: 'FETCH_CHAT_HISTORY', payload: id })
        history.push('/messenger');
    }

    return (
        <div id="worldSelectPage">
            {messenger.currentRoom.room ?
                <h1>You are currently at: {messenger.currentRoom.room}</h1>
                :
                <h1>Please select a location: </h1>
            }
            {messenger.rooms && messenger.rooms.map(room =>
                <div className="locationName" key={room.id} onClick={() => setLocation(room.name, room.id)}>
                    <h2>{room.name}</h2>
                </div>
            )}
        </div>
    )
}

export default WorldSelect;