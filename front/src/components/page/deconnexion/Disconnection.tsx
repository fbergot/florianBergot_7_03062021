import React from "react";
import { useHistory } from "react-router-dom";

const Disconnection: React.FC = () => {
    const history = useHistory();
    window.localStorage.removeItem("user");
    history.push("/");
    return <></>;
};

export default Disconnection;
