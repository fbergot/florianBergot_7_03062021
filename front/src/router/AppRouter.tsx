import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CreationPost from '../components/page/creationPost/CreationPost';
import Home from '../components/page/home/Home';
import Profile from '../components/page/profile/Profile';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/profile" exact component={Profile}></Route>
                <Route path="/createPost" exact component={CreationPost}></Route>
                <Route path="*" component={Home}></Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;
