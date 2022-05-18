import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";

import "assets/css/material-dashboard-react.css?v=1.9.0";
import Login from "components/Login/Login";

const hist = createBrowserHistory();
// const logged = window.sessionStorage.getItem('jwt')
ReactDOM.render(
    <Router history={hist}>
        <Switch>
            <Route path="/admin" render = {() => {
                return window.sessionStorage.getItem('jwt') ? <Admin/> : <Redirect to="/login" />
            }} />
            <Route path="/login" component={Login} />

            <Redirect from="/" to="/admin/dashboard" />
        </Switch>
    </Router>,
    document.getElementById("root")
);
