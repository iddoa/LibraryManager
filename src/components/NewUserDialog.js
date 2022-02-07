import * as React from 'react';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TextField from '@mui/material/TextField';
import DialogContent from '@mui/material/DialogContent';
import LibraryDialog from "./LibraryDialog";

class NewUserDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: this.props.user ? this.props.user.name : "",
            userNumber: this.props.user ? this.props.user.userNumber : "",
            errors: {
                username: false,
                userNumber: false
            }
        };
    }
    toggleState(open) {
        this.setState({
            open: open,
            username: this.props.user ? this.props.user.name : "",
            userNumber: this.props.user ? this.props.user.userNumber : "",
            errors: {
                username: false,
                userNumber: false
            }
        });
    }

    getButton() {
        if (this.props.editMode) {
            return (
                <IconButton edge="end" style={{marginRight: "0px"}} className={"edit-user-button"} onClick={() => this.toggleState(true)}>
                    <EditIcon />
                </IconButton>
            );
        } else {
            return (
                <Button variant="outlined" onClick={() => this.toggleState(true)} endIcon={<PersonAddIcon />}>
                    New User
                </Button>
            )
        }
    };

    validateForm() {
        const errors = {
            username: this.state.username === "",
            userNumber: this.state.userNumber === ""
        }
        this.setState({errors: errors});
        return Object.values(errors).every(x => !x);
    }

    handleSubmit() {
        if (this.validateForm()) {
            let newUser;
            if (this.props.editMode) {
                newUser = {...this.props.user, name: this.state.username, userNumber: this.state.userNumber}
            } else {
                newUser = {name: this.state.username, userNumber: this.state.userNumber, books: []}
            }
            this.props.handleSubmit(newUser);
            this.toggleState(false);
        }
    }

    render() {
        const submitButtonText = this.props.editMode ? "Apply" : "Add New User";
        const dialogTitle = this.props.editMode ? "Edit User" : "New User";
        return (
            <div>
                {this.getButton()}
                <LibraryDialog
                    submitButtonText={submitButtonText}
                    dialogTitle={dialogTitle}
                    handleClose={() => this.toggleState(false)}
                    handleSubmit={() => this.handleSubmit()}
                    open={this.state.open}
                    disableSubmit={
                        this.props.user &&
                        this.state.username === this.props.user.name &&
                        this.state.userNumber === this.props.user.userNumber
                    }>
                    <DialogContent>
                        <TextField
                            required
                            autoFocus
                            fullWidth
                            margin="dense"
                            id="new-user-name"
                            label="Name"
                            variant="outlined"
                            defaultValue={this.props.user ? this.props.user.name : ""}
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
                            defaultValue={this.props.user ? this.props.user.userNumber : ""}
                            onChange={(event) => this.setState({userNumber: event.target.value})}
                            error={this.state.errors.userNumber}
                            helperText={this.state.errors.userNumber ? "Required" : ""}

                        />
                    </DialogContent>
                </LibraryDialog>
            </div>
        );
    }
}

export default NewUserDialog;