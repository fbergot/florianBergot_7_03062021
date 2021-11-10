import React from "react";
import Header from "../Header";
import SigninOrSignup from "../SigninOrSignup";
import HomeComponents from "../HomeComponents";

const Home: React.FC = () => {
    const status = window.localStorage.getItem('user') ? true : false;
    const body = status ? <HomeComponents /> : <SigninOrSignup />;
    return (
        <div>
            <Header/>
            {body}
        </div>
    )
}

export default Home;