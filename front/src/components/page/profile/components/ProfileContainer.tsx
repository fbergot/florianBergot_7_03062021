import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostsListProfile from "./PostsListProfile";
import UserData from "./UserData";
import { apiCallCurrentUserInfos } from "../../../../store/profile/profileActions";
import { apiCallUsers } from '../../../../store/users/userActions';

type RootState = {
    profileInfos: {
        isLoading: boolean,
		infos: {
			Posts: any;
			username: string;
		},
		error: ""
    };
}

type Props = {
	displayInfosHeader: (d: boolean) => void;
}

const ProfileContainer: React.FC<Props> = ({ displayInfosHeader }) => {
	const stateCurrentUserInfos = useSelector((states: RootState) => states.profileInfos);
	const dispatch = useDispatch();

	useEffect(() => {
		const apiCall = async () => {
			await apiCallCurrentUserInfos(dispatch);
			await apiCallUsers(dispatch);
			displayInfosHeader(true);
		}
		apiCall();
	}, [dispatch, displayInfosHeader]);

	return (
		<main className="main-profile">
			<UserData data={ stateCurrentUserInfos }/>
			<PostsListProfile data= { stateCurrentUserInfos }/>
		</main>
	)
}

export default ProfileContainer;