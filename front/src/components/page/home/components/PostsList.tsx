import React from "react";
import Post from "../../../Post";
import Loader from '../../../generic/Loader';
import { BiMessageDetail } from 'react-icons/bi';
import PostCreation from './PostCreation';

type PostState = {
	isLoading: boolean,
	posts: any,
	error: string
}

type PropsType = {
	posts: PostState,
	update: () => void;
}

const PostsList: React.FC<PropsType> = ({ posts, update }) => {
	const loadingOrListPosts = posts.isLoading ? <Loader className={"lds-ring"} /> :
		posts.posts && posts.posts.map((post: any, index: number) => {
			return <Post key={ index } postData={ post } />
		});	
	return (
		<div className="postsListContainer">
			<div className="header-cate-container">
				<BiMessageDetail className="icon-header-post-area"/>
				<h2 className="title-area-p">Les derniers postes / Ajouter votre poste</h2>
			</div>
			<div className="postsContainer">
				<PostCreation update={ update }/>
				{ posts.error ? <p>{ posts.error }</p> : loadingOrListPosts }
			</div>
		</div>
    )
}

export default PostsList;