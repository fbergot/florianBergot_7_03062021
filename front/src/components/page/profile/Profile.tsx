import React from "react";
import Header from '../../Header';
import ProfileContainer from './components/ProfileContainer';

const Profile: React.FC = () => {
    return (
        <div>
            <Header/>
            <ProfileContainer/>
        </div>
    )
}

export default Profile;