import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

function OtherProfile() {

    const dispatch = useDispatch();
    const params = useParams();

    const otherChar = useSelector(store => store.profile.otherProfile);

    useEffect(() => {
        dispatch({ type:'FETCH_PROFILE', payload: params.id })
    }, []);

    return (
        <div id="otherProfilePage">
             <div id="characterBox">
                 {/* <img src="avatar.png" /> */}
                 <p>Character Name: {otherChar.full_name}</p>
                 <p>Level: {otherChar.level}</p>
             </div>

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
                <textarea disabled value={otherChar.history} wrap="hard"></textarea>
             </div>

             <div id="friendsList">

             </div>
        </div>
    )
}

export default OtherProfile;


// import './Profile.css';
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";

// function Profile() {

//     const dispatch = useDispatch();
//     const character = useSelector(store => store.profile.character)

//     const [editMode, setMode] = useState(false);
//     const [editText, setText] = useState('');

//     const changeEditMode = () => {
//         setText(character.history);
//         setMode(!editMode);
//     }

//     const submitChanges = () => {
//         dispatch({ type: 'UPDATE_HISTORY', payload: { history: editText, char_id: character.id } })
//         setMode(!editMode);
//     }

//     return (
//         <div id="profilePage">

//             <div id="characterBox">
//                 {/* <img src="avatar.png" /> */}
//                 <p>Character Name: {character.full_name}</p>
//                 <p>Experience: {character.exp}</p>
//                 <p>Level: {character.level}</p>
//             </div>

//             <div id="statsBox">
//                 <p>
//                     Strength: 0
//                     Dexterity: 0
//                     Intellect: 0
//                     Wisdom: 0
//                     Faith: 0
//                 </p>
//             </div>

//             <div id="historyBox">
//                 {!editMode &&
//                     <>
//                         <p> History:
//                             <button onClick={changeEditMode}>EDIT</button>
//                         </p>
//                         <textarea disabled value={character.history} wrap="hard"></textarea>
//                     </>
//                 }
//                 {editMode &&
//                     <>
//                         <p>History:
//                             <button onClick={submitChanges}>Submit</button>
//                             <button onClick={() => setMode(!editMode)}>Cancel</button>
//                         </p>
//                         <textarea onChange={(e) => setText(e.target.value)} value={editText} wrap="hard"></textarea>
//                     </>
//                 }
//             </div>

//             <div id="friendsList">

//             </div>
//         </div>
//     )
// }

// export default Profile;