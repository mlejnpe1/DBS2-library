import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Account from "../pages/Account";
import CreatePublication from "../pages/CreatePublication";
import NotFound from "../pages/NotFound";
import PublicationDetail from "../pages/PublicationDetail";
import CreatePublisher from "../pages/CreatePublisher";
import CreateAuthor from "../pages/CreateAuthor";
import UpdatePublication from "../pages/UpdatePublication";
import CreateCategory from "../pages/CreateCategory";

export const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/account" component={Account} />
      <Route exact path="/detail" component={PublicationDetail} />
      <Route exact path="/createPub" component={CreatePublication} />
      <Route exact path="/createAthr" component={CreateAuthor} />
      <Route exact path="/createPublisher" component={CreatePublisher} />
      <Route exact path="/updatePub" component={UpdatePublication} />
      <Route exact path="/createCat" component={CreateCategory} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default routes;
