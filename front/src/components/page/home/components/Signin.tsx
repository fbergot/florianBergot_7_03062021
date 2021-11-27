import React, { useState } from "react";
import toApiInstance from "../../../../class/appCore/ToAPI";
import toLocalStorageInst from "../../../../class/utils/ToLocalStorage";

type Props = {
    switchHandle: () => void;
    buttonMessage: string;
};

const Signin: React.FC<Props> = ({ switchHandle, buttonMessage }) => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

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
        const data = {
            email: email,
            password: password
        }

        const result = await toApiInstance.toApi('POST', 'users/signin', data, {})
        if (result && typeof result !== 'string') {
            // add infos user in localStor
            const status = toLocalStorageInst.tranformAndSetItem(result.data, 'user');
            if (status) {
                window.location.assign('/');
            }
        } else {
            console.error("Une erreur est survenue");
        }       
    }
    return (
        <div className='container-signin'>
            <form>
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

                <div className="signin-cont-button">
                    <button type='button' onClick={() => onSubmit()} className="send-button">Envoyer</button>
                    <button className="switch-button" onClick={ () => switchHandle() }>{ buttonMessage }</button>
                </div>
            </form>
        </div>
    )
}

export default Signin;