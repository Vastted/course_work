import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export function ScoreboardModal({ type, open, id = null, onSubmit, onClose, initial }) {
    const [values, setValues] = React.useState({
        trainID: null,
        arrives: null,
        departs: null,
        platform: null,
        numbering: null,
        trains: null,
        platforms: null,
    });

    React.useEffect(() => {
        setValues(initial);
    }, [initial]);

    const handleChangeForm = (event) => setValues({ ...values, [event.target.id]: event.target.value });
    const handleChangeSelect = (name) => (event) => setValues({ ...values, [name]: event.target.value });

    const handleSubmit = () => {
        const { trains, platforms, ...copy } = values;
        onSubmit(type, copy, id);
    };

    return (
        <Dialog
            fullWidth
            maxWidth={'sm'}
            open={open}
            onClose={onClose}
            onChange={handleChangeForm}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Scoreboard Train</DialogTitle>

            <DialogContent>
                <TextField margin="dense" fullWidth id="arrives" label="Arrives" type="text" value={values.arrives} />
                <TextField margin="dense" fullWidth id="departs" label="Departs" type="text" value={values.departs} />

                <FormControl fullWidth margin="dense">
                    <InputLabel margin="dense" id="platform-label">
                        Platform
                    </InputLabel>
                    <Select
                        margin="dense"
                        fullWidth
                        labelId="platform-label"
                        id="platform-select"
                        value={values.platform}
                        onChange={handleChangeSelect('platform')}
                    >
                        {values.platforms?.map((platform) => (
                            <MenuItem key={platform} value={platform}>
                                {platform}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel margin="dense" id="numbering-label">
                        Numbering
                    </InputLabel>
                    <Select
                        margin="dense"
                        fullWidth
                        labelId="numbering-label"
                        id="numbering-select"
                        value={values.numbering}
                        onChange={handleChangeSelect('numbering')}
                    >
                        <MenuItem value="head">head</MenuItem>
                        <MenuItem value="tail">tail</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth margin="dense">
                    <InputLabel margin="dense" id="train-label">
                        Train
                    </InputLabel>
                    <Select
                        margin="dense"
                        fullWidth
                        labelId="train-label"
                        id="train-select"
                        value={values.trainID}
                        onChange={handleChangeSelect('trainID')}
                    >
                        {values.trains?.map((train) => (
                            <MenuItem
                                key={train._id}
                                value={train._id}
                                style={{
                                    display: 'grid',
                                    gridTemplateColumns: '140px 280px 170px',
                                }}
                            >
                                <span>{train.number} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>{train.model} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                                <span>{`${train.destination.from} — ${train.destination.to}`}</span>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}
