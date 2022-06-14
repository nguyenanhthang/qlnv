import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import WorkingForm from './Component/WorkingForm/WorkingForm';
import JobByUser from './Component/WorkingForm/JobByUserForm';
import ModuleForm from './Component/WorkingForm/ModuleForm';
class Working extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="org">
                <Switch>
                    <Route path={`${path}/user/module/job`} component={ModuleForm} />
                    <Route path={`${path}/job/user`} component={JobByUser} />
                    <Route path={`${path}`} component={WorkingForm} />
                </Switch>
            </div>
        )
    }
}

export default Working