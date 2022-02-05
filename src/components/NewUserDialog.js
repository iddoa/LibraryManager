import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import LibraryDialog from "./LibraryDialog";

export default function NewUserDialog(props) {
    const submitButtonText = props.editMode ? "Apply" : "Add New User";
    const dialogTitle = props.editMode ? "Edit User" : "New User";
    const dialogContent = (
        <DialogContent>
            <TextField
                required
                autoFocus
                fullWidth
                margin="dense"
                id="new-user-name"
                label="Name"
                variant="outlined"
                defaultValue={props.user ? props.user.name : ""}
                onChange={(event) => props.updateUser({username: event.target.value})}
                error={props.errors.username}
                helperText={props.errors.username ? "Required" : ""}
            />
            <TextField
                required
                fullWidth
                margin="dense"
                id="new-user-id"
                label="Id#"
                variant="outlined"
                defaultValue={props.user ? props.user.userId : ""}
                onChange={(event) => props.updateUser({userId: event.target.value})}
                error={props.errors.userId}
                helperText={props.errors.userId ? "Required" : ""}

            />
        </DialogContent>);
    return (
        <LibraryDialog
            submitButtonText={submitButtonText}
            dialogContent={dialogContent}
            dialogTitle={dialogTitle}
            handleClose={props.onClose}
            handleSubmit={props.handleSubmit}
            open={props.open}
            disableSubmit={props.disableSubmit}
        />
    );
}