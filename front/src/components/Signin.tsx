import React, { useState } from "react";
import toApiInstance from "../class/appCore/ToAPI";
import toLocalStorageInst from "../class/utils/ToLocalStorage";

const Signin: React.FC = () => {
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
        }
    }

    const onSubmit = async () => {
        const data = {
            email: email,
            password: password
        }

        const result = await toApiInstance.toApi('POST', 'users/signin', data, {})
        if (result) {
            const status = toLocalStorageInst.tranformAndSetItem(result.data, 'user');
            if (status) {
                window.location.assign('/');
            }
        }       
    }
    return (
        <div>
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
                <button type='button' onClick={() => onSubmit()} className='btn btn-primary'>M'identifier</button>              
            </form>
        </div>
    )
}

export default Signin;