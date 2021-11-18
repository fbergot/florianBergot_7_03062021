import React from "react";

type PropsType = {
    categoryData: any,
    handlerPostPerCategory: (idCategory: string) => void;
}

const Category: React.FC<PropsType> = ({ categoryData, handlerPostPerCategory }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handlerPostPerCategory(e.target.textContent);
    }
    return (
        <div className='bubbleCategory'>
            <button onClick={(e) => handleClick(e)} data-name={ categoryData.name } className="button-bubbleCategory">
                { categoryData.name }
            </button>
        </div>
    )
}

export default Category;