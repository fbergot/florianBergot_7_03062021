import React, { useState, useEffect } from "react";
import Post from "../../../Post";
import Loader from '../../../generic/Loader';
import { BiMessageDetail } from 'react-icons/bi';
import PostCreation from './PostCreation';
import { Transition } from "react-transition-group";
import Jwt from '../../../../class/appCore/Jwt';
import toLocalStorageInst from '../../../../class/utils/ToLocalStorage';

type PostState = {
	isLoading: boolean,
	posts: {
		id: number;
		attachment?: string;
		createdAt: string;
		User: {
			username: string;
			id: number;
		};
		content: string;
		Categories: { name: string }[];
		Comments: any[];
	}[],
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
	const [isAdmin, setIsAdmin] = useState<undefined | boolean>(undefined);
	const [displayCreationPost, setDisplayCreationPost] = useState<boolean>(false);
	
	useEffect(() => {
        const authorizeErase = async () => {
			try {
				const token = toLocalStorageInst.getItemAndTransform('user').token;
                const payloadToken = await Jwt.verify(token, process.env.REACT_APP_SECRET || '', {});
                if (payloadToken.isAdmin) {
                    setIsAdmin(true);
                    return;
                } 
                setIsAdmin(false);
            } catch (err) {
				console.error(err);
                setIsAdmin(false);
            }
        }
        authorizeErase();
	}, []);
	
	const loadingOrListPosts = posts.isLoading ? <Loader className={"lds-ring"} /> :
		posts.posts && posts.posts.map((post, index: number) => {
			return <Post autorizeErase={ isAdmin } key={ index } postData={ post }/>
		});
	return (
		<div className="postsListContainer">
			<div className="header-cate-container">
				<h2 className="title-area-p">
					<button onClick={() => setDisplayCreationPost((state) => !state)}>
						<BiMessageDetail className="icon-header-post-area" />
						{ displayCreationPost === false ? "Créer un poste" : "Réduire" }
					</button>
				</h2>
			</div>
			 
			<div className="postsContainer">
				 <Transition in={ displayCreationPost } timeout={ duration }>
					{state => (
					<div style={{ ...defaultStyle,...transitionStyles[state]} }>
						{ displayCreationPost && <PostCreation update={ update } />}
					</div>
					)}
				</Transition>
				{ posts.error ? <p>{ posts.error }</p> : loadingOrListPosts }
			</div>
				
			
		</div>
  );
}

export default PostsList;