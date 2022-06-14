import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import UserForm from './Components/UserForm/UserForm';
import ChangePasswordForm from './Components/UserForm/ChangePasswordForm';
class User extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="org">
                <Switch>
                    <Route path={`${path}/setpassword/:id`} component={ChangePasswordForm} />
                    <Route path={`${path}`} component={UserForm} />
                </Switch>
            </div>
        )
    }
}

export default User