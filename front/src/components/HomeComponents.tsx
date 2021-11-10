import React, {useEffect} from "react";
import { connect } from "react-redux";
import { apiCallPosts } from "../store/posts/postActions";
import { apiCallCategories } from "../store/categories/categoryActions";
import { apiCallUsers } from "../store/users/userActions";
import CategoriesList from './CategoriesList';
import PostsList from "./PostsList";
import UsersList from "./UsersList";

type Props = {
	postsApi: () => any,
	usersApi: () => any,
	categoriesApi: () => any,
	posts: PropsType,
	users: any,
	categories: any

}
const HomeComponents: React.FC<Props> = ({ postsApi, usersApi, categoriesApi, posts, users, categories }) => {
	// au montage du composant
	useEffect(() => {
		postsApi();
		usersApi();
		categoriesApi();
	}, [postsApi, usersApi, categoriesApi]);
	console.log(posts);
	console.log(users);
	console.log(categories);

	return (
		<div>
			<UsersList users={ users }/>
			<PostsList posts={ posts }/>
			<CategoriesList categories={ categories }/>            
		</div>
	)
}
type PropsType = {
    isLoading: boolean,
    posts: [],
    error: string
}

type T = {
	post: PropsType,
	user: any,
	category: any
}
// pour get store in component per props
const mapStateToProps = (state: T) => {
    return {
        posts: state.post,
        users: state.user,
        categories: state.category
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        postsApi: () => dispatch(apiCallPosts()),
        usersApi: () => dispatch(apiCallUsers()),
        categoriesApi: () => dispatch(apiCallCategories()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponents);