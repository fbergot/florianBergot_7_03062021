import React, { useEffect, useState } from "react";
import Comment from './Comment';
import toApiInstance from '../../../../class/appCore/ToAPI';
import toLocalStorageInst from "../../../../class/utils/ToLocalStorage";

type PropsType = {
	idPost: number;
}


const CommentsList: React.FC<PropsType> = ({ idPost }) => {
	let token: string = '';
	const userInfos: { token: string } = toLocalStorageInst.getItemAndTransform("user");
	const [addComment, setAddComment] = useState<string>('');
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
		const callApi = async () => {
			const responseApi = await toApiInstance.callApiRefact('GET', `comments/getAll/${idPost}`, {}, {}, token);
			if (typeof responseApi === 'string') {
				setError(responseApi);
			}
			setComments(responseApi);
		}       
		callApi();
	}, [idPost, token]);

	// add comments & reload
	const onSubmit = async () => {
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
	}
						
    return (
        <div className="global-comments-container">
            <div className='comment-container'>
                <form>
                    <textarea value={addComment} onChange={(e) => handleChange(e)}></textarea>
                    <button type='button' onClick={ () => onSubmit() }>Poster mon commentaire</button>
				</form>
				{ error && <p>Une erreur est survenue: { error }</p> }
                {
                    comments && comments.data.length !== 0 && comments.data.map((comment: any, index: number) => {
                        return <Comment key={ index } commentData={ comment }/>
                    })
                }
            </div>
        </div>
    )
}

export default CommentsList;