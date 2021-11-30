import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../components/page/home/Home';
import Profile from '../components/page/profile/Profile';
import Disconnection from '../components/page/deconnexion/Disconnection';

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={ Home }></Route>
                <Route path="/profile" exact component={ Profile }></Route>
                <Route path="/out" exact component={ Disconnection }></Route>
                <Route path="*" component={ Home }></Route>
            </Switch>
        </Router>
    )
}

export default AppRouter;
