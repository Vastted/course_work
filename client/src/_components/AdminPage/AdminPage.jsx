import React from 'react';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as actions from './../../_actions/index.js';
import * as helpers from './../../_helpers/index.js';
import { ScoreboardModal } from './../ScoreboardModal/index.js';
// import './styles.css';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false, id: null, initial: {} };
    }

    filterTrains(trains = []) {
        return trains.sort((first, second) => first?.arrives?.localeCompare(second?.arrives));
    }

    componentDidMount() {
        this.props.getScoreboard();
        this.props.getTrains();
        this.props.getStation();
    }

    selectSubmitType(type, values, id) {
        if (type === 'update') this.submitUpdateTrain(values, id);
        if (type === 'push') this.submitPushTrain(values);
    }

    handleDeleteTrain(id) {
        return (e) => this.props.deleteTrain(id);
    }

    handleModalUpdateTrain(id) {
        return (e) => {
            const { scoreboard, trains, stations } = this.props;
            const { details, ...copy } = scoreboard.trains.filter((train) => train._id === id)[0];

            this.setState({
                type: 'update',
                open: true,
                id,
                initial: {
                    ...copy,
                    trains: trains.items,
                    platforms: stations.details.platforms,
                },
            });
        };
    }

    submitUpdateTrain(values, id) {
        this.closeModal();
        this.props.updateTrain(id, values);
        setTimeout(() => this.props.getScoreboard(), 300);
    }

    handleModalPushTrain() {
        return (e) => {
            const { trains, stations } = this.props;

            this.setState({
                type: 'push',
                open: true,
                initial: {
                    trainID: trains.items[0]._id,
                    arrives: helpers.getTime(new Date().getTime()),
                    departs: helpers.getTime(new Date().getTime() + 1_800_000), // 1000ms * 60s * 30m
                    platform: 1,
                    numbering: 'head',
                    trains: trains.items,
                    platforms: stations.details.platforms,
                },
            });
        };
    }

    submitPushTrain(values) {
        this.closeModal();
        this.props.pushTrain(values);
        setTimeout(() => this.props.getScoreboard(), 300);
    }

    closeModal() {
        this.setState({ open: false });
    }

    render() {
        const { scoreboard } = this.props;
        const trains = this.filterTrains(scoreboard.trains);

        return (
            <div className="container">
                <Link href="/login" onClick={this.props.userLogout}>
                    Logout
                </Link>

                <Typography variant="h6" style={{ marginBottom: '20px' }}>
                    Scoreboard ({helpers.getTime(new Date().getTime())})
                </Typography>

                {scoreboard.loading && <CircularProgress size={20} style={{ marginLeft: '10px' }} />}
                {scoreboard.error && (
                    <Typography color="error" variant="body1" style={{ marginBottom: '20px' }}>
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
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
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

                                                <TableCell align="right">
                                                    <Button
                                                        disabled={train.updating || train.updateError}
                                                        variant="contained"
                                                        onClick={this.handleModalUpdateTrain(train._id)}
                                                    >
                                                        Update
                                                        {train.updating && (
                                                            <CircularProgress
                                                                size={20}
                                                                style={{ marginLeft: '10px' }}
                                                            />
                                                        )}
                                                    </Button>
                                                </TableCell>

                                                <TableCell align="right">
                                                    <Button
                                                        disabled={train.deleting || train.deleteError}
                                                        variant="contained"
                                                        onClick={this.handleDeleteTrain(train._id)}
                                                    >
                                                        Delete
                                                        {train.deleting && (
                                                            <CircularProgress
                                                                size={20}
                                                                style={{ marginLeft: '10px' }}
                                                            />
                                                        )}
                                                    </Button>
                                                </TableCell>

                                                <TableCell align="right">
                                                    {train.updateError || train.deleteError}
                                                </TableCell>
                                            </TableRow>
                                        ),
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}

                <Button style={{ marginTop: '20px' }} variant="contained" onClick={this.handleModalPushTrain()}>
                    Push new
                </Button>

                <ScoreboardModal
                    type={this.state.type}
                    open={this.state.open}
                    id={this.state.id}
                    initial={this.state.initial}
                    onSubmit={this.selectSubmitType.bind(this)}
                    onClose={this.closeModal.bind(this)}
                />
            </div>
        );
    }
}

function mapState(state) {
    const { scoreboard, trains, stations } = state;
    return { scoreboard, trains, stations };
}

const actionCreators = {
    userLogout: actions.user.logout,
    pushTrain: actions.scoreboard.push,
    getScoreboard: actions.scoreboard.get,
    deleteTrain: actions.scoreboard.delete,
    updateTrain: actions.scoreboard.update,
    getTrains: actions.trains.get,
    getStation: actions.stations.get,
};

const connectedAdminPage = connect(mapState, actionCreators)(AdminPage);

export { connectedAdminPage as AdminPage };
