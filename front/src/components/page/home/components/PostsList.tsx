import React, { useState } from "react";
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
	const [displayCreationPost, setDisplayCreationPost] = useState<boolean>(false);
	const loadingOrListPosts = posts.isLoading ? <Loader className={"lds-ring"} /> :
		posts.posts && posts.posts.map((post: any, index: number) => {
			return <Post key={ index } postData={ post }/>
		});	
	return (
		<div className="postsListContainer">
			<div className="header-cate-container">
				<h2 className="title-area-p">
					<button onClick={() => setDisplayCreationPost(!displayCreationPost)}>
						<BiMessageDetail className="icon-header-post-area" />
						Créer un poste
					</button>
				</h2>
			</div>
			<div className="postsContainer">
				{ displayCreationPost && <PostCreation update={ update }/> }
				{ posts.error ? <p>{ posts.error }</p> : loadingOrListPosts }
			</div>
		</div>
  );
}

export default PostsList;