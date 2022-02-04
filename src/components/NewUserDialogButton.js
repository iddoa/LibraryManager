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
        }
    }
    toggleState(open) {
        this.setState({open: open});
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

    render() {
        return (
            <div>
                {this.getButton()}
                <NewUserDialog
                    open={this.state.open}
                    onClose={() => this.toggleState(false)}
                    handleSubmit={this.props.handleSubmit}
                    username={this.props.username}
                    userId={this.props.userId}
                    editMode={this.props.editMode}
                />
            </div>
        );
    }
}

export default NewUserDialogButton;