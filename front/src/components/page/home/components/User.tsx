import React from "react";
import { BsPerson } from "react-icons/bs";

type PropsType = {
	userData: {
		username: string;
		businessRole: string;
		urlAvatar: string;
		email: string;
	}
	erasable: undefined | boolean;
	deleteFunc: (email: string) => Promise<void>;
}

const User: React.FC<PropsType> = ({ userData, erasable, deleteFunc }) => {
	const imgOrAvatar = userData.urlAvatar ? (
		<img className="img-bubble" src={ userData.urlAvatar } alt="avatar user" />
	) : (
		<BsPerson className="avatar-bubble"/>
	);
	const deleteUser = () => {
		const email = userData.email;
		deleteFunc(email);
	}
    return (
        <div className='bubble-user'>
            { imgOrAvatar }
			<div>
				<p className="bubble-name">{ userData.username }</p>
				<p className="bubble-buisinessRole">{ userData.businessRole }</p> 
				{ erasable && <button onClick={() => deleteUser()}>X</button> }     
			</div>
        </div>
    )
}

export default User;