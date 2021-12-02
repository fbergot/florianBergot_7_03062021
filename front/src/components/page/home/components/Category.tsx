import React from "react";

type PropsType = {
    categoryData: {
        name: string;
    },
    handlerPostPerCategory: (idCategory: string) => void;
}

const Category: React.FC<PropsType> = ({ categoryData, handlerPostPerCategory }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handlerPostPerCategory(categoryData.name);
    }
    return (
        <div className='bubbleCategory'>
            <button onClick={ (e) => handleClick(e) } className="button-bubbleCategory">
                { categoryData.name }
            </button>
        </div>
    )
}

export default Category;