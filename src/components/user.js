import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import "./user.css";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.user = props.user;
    }

    render() {
        return (
            <ListItem
                disablePadding
                secondaryAction={
                    <div>
                        <Tooltip title="Edit">
                            <IconButton edge="end" onClick={() => this.props.editUser(this.user.id)} className={"edit-user-button"}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                            <IconButton edge="end" onClick={() => this.props.deleteUser(this.user.id)} className={"delete-user-button"}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                }
            >
                <ListItemButton onClick={() => this.props.userClicked(this.user)} selected={this.props.isSelected}>
                    <ListItemText primary={this.user.name} secondary={this.user.id} className={"user-text"}/>
                </ListItemButton>
            </ListItem>
        );
    };
}

export default User;