import React from "react";
import Category from './Category';

type CategoryAction = {
    isLoading: boolean,
    categories: any[],
    error: string
}

type PropsType = {
    categories: CategoryAction,
    callPostPerCategory: (idCategory: string) => void;
}

const CategoriesList: React.FC<PropsType> = ({ categories, callPostPerCategory }) => {
    return (
        <div className="categoriesContainer">
            <h2 className="title-area">Catégories</h2>
            <div className="list-categories">
                { categories.categories.map((category, index) => {
                    return <Category handlerPostPerCategory={ callPostPerCategory } key={ index } categoryData={ category }/>
                }) }
            </div>
        </div>
    )
}

export default CategoriesList;