import * as React from 'react';
import NewUserDialog from "./NewUserDialog";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

class NewUserDialogButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            username: this.props.user && this.props.user.name || "",
            userNumber: this.props.user && this.props.user.userNumber || "",
            errors: {
                username: false,
                userNumber: false
            }
        };
    }
    toggleState(open) {
        this.setState({
            open: open,
            username: open && this.props.user && this.props.user.name || "",
            userNumber: open && this.props.user && this.props.user.userNumber || "",
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
            const newUser = {name: this.state.username, userNumber: this.state.userNumber};
            if (this.props.editMode) {
                newUser["id"] = this.props.user.id
            }
            this.props.handleSubmit(newUser);
            this.toggleState(false);
        }
    }

    updateUser(data) {
        this.setState(data)
    }

    render() {
        return (
            <div>
                {this.getButton()}
                <NewUserDialog
                    open={this.state.open}
                    onClose={() => this.toggleState(false)}
                    handleSubmit={() => this.handleSubmit()}
                    user={this.props.user}
                    editMode={this.props.editMode}
                    errors={this.state.errors}
                    updateUser={(data) => this.updateUser(data)}
                    disableSubmit={
                        this.props.user &&
                        this.state.username === this.props.user.name &&
                        this.state.userNumber === this.props.user.userNumber
                    }
                />
            </div>
        );
    }
}

export default NewUserDialogButton;