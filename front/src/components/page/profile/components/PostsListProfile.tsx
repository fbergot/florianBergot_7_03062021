import React from "react";
import Loader from "../../../generic/Loader";
import { BiMessageDetail } from "react-icons/bi";
import SimplePostProfile from "./SimplePostProfile";

type Props = {
	data: {
		isLoading: boolean;
		infos: {
			Posts: any;
			username: string;
		};
	};
}

type Post = {
	createdAt: string;
	username: string;
	Categories: any[];
	content: string;
	attachment: string;

}

const PostsListProfile: React.FC<Props> = ({ data }) => {
	const loadingOrListOfPost = data.isLoading ? <Loader className={"lds-ring-color"} /> : 
		data.infos.Posts && data.infos.Posts.length !== 0 && data.infos.Posts.map((post: Post, index: number) => {
			return <SimplePostProfile creator={ data.infos.username } key={ index } data={ post }/>
		})
    return (
		<div className="profilePosts-list-container">
			<div className="container-posts-profile">
				<div className="header-posts-profile">
					<BiMessageDetail className="icon-header-cate-area"/>
					<h2 className="title-post-profile-area">Vos derniers postes</h2>
				</div>
			</div>
			{ loadingOrListOfPost }		
		</div>
    );
}

export default PostsListProfile;