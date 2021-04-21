import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Account from '../pages/Account';
import NotFound from '../pages/NotFound';

export const routes = (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/account" component={Account}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);

export default routes
