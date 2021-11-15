import React from "react";
import Post from "../../../Post";

type PostState = {
	isLoading: boolean,
	posts: any[],
	error: string
}

type PropsType = {
	posts: PostState,
}

const PostsList: React.FC<PropsType> = ({ posts }) => {
	const stateOrData = posts.isLoading ? "Chargement..." : posts.posts && posts.posts.map((post, index) => {
		return <Post key={index} postData={post}/>
	})
	return (
		<div className="postsListContainer">
			<h2>Les derniers posts</h2>
			<div className="postsContainer">
				{ stateOrData }
			</div>
		</div>
    )
}

export default PostsList;