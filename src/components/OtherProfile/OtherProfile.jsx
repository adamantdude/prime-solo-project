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
        dispatch({ type: 'FETCH_PROFILE', payload: params.id })
    }, []);

    console.log(otherChar);

    return (
        <div id="otherProfilePage">
            <div id="characterBox">
                {/* <img src="avatar.png" /> */}
                <p>{otherChar.full_name}</p>
                <p>Level: {otherChar.level}</p>
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
                <textarea readOnly value={otherChar.history} wrap="hard"></textarea>
            </div>

            <div id="friendsList">
                
            </div>
        </div>
    )
}

export default OtherProfile;