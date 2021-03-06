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
    update: () => void;
}

const PostCreation: React.FC<PropsType> = ({ update }) => {
    const fileInput: React.RefObject<any> = createRef();
    const [message, setMessage] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const categoryState = useSelector((state: GlobalState) => state.category);
    const [error, setError] = useState<string | null>(null);

	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		let token: string = "";
		const userInfos: { token: string } | undefined = toLocalStorageInst.getItemAndTransform("user");
		
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
		formData.append('content', message);
		formData.append('category', category);
		formData.append("image", fileInput.current.files[0]);
        // call API
        const responseApi = await toApiInstance.callApiRefact("POST", uriToApi_addPost, formData, {}, token);
        
        if (typeof responseApi === "string") {
            setError(responseApi);
            return;
        }      
        setMessage('');
        update();
    }

    return (
        <div className='postCreation-container'>
            { error }
            <form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
                <div className="general-display-areaMessage">
                    <div className="container-areaMessage">
                        {/* <p>Cr??er votre message</p> */}
                        <textarea className="areaMessage" placeholder='Votre message...' value={message} onChange={(e) => setMessage(e.target.value)}></textarea>                       
                    </div>

                    <div className='cont-img-cat'>                 
                        { categoryState.categories.length !== 0 &&
                            <div className="cont-createCat">
                                {/* <label>Cat??gories existantes</label> */}
                                <select value={ category } onChange={(e) => setCategory(e.target.value)}>
                                    <option value='divers'>Cat??gories existantes</option>
                                    {categoryState.categories.map((category: { name: string }, index: number) => {
                                        return <option key={ index } value={ category.name }>{ category.name }</option>
                                    })}
                                </select>
                            </div> 
                        }
                        <div className="cont-createCat">
                            {/* <label htmlFor="createCat">Cr??er sa cat??gorie</label> */}
                            <input placeholder="Cr??er une cat??gorie, ex: no??l" value={ category } onChange={(e) => setCategory(e.target.value)} id='createCat' type='text'/>
                        </div>
                        
                        <div className='cont-image'>
                            <label id="label-file" htmlFor="image">
                                Ajouter une image
                                <input id="image" type='file' ref={ fileInput } name="image"/>
                            </label>
                        </div>
                    </div>
                </div>
                
            <div className='cont-button'>
                <button type="submit">Cr??er mon poste</button>
            </div>
            </form>
        </div>
    )
}

export default PostCreation;