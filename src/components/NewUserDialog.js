import React from 'react';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import LibraryDialog from "./LibraryDialog";

class NewUserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        username: this.props.username || "",
        userId: this.props.userId || "",
        errors: {
            username: false,
            userId: false
        }
    };
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
            const newUser = {name: this.state.username, userId: this.state.userId, favoritesBooks: []};
            this.props.handleSubmit(newUser);
            this.handleClose();
        }
    }
    handleClose(){
        this.setState(this.initialState);
        this.props.onClose();
    }
    render(){
        const submitButtonText = this.props.editMode ? "Apply" : "Add New User";
        const dialogTitle = this.props.editMode ? "Edit User" : "New User";
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
                    defaultValue={this.props.username}
                    onChange={(event) => this.setState({username: event.target.value})}
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
                    onChange={(event) => this.setState({userId: event.target.value})}
                    error={this.state.errors.userId}
                    helperText={this.state.errors.userId ? "Required" : ""}

                />
            </DialogContent>
        );
        return (
            <LibraryDialog
                submitButtonText={submitButtonText}
                dialogContent={dialogContent}
                dialogTitle={dialogTitle}
                handleClose={() => this.handleClose()}
                handleSubmit={() => this.handleSubmit()}
                open={this.props.open}
            />
        );
    }

}

export default NewUserDialog;