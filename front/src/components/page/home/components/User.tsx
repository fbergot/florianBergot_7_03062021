import React from "react";
import { BsPerson } from "react-icons/bs";

type PropsType = {
	userData: {
		username: string;
		businessRole: string;
		urlAvatar: string;
	}
}

const User: React.FC<PropsType> = ({ userData }) => {
	const img = userData.urlAvatar ? (
		<img className="img-bubble" src={ userData.urlAvatar } alt="avatar user" />
	) : (
		<BsPerson className="avatar-bubble"/>
	);
    return (
        <div className='bubble-user'>
            { img }
			<div>
				<p className="bubble-name">{ userData.username }</p>
				<p className="bubble-buisinessRole">{ userData.businessRole }</p>      
			</div>
        </div>
    )
}

export default User;