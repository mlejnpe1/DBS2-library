import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../components/Login';
import Register from '../components/Register';
import Account from '../components/Account';
import NotFound from '../components/NotFound';

export const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/account" component={Account}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default routes
