import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import * as actions from './../../_actions/index.js';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.props.logout();

        this.state = {
            username: 'admin_123',
            password: '92bfe910-df1b',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });

        const { username, password } = this.state;

        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;

        return (
            <div className="container">
                <Typography variant="h6" style={{ marginBottom: '20px' }}>
                    Login
                </Typography>

                <form autoComplete="off" style={{ width: '30%' }}>
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        error={submitted && !username ? true : false}
                        name="username"
                        label="Username"
                        variant="outlined"
                        value={username}
                        onChange={this.handleChange}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        error={submitted && !password ? true : false}
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        value={password}
                        onChange={this.handleChange}
                    />

                    <Button
                        disabled={loggingIn}
                        style={{ marginTop: '10px' }}
                        onClick={this.handleSubmit}
                        variant="contained"
                        color="primary"
                    >
                        Login
                        {loggingIn && <CircularProgress size={20} style={{ marginLeft: '10px' }} />}
                    </Button>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { loggingIn } = state.authentication;

    return { loggingIn };
}

const actionCreators = {
    login: actions.user.login,
    logout: actions.user.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);

export { connectedLoginPage as LoginPage };
