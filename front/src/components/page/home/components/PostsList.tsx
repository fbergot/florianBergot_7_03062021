import React, { useState } from "react";
import Post from "../../../Post";
import Loader from '../../../generic/Loader';
import { BiMessageDetail } from 'react-icons/bi';
import PostCreation from './PostCreation';
import { Transition } from "react-transition-group";

type PostState = {
	isLoading: boolean,
	posts: any,
	error: string
}

type PropsType = {
	posts: PostState,
	update: () => void;
}

// animation
const duration = 400;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out, transform ${duration}ms ease-in-out`,
  opacity: 0,
};
const transitionStyles: any = {
  entering: { opacity: 1, transform: "translateY(2%)" },
  entered: { opacity: 1, transform: "translateY(1%)" },
  exiting: { opacity: 1, transform: "translateY(0%)" },
  exited: { opacity: 0, transform: "translateY(-20%)" },
};

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
					<button onClick={() => setDisplayCreationPost((state) => !state)}>
						<BiMessageDetail className="icon-header-post-area" />
						{displayCreationPost === false ? "Créer un poste" : "Réduire"}
					</button>
				</h2>
			</div>
			 
			<div className="postsContainer">
				 <Transition in={displayCreationPost} timeout={duration}>
					{state => (
					<div style={{ ...defaultStyle,...transitionStyles[state]} }>
						{ displayCreationPost && <PostCreation update={update} />}
					</div>
					)}
				</Transition>
				{ posts.error ? <p>{ posts.error }</p> : loadingOrListPosts }
			</div>
				
			
		</div>
  );
}

export default PostsList;