import React from "react";

type Props = {
    className: string;
}

const Loader: React.FC<Props> = ({ className }) => {	
    return  <div className="loader-container">
                <div className={ className }>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>   
            </div>
}

export default Loader;