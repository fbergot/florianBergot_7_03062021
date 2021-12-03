import React, { useState, createRef } from "react";
import toApiInstance from "../../../../class/appCore/ToAPI";
import * as dotenv from 'dotenv';

dotenv.config();

type Props = {
	onRedirect: () => void
    switchHandle: () => void;
	buttonMessage: string;
};

const Signup: React.FC<Props> = (props) => {
	const fileInput: React.RefObject<any> = createRef<any>();
	const [username, setUsername] = useState<string>('');
	const [businessRole, setBusinessRole] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string>('');

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
		e.preventDefault();
		// get path to API
		const uriToApi_usersSignup = process.env.REACT_APP_URI_USERS_SIGNUP;
		if (!uriToApi_usersSignup) throw Error('URI to API (users signup route) is missing');

		// build data
		const formData = new FormData();
		formData.append('username', username);
		formData.append('businessRole', businessRole);
		formData.append('isAdmin', "false");
		formData.append('email', email);
		formData.append('password', password);
		formData.append("image", fileInput.current.files[0]);
		try {
			// call API
			const result = await toApiInstance.toApi('POST', uriToApi_usersSignup, formData, {
				headers:
					{
						'accept': 'application/json',
						'Content-Type': `multipart/form-data`,
					}
			})

			if (typeof result !== 'string' && result.data.error && result.data.error.message) {
				setError(result.data.error.message);
				return;
			} else if (typeof result === 'string') {
				setError(result);
        		return;
			}
			// redirect to signin
			props.onRedirect();     
		} catch (err: any) {
			console.log(err);
			setError(err);
		}
	} 
    
    return (
		<div className='container-signup'>
			<form onSubmit={(e) => onSubmit(e)} encType="multipart/form-data">
				<div className="form-group">
					<label htmlFor="username">Nom d'utilisateur</label>
					<input required onChange={(e) => handle(e)} name='username' value={ username } type="text" className="form-control"
						id="username" placeholder="Bob" />
				</div>

				<div className="form-group">
					<label htmlFor="businessRole">Rôle dans l'entreprise</label>
					<input required onChange={(e) => handle(e)} name='businessRole' value={ businessRole }
						type="text" className="form-control" id="businessRole" placeholder="ex: PDG" />
				</div>

				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input required onChange={(e) => handle(e)} value={ email } name="email" type="email"
						className="form-control" id="email" placeholder="name@example.com" />
					{ error === "Request failed with status code 409" ? <p>Un utilisateur existe déjà avec cet email</p> : error === "email must be a valid email" ? 'L\'email doit être valide' : null}
				</div>

				<div className="form-group">
					<label htmlFor="password">Mot de passe</label>
					<input required onChange={(e) => handle(e)} value={ password } name="password"
						type="password" placeholder="Minimum 4 caractères" className="form-control" id="password" />
					{ error === "password must be at least 4 characters" ? <p>Le mot de passe doit contenir au moins 4 caractères</p> : null}
				</div>

				<div className="form-group">
					<label htmlFor="avatar">Ajouter une image de profil</label>
					<input type="file" className="form-control-file" id="avatar" ref={ fileInput } name='image'/>
				</div>

				<div className="signup-cont-button">
					<button type="submit" className="send-button">Envoyer</button>
					<button className="switch-button" onClick={ () => props.switchHandle() }>{ props.buttonMessage }</button>
				</div>
			</form>
		</div>
    )
}

export default Signup;