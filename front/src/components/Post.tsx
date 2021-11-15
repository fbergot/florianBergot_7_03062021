import React from "react";
import cardImg from '../assets/imagesAndIcones/icon/icon.png';

type Props = {
	postData: any
}

const Post: React.FC<Props> = ({ postData }) => {
	const img = postData.attachment ? <img className="card-img" src={ postData.attachment } alt="Pièce jointe du post" /> : null;
	return (
		<article className="card">
			<div className="card-body">
				<div>
					<h3 className="card-title">Par {postData.User.username}</h3>
					<img className="card-identifier" src={ cardImg } alt="post identifier" />
				</div>
				<p className="card-text">{ postData.content}</p>
				<p className="card-category"><strong>Categorie : </strong>{ postData.Categories[0].name}</p>
			</div>
			{ img }
		</article>
	)
}

export default Post;