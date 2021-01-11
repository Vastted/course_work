import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from './../../_actions/index.js';
import * as helpers from './../../_helpers/index.js';
import './styles.css';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getTrains();
        this.interval = setInterval(() => this.props.getTrains(), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    filterTrains(trains = []) {
        return trains.sort((first, second) => first?.arrives?.localeCompare(second?.arrives));
    }

    render() {
        const { scoreboard } = this.props;
        const trains = this.filterTrains(scoreboard.trains);

        return (
            <div className="container">
                <Typography variant="h6" style={{ marginBottom: '20px' }}>
                    Scoreboard ({helpers.getTime(new Date().getTime())})
                </Typography>

                {scoreboard.loading && <CircularProgress size={20} style={{ marginLeft: '10px' }} />}
                {scoreboard.error && (
                    <Typography variant="body1" style={{ marginBottom: '20px' }}>
                        ERROR: {scoreboard.error}
                    </Typography>
                )}

                {trains && (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Train number</TableCell>
                                    <TableCell align="right">Model</TableCell>
                                    <TableCell align="right">Destination</TableCell>
                                    <TableCell align="right">Arrives</TableCell>
                                    <TableCell align="right">Departs</TableCell>
                                    <TableCell align="right">Platform</TableCell>
                                    <TableCell align="right">Numbering</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {trains?.map(
                                    (train, index) =>
                                        train && (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {train.details.number}
                                                </TableCell>
                                                <TableCell align="right">{train.details.model}</TableCell>
                                                <TableCell align="right">{`${train.details.destination.from} — ${train.details.destination.to}`}</TableCell>
                                                <TableCell align="right">{train.arrives}</TableCell>
                                                <TableCell align="right">{train.departs}</TableCell>
                                                <TableCell align="right">{train.platform}</TableCell>
                                                <TableCell align="right">{train.numbering}</TableCell>
                                            </TableRow>
                                        ),
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>
        );
    }
}

function mapState(state) {
    const { scoreboard } = state;

    return { scoreboard };
}

const actionCreators = {
    getTrains: actions.scoreboard.get,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);

export { connectedHomePage as HomePage };
