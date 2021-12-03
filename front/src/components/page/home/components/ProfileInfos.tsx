import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import toLocalStorageInst from "../../../../class/utils/ToLocalStorage";

type StorageObject = {
	username: string;
}

type User = {
	username: string;
}

type RootState = {
	user: {
		users: { username : string, urlAvatar: string}[]
	};
}

const ProfileInfos: React.FC = () => {
	// get user state in store
	const usersInfos = useSelector((states: RootState ) => states.user);
	// get current user infos in localStor
	const userCurrentUsername = useRef<StorageObject | undefined>(undefined);

	useEffect(() => {
		userCurrentUsername.current = toLocalStorageInst.getItemAndTransform('user');
	}, [userCurrentUsername]);

	const username = userCurrentUsername.current ? userCurrentUsername.current.username : null;
	const infosCurrentUser = usersInfos.users.find((user: User) => {
		return user.username === username;
	})
	return (
		
		<div className="headerProfileContainer">
			<p className='nameCurrentUser'>{ infosCurrentUser && infosCurrentUser.username }</p>
			{ infosCurrentUser && <img className="avatarImg" src={ infosCurrentUser.urlAvatar } alt="avatar" /> }
		</div>
		
	)
}

export default ProfileInfos;