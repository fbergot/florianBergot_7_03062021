import React, { useEffect, useState } from "react";
import cardImg from '../assets/imagesAndIcones/icon/icon.png';
import moment from 'moment';
import Moment from '../class/appCore/Moment';
import CommentsList from "./page/home/components/CommentsList";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import toLocaleStorageInst from "../class/utils/ToLocalStorage";
import toApiInstance from '../class/appCore/ToAPI';

type Props = {
	postData: {
		id: number;
		attachment?: string;
		createdAt: string;
		User: {
			username: string;
		};
		content: string;
		Categories: { name: string }[];
		Comments: any[];
	}
}

const Post: React.FC<Props> = ({ postData }) => {
	let token: string = '';
	const userInfos: { token: string } = toLocaleStorageInst.getItemAndTransform("user");
	const [displayComments, setDisplayComments] = useState<boolean>(false);
	let [reactionPositiv, setReactionPositiv] = useState<any>(0);
	let [reactionNegativ, setReactionNegativ] = useState<any>(0);
	const [error, setError] = useState<string>('');

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}
	
	const buttonTitle = displayComments ? 'Réduire' : "Afficher les commentaires";
	const onClickDisplay = () => {
		const newState = displayComments ? false : true;
		setDisplayComments(newState);
	}

	// call API for get like & dislike of post
	useEffect(() => {
		let like = 0;
		let dislike = 0;
		const callApi = async () => {
			const responseApi = await toApiInstance.callApiRefact('GET', `reactions/getReactions/${postData.id}`, {}, {}, token);
			if (typeof responseApi === 'string') {
				setError(responseApi);
				return;
			}
			console.log(responseApi);
			responseApi.data.Reactions.forEach((reaction: any) => {
				if (reaction.likeOrDislike === "like") {
					like += 1;					
				} else if (reaction.likeOrDislike === "dislike") {
					dislike += 1;
					
				}
			});
			setReactionPositiv(like);
			setReactionNegativ(dislike);
		}
		callApi();
	}, [postData.id, token]);

	// add like
	const onClickLike = () => {

	}
	// update moment locale
	Moment.momentLoc();
	const timeAgo = moment(postData.createdAt).fromNow(true);
	const img = postData.attachment ? <img className="card-img" src={ postData.attachment } alt="Pièce jointe du post" /> : null;
	return (
		<article className="card">
			<div className="card-body">
				<div className="card-user-identifierCont">
					<div className="container-img-title">
						<img className="card-identifier" src={ cardImg } alt="post identifier" />
						<h3 className="card-title">{ postData.User.username }, <span className='card-timeAgo'>il y a { timeAgo }</span></h3>
					</div>
					<p className="card-category">Categorie <span className="category-name">{ postData.Categories[0].name }</span></p>
				</div>
				<p className="card-text">{ postData.content }</p>
				{/* if error */}
				{ error && <p>Une erreur c'est produite : { error }</p>}
				<div>
					<p>
						<button onClick={ () => onClickLike() } type="button"><BsHandThumbsUp/></button>
						<span>{ reactionPositiv }</span>
					</p>
					<p>
						<BsHandThumbsDown />
						<span>{ reactionNegativ }</span>
					</p>
				</div>
			</div>			
			{ img }

			{/* button display comments */}
			{ postData.Comments.length !== 0 ? 
				<div className="comment-button-container">
					<button className="comment-button" onClick={() => onClickDisplay()}>{  buttonTitle }</button>					 					
				</div>	
				: <div className="comment-button-container">
					<p className="No-comment">Aucun commentaires</p>
				</div> }
			{/* container comments */}
			{ displayComments && postData.Comments.length !== 0 ?
				<CommentsList idPost={ postData.id } />
			: null }
		</article>
	)
}

export default Post;