import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Profile() {

    const dispatch = useDispatch();
    const character = useSelector(store => store.profile)

    const [editMode, setMode] = useState(false);
    const [editText, setText] = useState('');

    // console.log(character);

    useEffect(() => {
        dispatch({ type: 'FETCH_CHARACTER' })
        setText(character.history);
    }, [])

    const changeEditMode = () => {
        setMode(!editMode);
    }

    const submitChanges = () => {
        dispatch({ type: 'UPDATE_HISTORY', payload: { history: editText, char_id: character.id }})
        setMode(!editMode);
    }

    const cancelChanges = () => {
        setMode(!editMode);
    }

    return (
        <div id="profilePage">
            <div id="statsBox">
                <p>
                    Strength: 0
                    Dexterity: 0
                    Intellect: 0
                    Wisdom: 0
                    Faith: 0
                </p>
            </div>

            <div id="historyBox">
                {!editMode &&
                    <>
                        <p>History: {character.history}</p>
                        <button onClick={changeEditMode}>EDIT</button>
                    </>
                }
                {editMode &&
                    <>
                        <p>History: {character.history}</p>
                        <input type="text" onChange={(e) => setText(e.target.value)} value={editText} />
                        <button onClick={submitChanges}>Submit</button>
                        <button onClick={cancelChanges}>Cancel</button>
                    </>
                }
            </div>

            <div id="characterBox">
                {/* <img src="avatar.png" /> */}
                <p>Character Name: {character.full_name}</p>
                <p>Experience: {character.exp}</p>
                <p>Level: {character.level}</p>
            </div>

            <div id="friendsList">

            </div>
        </div>
    )
}

export default Profile;