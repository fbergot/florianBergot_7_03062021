import React from "react";
import Category from './Category';

type PropsType = {
    categories: any[] | undefined,
    callPostPerCategory: (idCategory: string) => void;
}

const CategoriesList: React.FC<PropsType> = ({ categories, callPostPerCategory }) => {
    console.log(categories);
    return (
        <div className="categoriesContainer">
            <h2 className="title-area">Catégories</h2>
            <div className="list-categories">
                { categories && categories.map((category, index) => {
                    return <Category handlerPostPerCategory={ callPostPerCategory } key={ index } categoryData={ category }/>
                }) }
            </div>
        </div>
    )
}

export default CategoriesList;