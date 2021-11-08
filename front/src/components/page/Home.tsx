import React from "react";
import Header from "../Header";
import SigninOrSignup from "../SigninOrSignup";


const Home: React.FC = () => {
    const status = window.localStorage.getItem('user') ? true : false;
    return (
        <div>
            <Header/>
            {!status && <SigninOrSignup/>}
        </div>
    )
}

export default Home;