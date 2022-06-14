import React, { Suspense, Fragment } from "react";
import { Route, Redirect, Switch, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import App from "./Shared/Components/App/App";
import Login from "./Shared/Components/Login/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/index.scss";
import instance from "./Shared/Services/AuthService";
import 'font-awesome/css/font-awesome.min.css';

const isLogged = instance.userInfo;

const Root = (
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Suspense>
          <Route exact path="/" render={() => {
            return (!isLogged) ? (
              <Redirect to="/login" ></Redirect>
            ) : (
              <Redirect to="/app" ></Redirect>
            )
          }} ></Route>
          <Route path="/login" render={() => {
            return (!isLogged) ? (
                <Login></Login>
            ) : (
              <Redirect to="/app" ></Redirect>
            )
          }} ></Route>
          <Route path="/app" render={() => {
            return (isLogged) ? (
              <App></App>
            ) : (
              <Redirect to="/login" ></Redirect>
            )
          }} ></Route>
        </Suspense>
      </Switch>
    </Fragment>
  </BrowserRouter>
);
ReactDOM.render(Root, document.getElementById("root"));

export default Root;
