import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function LibraryDialog(props) {
    return (
        <Dialog open={props.open} onClose={props.handleClose} scroll="paper">
            <DialogTitle>{props.dialogTitle}</DialogTitle>
            {props.children}
            <div className="dialog-footer">
                <DialogActions>
                    <Button onClick={() => props.handleClose()}>Cancel</Button>
                    <Button onClick={() => props.handleSubmit()} disabled={props.disableSubmit}>{props.submitButtonText}</Button>
                </DialogActions>
            </div>
        </Dialog>
    );
}