import React from "react";

type PropsType = {
    userData: any
}

const User: React.FC<PropsType> = ({ userData }) => {
    const img = userData.urlAvatar ? <img src={userData.urlAvatar} alt="avatar user" /> : null;
    return (
        <div>
            <h2>{ userData.username }</h2>
            { img }
            <p>{ userData.email }</p>
            <p>{ userData.businessRole }</p>
        </div>
    )
}

export default User;