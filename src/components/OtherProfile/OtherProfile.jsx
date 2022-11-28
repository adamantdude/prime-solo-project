import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import '../Profile/Profile.css';

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