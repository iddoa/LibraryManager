import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

class NewUserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.username || "",
            userId: props.userId || "",
            errors: {
                username: false,
                userId: false
            }
        }
    }
    validateForm() {
        const errors = {
            username: this.state.username === "",
            userId: this.state.userId === ""
        }
        this.setState({errors: errors});
        return Object.values(errors).every(x => !x);
    }
    handleSubmit() {
        if (this.validateForm()) {
            const newUser =
                {name: this.state.username, id: this.state.userId, books:[]}
            this.props.handleSubmit(newUser);
            this.handleClose();
        }
    }
    handleClose(){
        this.setState(
            {
                username: "",
                userId: "",
                errors: {
                    username: false,
                    userId: false
                }
            }
        );
        this.props.onClose();
    }
    handleUsernameChange(event) {
        this.setState({username: event.target.value});
    }
    handleIdChange(event) {
        this.setState({userId: event.target.value});
        this.validateForm();
    }
    render(){
        const submitButtonText = this.props.editMode ? "Apply" : "Add New User";
        return (
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle>{this.props.editMode ? "Edit" : "New"} User</DialogTitle>
                <DialogContent>
                    <TextField
                        required
                        autoFocus
                        fullWidth
                        margin="dense"
                        id="new-user-name"
                        label="Name"
                        variant="outlined"
                        defaultValue={this.props.username}
                        onChange={(event) => this.handleUsernameChange(event)}
                        error={this.state.errors.username}
                        helperText={this.state.errors.username ? "Required" : ""}
                    />
                    <TextField
                        required
                        fullWidth
                        margin="dense"
                        id="new-user-id"
                        label="Id#"
                        variant="outlined"
                        defaultValue={this.props.userId}
                        onChange={(event) => this.handleIdChange(event)}
                        error={this.state.errors.userId}
                        helperText={this.state.errors.userId ? "Required" : ""}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.handleClose()}>Cancel</Button>
                    <Button onClick={() => this.handleSubmit()}>{submitButtonText}</Button>
                </DialogActions>
            </Dialog>
        );
    }

}

export default NewUserDialog;