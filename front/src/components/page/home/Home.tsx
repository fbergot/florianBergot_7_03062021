import React, { useState } from "react";
import Header from "../../Header";
import SigninOrSignup from "./components/SigninOrSignup";
import HomeContainer from "./components/HomeContainer";

const Home: React.FC = () => {
    const [state, setState] = useState<boolean>(false);
    const changeStateHeader = () => {
        setState(true);
    }
    const status = window.localStorage.getItem('user') ? true : false;
    const body = status ? <HomeContainer changeHeader={changeStateHeader} /> : <SigninOrSignup />;
    return (
        <div>
            <Header headerProfile={ state }/>
            { body }
        </div>
    )
}

export default Home;