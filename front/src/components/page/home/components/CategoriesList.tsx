import React from "react";
import Category from './Category';

type CategoryAction = {
    isLoading: boolean,
    categories: any[],
    error: string
}

type PropsType = {
    categories: CategoryAction,
}

const CategoriesList: React.FC<PropsType> = ({ categories }) => {
    return (
        <div className="categoriesContainer">
            { categories.categories.map((category, index) => {
                return <Category key={ index } categoryData={ category }/>
            }) }
        </div>
    )
}

export default CategoriesList;