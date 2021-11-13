import React, { useEffect } from "react";
import { connect, useSelector } from "react-redux";

const ProfileContainer: React.FC = () => {

	const currentUserInfos = useSelector(state => state.user);
	console.log(currentUserInfos);

	return (
		<div>
			<h1>Mon profile</h1>
		</div>
	)
}


export default ProfileContainer;