import React from "react";

type CategoryAction = {
    isLoading: boolean,
    categories: any[],
    error: string
}

type PropsType = {
    categories: CategoryAction,
}

const CategoriesList: React.FC<PropsType> = () => {
    return (
        <div>
        </div>
    )
}

export default CategoriesList;