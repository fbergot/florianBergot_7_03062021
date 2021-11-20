import React from "react";
import Post from "../../../Post";
import Loader from '../../../generic/Loader';
import { BiMessageDetail } from 'react-icons/bi';

type PostState = {
	isLoading: boolean,
	posts: any,
	error: string
}

type PropsType = {
	posts: PostState,
}

const PostsList: React.FC<PropsType> = ({ posts }) => {
	const loadingOrListPosts = posts.isLoading ? <Loader/> : posts.posts && posts.posts.map((post: any, index: number) => {
		return <Post key={index} postData={post} />
	});
		

	return (
		<div className="postsListContainer">
			<div className="header-cate-container">
				<BiMessageDetail className="icon-header-cate-area"/>
				<h2 className="title-area">Les derniers posts</h2>
			</div>
			<div className="postsContainer">
				{ loadingOrListPosts }
			</div>
		</div>
    )
}

export default PostsList;