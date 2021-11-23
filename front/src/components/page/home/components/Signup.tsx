import React, { useState, createRef } from "react";
import toApiInstance from "../../../../class/appCore/ToAPI";
import * as dotenv from 'dotenv';

dotenv.config();

type T = {
	onRedirect: () => void
}

const Signup: React.FC<T> = (props) => {
	const fileInput: React.RefObject<any> = createRef<any>();
	const [username, setUsername] = useState<string>('');
	const [businessRole, setBusinessRole] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
		switch (e.target.name) {
			case 'username':
				setUsername(e.target.value);
				break;
			case 'businessRole':
				setBusinessRole(e.target.value);
				break;
			case "email":
				setEmail(e.target.value);
				break;
			case 'password':
				setPassword(e.target.value);
		}
	}

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		// get path to API
		const uriToApi_usersSignup = process.env.REACT_APP_URI_USERS_SIGNUP;
		if (!uriToApi_usersSignup) throw Error('URI to API (users signup route) is missing');
		e.preventDefault();

		// build data
		const formData = new FormData();
		formData.append('username', username);
		formData.append('businessRole', businessRole);
		formData.append('isAdmin', "false");
		formData.append('email', email);
		formData.append('password', password);
		formData.append("image", fileInput.current.files[0]);

		// call API
		const result = await toApiInstance.toApi('POST', uriToApi_usersSignup, formData, { headers: {
			'accept': 'application/json',
			'Content-Type': `multipart/form-data`,
		}})
		// pas de re-rendu pour le moment pour l'affichage erreur (voir gestion d'erreur ensuite) --
		const status = result ? props.onRedirect() : "Une erreur s'est produite";           
	} 
    
    return (
		<div>
			<form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
				<div className="form-group">
					<label htmlFor="username">Nom d'utilisateur</label>
					<input onChange={(e) => handle(e)} name='username' value={username} type="text" className="form-control"
						id="username" placeholder="Bob" />
				</div>

				<div className="form-group">
					<label htmlFor="businessRole">Rôle dans l'entreprise</label>
					<input onChange={(e) => handle(e)} name='businessRole' value={businessRole}
						type="text" className="form-control" id="businessRole" placeholder="ex: PDG" />
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input onChange={(e) => handle(e)} value={email} name="email" type="email"
						className="form-control" id="email" placeholder="name@example.com" />
				</div>

				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input onChange={(e) => handle(e)} value={password} name="password"
						type="password" className="form-control" id="password" />
				</div>

				<div className="form-group">
					<label htmlFor="avatar">Image de profil</label>
					<input type="file" className="form-control-file" id="avatar" ref={fileInput} name='image'/>
				</div>

				<button type="submit" className='btn btn-primary'>Envoyer</button>               
			</form>
		</div>
    )
}

export default Signup;