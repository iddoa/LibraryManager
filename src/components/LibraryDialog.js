import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function LibraryDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            {props.dialogContent}
            <DialogActions>
                <Button onClick={() => props.handleClose()}>Cancel</Button>
                <Button onClick={() => props.handleSubmit()}>{props.submitButtonText}</Button>
            </DialogActions>
        </Dialog>
    );
}