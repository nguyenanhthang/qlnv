import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import ListFile from "./Component/ListFile"

class File extends Component {

    render() {
        const { path } = this.props.match;
        return (
            <div className="file">
                <Switch>
                    <Route path={`${path}`} component={ListFile} />
                </Switch>
            </div>
        )
    }
}

export default File