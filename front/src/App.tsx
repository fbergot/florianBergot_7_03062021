import './App.css';
import React from 'react';
import AppRouter from './router/AppRouter';
import { Provider } from "react-redux";
import store from "./store/store";

const App: React.FC = () =>  {
	return (
		<Provider store = {store}>
			<AppRouter/>
		</Provider>
	);
}

export default App;
