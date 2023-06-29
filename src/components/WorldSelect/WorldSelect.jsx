import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './WorldSelect.css';
import { Box, List, ListItem, Typography } from "@mui/material";

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
        dispatch({ type: 'JOIN_ROOM', payload: { room: room, id: id } });
        dispatch({ type: 'FETCH_CHAT_HISTORY', payload: id })
        history.push('/messenger');
    }

    return (
        <Box sx={{ backgroundColor: "#FFFFFF35", pl: "10%", pr: "10%" }}>
            {messenger.currentRoom.room ?
                <Typography variant="h3">You are currently at: {messenger.currentRoom.room}</Typography>
                :
                <Typography variant="h3">Please select a location: </Typography>
            }
            <Box sx={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <List>
                    {messenger.rooms && messenger.rooms.map(room =>
                        <ListItem className="locationName" key={room.id} onClick={() => setLocation(room.name, room.id)}>
                            <Typography variant="h4">{room.name}</Typography>
                        </ListItem>
                    )}
                </List>
            </Box>
        </Box>
    )
}

export default WorldSelect;