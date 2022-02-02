import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function NewUserDialog(props) {
    const handleSubmit = () => {
        props.onSubmit("aaa");
        props.onClose();
    }
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>New User</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter New User's Name and Id
                </DialogContentText>
                <TextField
                    required
                    autoFocus
                    fullWidth
                    margin="dense"
                    id="new-user-name"
                    label="Name"
                    variant="standard"
                />
                <TextField
                    required
                    fullWidth
                    margin="dense"
                    id="new-user-id"
                    label="Id#"
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add User</Button>
            </DialogActions>
        </Dialog>
    );

}