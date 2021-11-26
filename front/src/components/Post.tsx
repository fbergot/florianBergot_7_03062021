import React, { useEffect, useState } from "react";
import cardImg from '../assets/imagesAndIcones/icon/icon.png';
import moment from 'moment';
import Moment from '../class/appCore/Moment';
import CommentsList from "./page/home/components/CommentsList";
import { BsHandThumbsUp, BsHandThumbsDown } from "react-icons/bs";
import toLocaleStorageInst from "../class/utils/ToLocalStorage";
import toApiInstance from '../class/appCore/ToAPI';
import { useDispatch } from "react-redux";
import { apiCallPosts } from '../store/posts/postActions';

type Props = {
	postData: {
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
	}
}

const Post: React.FC<Props> = ({ postData }) => {
	let token: string = '';
	const dispatch = useDispatch();
	const userInfos: { token: string, id: number } = toLocaleStorageInst.getItemAndTransform("user");
	const [displayComments, setDisplayComments] = useState<boolean>(false);
	const [reactionPositiv, setReactionPositiv] = useState<number>(0);
	const [reactionNegativ, setReactionNegativ] = useState<number>(0);
	const [error, setError] = useState<string>('');

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
	}
	
	const buttonTitle = displayComments ? 'Réduire' : "Commentaires";
	const onClickDisplay = () => {
		const newState = displayComments ? false : true;
		setDisplayComments(newState);
	}

	// call API for get like & dislike of post
	useEffect(() => {
		const callApi = async (postId: number, token: string) => {
			let like = 0;
			let dislike = 0;
	
			const responseApi = await toApiInstance.callApiRefact('GET', `reactions/getReactions/${ postId }`, {}, {}, token);
	
			if (typeof responseApi === 'string') {
				setError(responseApi);
				return;
			}
	
			responseApi.data.Reactions.forEach((reaction: { likeOrDislike: string }) => {
				reaction.likeOrDislike === 'like' ? (like++) : (dislike++);
			});
			setReactionPositiv(like);
			setReactionNegativ(dislike);
		}
		
		callApi(postData.id, token);
	}, [postData.id, token]);

	// add like or delete dislike
	const onClickLike = async () => {
		let like = 0;
		let dislike = 0;

		await toApiInstance.callApiRefact('POST', `reactions/add/${postData.id}`, { likeOrDislike: "like" }, {}, token);
		const responseApi = await toApiInstance.callApiRefact('GET', `reactions/getReactions/${postData.id}`, {}, {}, token);
		
		if (typeof responseApi === 'string') {
			setError(responseApi);
			return;
		}
	
		responseApi.data.Reactions.forEach((reaction: { likeOrDislike: string }) => {
			reaction.likeOrDislike === 'like' ? (like++) : (dislike++);
		});
		setReactionPositiv(like);
		setReactionNegativ(dislike);
	}
	
	// add dislike or delete like
	const onClickDislike = async () => {
		let like = 0;
		let dislike = 0;

		await toApiInstance.callApiRefact('POST', `reactions/add/${postData.id}`, { likeOrDislike: "dislike" }, {}, token);
		const responseApi = await toApiInstance.callApiRefact('GET', `reactions/getReactions/${postData.id}`, {}, {}, token);
		
		if (typeof responseApi === 'string') {
			setError(responseApi);
			return;
		}
	
		responseApi.data.Reactions.forEach((reaction: { likeOrDislike: string }) => {
			reaction.likeOrDislike === 'like' ? (like++) : (dislike++);
		});
		setReactionPositiv(like);
		setReactionNegativ(dislike);
	}
	
	const handleDelete = async () => {
		await toApiInstance.callApiRefact('DELETE', `posts/delete/${postData.id}`, {}, {}, token);
		dispatch(apiCallPosts());
	}

	// time ago & update moment locale
	Moment.momentLoc();
	const timeAgo = moment(postData.createdAt).fromNow(true);
	// check if img -> disply or null
	const img = postData.attachment ? <img className="card-img" src={ postData.attachment } alt="Pièce jointe du post" /> : null;
	return (
		<article className="card">
			<div className="card-body">

				<div className="card-user-identifierCont">
					<div className="container-img-title">
						<img className="card-identifier" src={ cardImg } alt="post identifier" />
						<h3 className="card-title">{ postData.User.username }, <span className='card-timeAgo'>il y a { timeAgo }</span></h3>
					</div>

					<div className='container-category-delete'>
						<p className="card-category">Categorie <span className="category-name">{ postData.Categories[0].name }</span></p>
						{ postData.User.id === userInfos.id ? <span><button className="delete-button" onClick={(e) => handleDelete()} type="button">X</button></span> : null }
					</div>
				</div>

				<p className="card-text">{ postData.content }</p>
				{/* if error */}
				{error && <p>Une erreur c'est produite : {error}</p>}
				
				<div className="container-like-icon">
					<p>
						<button className="button-reaction" onClick={() => onClickLike()} type="button">
							<BsHandThumbsUp className="reaction-icon"/>
						</button>
						<span>{ reactionPositiv }</span>
					</p>
					<p>
						<button onClick={() => onClickDislike()} className="button-reaction">
							<BsHandThumbsDown className="reaction-icon"/>
						</button>
						<span>{ reactionNegativ }</span>
					</p>
				</div>
				
			</div>			
			{ img }		
			<div className="comment-button-container">
				<button className="comment-button" onClick={() => onClickDisplay()}>{  buttonTitle }</button>					 					
			</div>					
			{ displayComments && <CommentsList idPost={ postData.id }/> }
		</article>
	)
}

export default Post;