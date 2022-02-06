import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import "./UserItem.css";
import NewUserDialogButton from "./NewUserDialogButton";

export default function UserItem(props) {
    return (
        <ListItem
            disablePadding
            key={props.user.id}
            divider={true}
            secondaryAction={
                <div className={"user-item-buttons"}>
                    <NewUserDialogButton
                        user={props.user}
                        editMode={true}
                        handleSubmit={(updatedUser) => props.editUser(updatedUser)}
                    />
                    <Tooltip title="Delete">
                        <IconButton edge="end" onClick={props.deleteUser} className={"delete-user-button"}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            }
        >
            <ListItemButton onClick={() => props.userClicked(props.user)} selected={props.isSelected}>
                <ListItemText primary={props.user.name} secondary={props.user.userNumber} className={"user-text"}/>
            </ListItemButton>
        </ListItem>
    );
}