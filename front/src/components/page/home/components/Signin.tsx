import React, { useState } from "react";
import toApiInstance from "../../../../class/appCore/ToAPI";
import toLocalStorageInst from "../../../../class/utils/ToLocalStorage";
import { useHistory } from 'react-router-dom';

type Props = {
    switchHandle: () => void;
    buttonMessage: string;
};

const Signin: React.FC<Props> = ({ switchHandle, buttonMessage }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const history = useHistory();

    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'password':
                setPassword(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            default:
                throw Error('Bad name of form field');
        }
    }

    const onSubmit = async (): Promise<void> => {
        const payload = { email, password };
            
        try {
            // call API
            const responseApi = await toApiInstance.toApi('POST', 'users/signin', payload, {})
            if (typeof responseApi !== 'string') {  
                // add infos user in localStor
                const returnSuccessOrError = toLocalStorageInst.tranformAndSetItem(responseApi.data, 'user');
                if (returnSuccessOrError) {
                    history.push('/');
                    return;
                }
                setError('Error with storage or with parsing/stringifying');
                return;
            }
            setError(responseApi);                 
        } catch (err: any) {
            setError(err.message);                 
        }
    }
    return (
        <div className='container-signin'>
            <form>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input onChange={(e) => handle(e)} value={ email } name="email" type="email"
                        className="form-control" id="email" placeholder="name@example.com" />
                    {error === 'Request failed with status code 404' ? <p>Aucun utilisateur avec cet email</p> : null}                       
                </div>

                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input onChange={(e) => handle(e)} value={ password } name="password"
                        type="password" className="form-control" id="password" />
                    { error === "Request failed with status code 401" ? <p>Mot de passe incorrect</p> : null }
                </div>

                <div className="signin-cont-button">
                    <button type='button' onClick={() => onSubmit()} className="send-button">Envoyer</button>
                    <button className="switch-button" onClick={ () => switchHandle() }>{ buttonMessage }</button>
                </div>
            </form>
        </div>
    )
}

export default Signin;