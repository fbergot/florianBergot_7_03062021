import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/page/Home';
import Profile from '../components/page/Profile';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/profile" exact component={Profile}></Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;
