import React from "react";
import Category from './Category';
import { BiCategory } from 'react-icons/bi';
import Loader from "../../../generic/Loader";

type CategoryAction = {
    isLoading: boolean,
	categories: { name: string }[],
    error: string
}

type PropsType = {
    categories: CategoryAction,
    callPostPerCategory: (idCategory: string) => void;
}

const CategoriesList: React.FC<PropsType> = ({ categories, callPostPerCategory }) => {
	const loaderOrCategoryList = categories.isLoading ?
		<div className="container-load">
			<Loader className={"lds-ring"}/> 
		</div>
			:
		<div className="list-categories">
			{ categories.categories.map((category, index) => {
				return <Category key={ index } handlerPostPerCategory={ callPostPerCategory } categoryData={ category } />;
			}) }
		</div>
    return (
		<div className="categoriesContainer">
			<div className="header-cate-container">
				<BiCategory className="icon-header-cate-area"/>
				<h2 className="title-area">Catégories</h2>
			</div>
			{ categories.error ? <p>{ categories.error }</p> : loaderOrCategoryList }			
		</div>
    )
}

export default CategoriesList;