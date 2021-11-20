import React, { useEffect, useState } from "react";
import Comment from './Comment';
import toApiInstance from '../../../../class/appCore/ToAPI';
import toLocalStorageInst from "../../../../class/utils/ToLocalStorage";
import GrmImg from '../../../../assets/imagesAndIcones/icon/logo_alone_groupomania.png';
import Loader from '../../../generic/Loader';

type PropsType = {
	idPost: number;
}

const CommentsList: React.FC<PropsType> = ({ idPost }) => {
	let token: string = '';
	const userInfos: { token: string } = toLocalStorageInst.getItemAndTransform("user");
	const [addComment, setAddComment] = useState<string>('');
	const [loadComment, setLoadComment] = useState<boolean>(true);
	const [error, setError] = useState<string>('');
	const [comments, setComments] = useState<any>(null);
	const handleChange = (e:  React.ChangeEvent<HTMLTextAreaElement>) => {
		setAddComment(e.target.value);
	}

	if (userInfos) {
		token = userInfos.token
	} else {
		console.error('Aucune infos utilisateur (token..)')
    }
    
	// loading all comments
	useEffect(() => {
		setLoadComment(true);
		const callApi = async () => {
			const responseApi = await toApiInstance.callApiRefact('GET', `comments/getAll/${idPost}`, {}, {}, token);
			if (typeof responseApi === 'string') {
				setError(responseApi);
				return;
			}
			setLoadComment(false);
			setComments(responseApi);
		}       
		callApi();
	}, [idPost, token]);

	// add comments & reload
	const onSubmit = async () => {
		setLoadComment(true);
		const data = {
			content: addComment
		}

		const responseApiAddComments = await toApiInstance.callApiRefact('POST', `comments/add/${idPost}`, data, {}, token);
		if (typeof responseApiAddComments === 'string') {
			setError(responseApiAddComments);
			return;
		}
		const responseApiGetAllComments = await toApiInstance.callApiRefact("GET", `comments/getAll/${idPost}`, {}, {}, token);
		if (typeof responseApiGetAllComments === 'string') {
			setError(responseApiGetAllComments);
			return;
		}
		setComments(responseApiGetAllComments);
		setAddComment("");
		setLoadComment(false);
	}
						
    return (
        <div className="global-comments-container">
			<img className="img-comment-area" src={ GrmImg } alt="world representation of groupomania"/>
			<div className='comments-container'>
				<div className="title-form-area">
					<h5>Créer votre commentaire</h5>
					<form className="area-container">
						<textarea className="area-create-comment" value={ addComment } onChange={(e) => handleChange(e)} placeholder="Ceci est mon commentaires ..."></textarea>
						<button type='button' onClick={ () => onSubmit() }>Poster mon commentaire</button>
					</form>
				</div>
				<div className="area-list">
					<h5>Les derniers commentaires publiés</h5>
					{loadComment ? <Loader className={"lds-ring-color"} /> : 
						<div className="comment-container-list">
							{ error && <p>Une erreur est survenue: { error }</p> }
							{
								comments && comments.data.length !== 0 && comments.data.map((comment: any, index: number) => {
									return <Comment key={ index } commentData={ comment }/>
								})
							}
						</div>
					}
				</div>
            </div>
        </div>
    )
}

export default CommentsList;