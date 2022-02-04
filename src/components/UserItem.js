import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "./UserItem.css";
import NewUserDialogButton from "./NewUserDialogButton";

class UserItem extends React.Component {
    constructor(props) {
        super(props);
        this.user = props.user;
    }

    render() {
        return (
            <ListItem
                disablePadding
                key={this.user.id}
                divider={true}
                secondaryAction={
                    <div className={"user-item-buttons"}>
                        <NewUserDialogButton
                            username={this.user.name}
                            userId={this.user.id}
                            editMode={true}
                            handleSubmit={(user) => this.props.editUser(this.user, user)}
                        />
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

export default UserItem;