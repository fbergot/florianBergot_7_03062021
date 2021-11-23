import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsListProfile from "./PostsListProfile";
import UserData from "./UserData";
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
		<main className="main-profile">
			<UserData data={ stateCurrentUserInfos }/>
			<PostsListProfile data= { stateCurrentUserInfos }/>
		</main>
	)
}

export default ProfileContainer;