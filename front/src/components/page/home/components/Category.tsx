import React from "react";

type PropsType = {
    categoryData: any,
}

const Category: React.FC<PropsType> = ({ categoryData }) => {
    return (
        <div className='bubbleCategory'>
            <p className='categoryName'>{ categoryData.name}</p>
        </div>
    )
}

export default Category;