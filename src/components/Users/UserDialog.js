import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import LibraryDialog from "../LibraryDialog";
import {useState, useEffect} from "react";

export default function UserDialog(props) {
    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState(props.user ? props.user.name : "");
    const [userNumber, setUserNumber] = useState(props.user ? props.user.userNumber : "");
    const [nameError, setNameError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const MAX_NAME_LENGTH = 40;
    const MAX_ID_LENGTH = 10;

    useEffect(() => {
        setUsername(props.user ? props.user.name : "");
        setUserNumber(props.user ? props.user.userNumber : "");
        setNameError(false);
        setNumberError(false);
    }, [open, props.user]);

    const getButton = () => {
        if (props.editMode) {
            return (
                <IconButton edge="end" style={{marginRight: "0px"}} className={"edit-user-button"} onClick={() => setOpen(true)}>
                    <EditIcon />
                </IconButton>
            );
        } else {
            return (
                <Button variant="outlined" onClick={() => setOpen(true)} endIcon={<PersonAddIcon />}>
                    New User
                </Button>
            )
        }
    };

    const validateForm = () => {
        const errorName = username === "";
        const errorNumber = userNumber === "";
        setNameError(errorName);
        setNumberError(errorNumber);
        return !errorName && !errorNumber;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            let newUser;
            if (props.editMode) {
                newUser = {...props.user, name: username, userNumber: userNumber}
            } else {
                newUser = {name: username, userNumber: userNumber, books: []}
            }
            props.handleSubmit(newUser);
            setOpen(false);
        }
    };

    return (
        <div>
            {getButton()}
            <LibraryDialog
                submitButtonText={props.editMode ? "Apply" : "Add New User"}
                dialogTitle={props.editMode ? "Edit User" : "New User"}
                handleClose={() => setOpen(false)}
                handleSubmit={() => handleSubmit()}
                open={open}
                disableSubmit={
                    props.user &&
                    username === props.user.name &&
                    userNumber === props.user.userNumber
                }>
                    <TextField
                        required
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="new-user-name"
                        label="Name"
                        variant="outlined"
                        autoComplete="off"
                        defaultValue={props.user ? props.user.name : ""}
                        onChange={(event) => setUsername(event.target.value)}
                        error={nameError}
                        helperText={"Maximum "+MAX_NAME_LENGTH+" characters"}
                        inputProps={{maxLength: MAX_NAME_LENGTH}}
                    />
                    <TextField
                        type="number"
                        required
                        fullWidth
                        margin="dense"
                        id="new-user-id"
                        label="ID"
                        variant="outlined"
                        autoComplete="off"
                        defaultValue={props.user ? props.user.userNumber : ""}
                        onChange={(event) => setUserNumber(event.target.value)}
                        onInput={e => e.target.value = e.target.value.slice(0,MAX_ID_LENGTH)}
                        error={numberError}
                        helperText={"Maximum "+MAX_ID_LENGTH+" characters"}
                        inputProps={{ pattern: '[0-9]*'}}
                    />
            </LibraryDialog>
        </div>
    );
}