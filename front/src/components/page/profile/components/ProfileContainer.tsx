import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallCurrentUserInfos } from "../../../../store/profile/profileActions";

type RootState = {
    profileInfos: {
        isLoading: false,
		infos: [],
		error: ""
    };
}

const ProfileContainer: React.FC = () => {
	const stateCurrentUserInfos = useSelector((states: RootState) => states.profileInfos);
	const dispatch = useDispatch();

	useEffect(() => {
		apiCallCurrentUserInfos(dispatch);
	}, [dispatch]);
	
	return (
		<div>
			<h1>Mon profile</h1>
			<p>{JSON.stringify(stateCurrentUserInfos)}</p>
		</div>
	)
}


export default ProfileContainer;