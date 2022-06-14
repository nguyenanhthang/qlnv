import React from "react";
import { Route, Switch, withRouter,Redirect } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import AuthService from '../../Services/AuthService';
import Job from '../../../Modules/Job/Job'
import User from '../../../Modules/User/User'
import Working from "../../../Modules/Working/Working";
import File from "../../../Modules/File/File"
// import { AuthService } from "../../";
// import { ROLE } from "../../../Constances/const";

class App extends React.Component {
  render() {
    const { path } = this.props.match;
    return (
      <div className="App">
        <AppHeader></AppHeader>
        <Switch>
        <Route exact path={`${path}`} render={() => {
                       if(AuthService.userInfo.user.role === 'admin'){
                         return (<Redirect to="/app/users" ></Redirect>)
                       }else if(AuthService.userInfo.user.role === 'staff'){
                        return (<Redirect to="/app/working" ></Redirect>)
                       }
                    }}></Route>
          <Route path={`${path}/working`} component={Working} />
          <Route path={`${path}/users`} component={User} />
          <Route path={`${path}/Job`} component={Job} />
          <Route path={`${path}/file`} component={File} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
