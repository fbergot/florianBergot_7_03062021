import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";

const SigninOrSignup: React.FC = () => {
    const [state, setState] = useState('signup');
    const display = state === 'signin' ? <Signin/> : <Signup/>;
    const mess = state === 'signin' ? "M'enregister" : "Me connecter";

    const handle = () => {
        state === "signup" ? setState('signin') : setState('signup');
    }
    return (
        <div className="container">
            <button onClick={() => handle()}>{mess}</button>
            <div>
                {display}
            </div>
        </div>
    )
}

export default SigninOrSignup;