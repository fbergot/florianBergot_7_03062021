import React, { useState } from "react";
import toApiInstance from "../class/appCore/ToAPI";

type T = {
    onRedirect: () => any
}

const Signup: React.FC<T> = (props) => {
    const [username, setUsername] = useState('');
    const [businessRole, setBusinessRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
    let status;
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('businessRole', businessRole);
        formData.append('isAdmin', "false");
        formData.append('email', email);
        formData.append('password', password);
        // formData.append('image', e.target[4].value);

        const result = await toApiInstance.toApi('POST', 'users/signup', formData, { headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data`,
        }})
        status = result ? props.onRedirect() : "Une erreur s'est produite";           
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
                    <input type="file" className="form-control-file" id="avatar" name='image'/>
                </div>

                <button type="submit" className='btn btn-primary'>Envoyer</button>               
            </form>
            {status}
        </div>
    )
}

export default Signup;