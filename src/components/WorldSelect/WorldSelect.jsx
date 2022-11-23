import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function WorldSelect({ socket, user }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const messenger = useSelector(store => store.messenger);
    const character = useSelector(store => store.profile);

    useEffect(() => {
        dispatch({ type: 'FETCH_ROOMS' })
    }, [])

    const setLocation = (room) => {
        socket.emit('uniqueIDSET', { user_id: user.id, character_name: character.full_name });
        socket.emit('join_room', room, messenger.currentRoom);
        dispatch({ type: 'JOIN_ROOM' , payload: room });
        history.push('/messenger');
    }

    return (
        <div id="worldSelectPage">
            {messenger.currentRoom ?
                <h1>You are currently at: {messenger.currentRoom}</h1>
                :
                <h1>Please select a location: </h1>
            }
            {messenger.rooms && messenger.rooms.map(room =>
                <div key={room.id} onClick={() => setLocation(room.name)}>
                    <h2>{room.name}</h2>
                    {/* location information */}
                </div>
            )}
        </div>
    )
}

export default WorldSelect;