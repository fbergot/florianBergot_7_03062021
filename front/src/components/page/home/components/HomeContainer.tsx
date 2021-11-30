import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiCallPosts, apiCallPostsPerCategory } from "../../../../store/posts/postActions";
import { apiCallCategories } from "../../../../store/categories/categoryActions";
import { apiCallUsers } from "../../../../store/users/userActions";
import CategoriesList from './CategoriesList';
import PostsList from "./PostsList";
import UsersList from "./UsersList";

type PostState = {
	isLoading: boolean,
	posts: any[],
	error: string
}

type UserState = {
	isLoading: boolean,
	users: any[],
	error: string
}

type CategoryState = {
	isLoading: boolean,
	categories: any[],
	error: string
}

type Props = {
	changeHeader: () => void,
	postsApi: () => Promise<void>,
	usersApi: () => Promise<void>,
	categoriesApi: () => Promise<void>,
	postsPerCategory: (idCategory: string) => void;
	posts: PostState,
	users: UserState,
	categories: CategoryState
}

const HomeContainer: React.FC<Props> = ({ changeHeader }) => {
	
	const states = useSelector((states: any )=> states);
	const dispatch = useDispatch();	
	const [error, setError] = useState(null);

	useEffect(() => {
		Promise.all([apiCallUsers(dispatch), apiCallPosts(dispatch), apiCallCategories(dispatch)])
			.then($ => {
				changeHeader();
			})
			.catch((err) => {
				setError(err.message);
			})			
	}, [changeHeader, dispatch]);

	const postsPerCategoryCall = (idCategory: string) => {
		apiCallPostsPerCategory(idCategory, dispatch);
	}

	// update after add post
	const update = async () => {
		await apiCallPosts(dispatch);
		await apiCallCategories(dispatch);
	}

	return (
		<main className="mainContainer">
			{ error && <p>{ error }</p> }
			<UsersList users={ states.user }/>
			<PostsList posts={ states.post } update={ update }/>
			<CategoriesList categories={ states.category } callPostPerCategory={ postsPerCategoryCall }/>            
		</main>
	)
}


export default HomeContainer;