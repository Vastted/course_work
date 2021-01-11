import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { history } from './../../_helpers/index.js';
import * as actions from './../../_actions/index.js';

import { PrivateRoute } from './../../_components/index.js';
import { HomePage } from './../HomePage/index.js';
import { LoginPage } from './../LoginPage/index.js';
import { AdminPage } from './../AdminPage/index.js';

const theme = createMuiTheme({
    typography: {
        htmlFontSize: 10,
    },
});

class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        });
    }

    render() {
        const { alert } = this.props;

        return (
            <ThemeProvider theme={theme}>
                {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}

                <Router history={history}>
                    <Switch>
                        <Route path="/" exact component={HomePage} />
                        <PrivateRoute exact path="/admin" component={AdminPage} />
                        <Route path="/login" component={LoginPage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </Router>
            </ThemeProvider>
        );
    }
}

function mapState(state) {
    const { alert } = state;

    return { alert };
}

const actionCreators = {
    clearAlerts: actions.alert.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);

export { connectedApp as App };
