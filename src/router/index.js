import * as React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

export const Routes = () => {
    <BrowserRouter>
        <Switch>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
        </Switch>
    </BrowserRouter>
}
