import React from "react";

type PropsType = {
    categoryData: any,
    handlerPostPerCategory: (idCategory: string) => void;
}

const Category: React.FC<PropsType> = ({ categoryData, handlerPostPerCategory }) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handlerPostPerCategory(e.target.parentNode.dataset.id);
    }
    return (
        <div className='bubbleCategory'>
            <button onClick={(e) => handleClick(e)} data-id={ categoryData.id } className="button-bubbleCategory">
                <p className='categoryName'>{ categoryData.name }</p>
            </button>
        </div>
    )
}

export default Category;