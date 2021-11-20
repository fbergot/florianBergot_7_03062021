import React from "react";

const Loader: React.FC = () => {	
    return  <div className="loader-container">
                <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>   
            </div>
}

export default Loader;