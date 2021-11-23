import React from "react";
import Loader from "../../../generic/Loader";
import { BiMessageDetail } from "react-icons/bi";

type Props = {
	data: {
		isLoading: boolean;
		infos: any;
	};
}

const PostsListProfile: React.FC<Props> = ({ data }) => {
    return (
		<div className="profilePosts-list-container">
			<div className="container-posts-profile">
				<div className="header-posts-profile">
					<BiMessageDetail className="icon-header-cate-area"/>
					<h2 className="title-post-profile-area">Les derniers posts</h2>
				</div>
				{}
			</div>
			{ data.isLoading ? <Loader className={"lds-ring-color"} /> : 
				<p>{JSON.stringify(data.infos)}</p>
			}		
		</div>
    );
}

export default PostsListProfile;