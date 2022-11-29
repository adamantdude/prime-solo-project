import './Profile.css';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

function Profile() {

    const dispatch = useDispatch();
    const character = useSelector(store => store.profile.character);

    const [editMode, setMode] = useState(false);
    const [editText, setText] = useState('');

    const changeEditMode = () => {
        setText(character.history);
        setMode(!editMode);
    }

    const submitChanges = () => {
        dispatch({ type: 'UPDATE_HISTORY', payload: { history: editText, char_id: character.id } })
        setMode(!editMode);
    }

    return (
        <div id="profilePage">

            <div id="characterBox">
                {/* <img src="avatar.png" /> */}
                <h1>{character.full_name}</h1>
                <h3>Level: {character.level}</h3>
                <p>Experience: {character.exp}</p>
            </div>

            <div id="statsBox">
                <h3> Statistics </h3>
                <ul>
                    <li>Strength : 0</li>
                    <li>Dexterity : 0</li>
                    <li>Intellect : 0</li>
                    <li>Wisdom : 0</li>
                    <li>Faith : 0</li>
                </ul>
            </div>

            <div id="historyBox">
                {!editMode &&
                    <>
                        <p> History:
                            <button onClick={changeEditMode}>EDIT</button>
                        </p>
                        <textarea disabled value={character.history ? character.history : ''} wrap="hard"></textarea>
                    </>
                }
                {editMode &&
                    <>
                        <p>History:
                            <button onClick={submitChanges}>Submit</button>
                            <button onClick={() => setMode(!editMode)}>Cancel</button>
                        </p>
                        <textarea onChange={(e) => setText(e.target.value)} value={editText ? editText : ''} wrap="hard"></textarea>
                    </>
                }
            </div>

            <div id="friendsList">

            </div>
        </div>
    )
}

export default Profile;