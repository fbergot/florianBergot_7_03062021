import React, { useState } from "react";
import Header from '../../Header';
import ProfileContainer from './components/ProfileContainer';

const Profile: React.FC = () => {
  const [displayInfosProfile, setDisplayInfosProfile] = useState(true); 
    return (
      <div>
            <Header headerProfile={ displayInfosProfile }/>
            <ProfileContainer displayInfosHeader={ setDisplayInfosProfile }/>
      </div>
    );
}

export default Profile;