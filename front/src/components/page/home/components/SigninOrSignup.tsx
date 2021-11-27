import React, { useState } from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import logo from '../../../../assets/imagesAndIcones/icon/icon-above-font.png';

const SigninOrSignup: React.FC = () => {
	const [state, setState] = useState<string>('signup');
	const redirect = () => {
		setState('signin');
	}
	const handle = () => {
		state === "signup" ? setState('signin') : setState('signup');
	}
	
	const mess = state === 'signin' ? "Pas encore inscrit ?" : "Déja un compte ?";
	const display = state === 'signin' ? <Signin switchHandle={ handle } buttonMessage={ mess } /> :
		<Signup switchHandle={ handle } buttonMessage={ mess } onRedirect={ redirect } />;

	return (
		<div className="container">
			<header className="header-signup">
				<img src={ logo } alt='entreprise logo'/>
			</header>
			<main>
				{ display }
			</main>
		</div>
	)
}

export default SigninOrSignup;