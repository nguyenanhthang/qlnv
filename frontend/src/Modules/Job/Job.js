import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import JobForm from './Component/JobForm/JobForm';
import ModuleForm from './Component/ModuleForm/ModuleForm'
import UserByJob from './Component/JobForm/UserByJobForm';
class Job extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="org">
                <Switch>
                    <Route path={`${path}/user/job/:id`} component={UserByJob} />
                    <Route path={`${path}/:id`} component={ModuleForm} />
                    <Route path={`${path}`} component={JobForm} />
                </Switch>
            </div>
        )
    }
}

export default Job