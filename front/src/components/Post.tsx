import React, { useState } from "react";
import cardImg from '../assets/imagesAndIcones/icon/icon.png';
import moment from 'moment';
import Moment from '../class/appCore/Moment';
import CommentsList from "./page/home/components/CommentsList";

type Props = {
	postData: {
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
	const [displayComments, setDisplayComments] = useState<boolean>(false);
	const buttonTitle = displayComments ? 'Réduire' : "Afficher les commentaires";
	const onClickDisplay = () => {
		const newState = displayComments ? false : true;
		setDisplayComments(newState);
	}
	// update moment locale
	Moment.momentLoc();
	const timeAgo = moment(postData.createdAt).fromNow(true);
	const img = postData.attachment ? <img className="card-img" src={ postData.attachment } alt="Pièce jointe du post" /> : null;
	return (
		<article className="card">
			<div className="card-body">
				<div className="card-user-identifierCont">
					<img className="card-identifier" src={ cardImg } alt="post identifier" />
					<h3 className="card-title">{ postData.User.username }, <span className='card-timeAgo'>il y a { timeAgo }</span></h3>
				</div>
				<p className="card-text">{ postData.content }</p>				
				<p className="card-category">Categorie <span className="category-name">{ postData.Categories[0].name }</span></p>
			</div>			
			{ img }

			{/* button display comments */}
			{postData.Comments.length !== 0 ? 
				<div className="comment-button-container">
					<button className="comment-button" onClick={() => onClickDisplay()}>{  buttonTitle }</button>					 					
				</div>	
				: <div className="comment-button-container">
					<p className="No-comment">Aucun commentaires</p>
				</div>}
			{/* container comments */}
			{ displayComments && postData.Comments.length !== 0 ?
				<CommentsList allComments={ postData.Comments } />
			: null }
		</article>
	)
}

export default Post;