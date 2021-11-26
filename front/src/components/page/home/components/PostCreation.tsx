import React, { useState, createRef } from "react";
import { useSelector } from "react-redux";
import toApiInstance from '../../../../class/appCore/ToAPI';
import toLocalStorageInst from '../../../../class/utils/ToLocalStorage';


type GlobalState = {
    category: {
       categories: { name: string }[];
    }
}


type PropsType = {
    
}

const PostCreation: React.FC<PropsType> = () => {
    const fileInput: React.RefObject<any> = createRef<any>();
    const [message, setMessage] = useState<string>('');
    const [category, setCategory] = useState<string>('divers');
    const categoryState = useSelector((state: GlobalState) => state.category);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let token: string = "";
		const userInfos: { token: string } = toLocalStorageInst.getItemAndTransform("user");
		
        if (userInfos) {
          	token = userInfos.token;
        } else {
          	console.error("Not data user (token..)");
		}
		
        // get path to API
        const uriToApi_addPost = process.env.REACT_APP_URI_TO_ADD_POST;
        if (!uriToApi_addPost) throw Error("URI to API (add post) is missing");
        // build data
		const formData = new FormData();
		console.log(message);
		console.log(category);
		console.log(fileInput.current.files[0]);

		formData.append('content', message);
		formData.append('category', category);
		formData.append("image", fileInput.current.files[0]);
        // call API
		const responseApi = await toApiInstance.callApiRefact("POST", uriToApi_addPost, formData, {}, token);
        
        
        console.log("reponse api:", responseApi);
    }
    return (
        <div className='postCreation-container'>
            <p>Créer votre post</p>

            <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                <textarea value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                
                <div>
                    <label htmlFor="image">Ajouter une image</label>
                    <input id="image" type='file' ref={fileInput} name="image"></input>
                </div>

                <select value={ category } onChange={(e) => setCategory(e.target.value)}>
                    <option value="divers">Divers</option>
                    {categoryState.categories.map((category: { name: string }, index: number) => {
                        return <option key={index} value={category.name}>{ category.name}</option>
                    })}
                </select>

                <button type="submit">Créer mon poste</button>
            </form>
            
        </div>
    )
}

export default PostCreation;