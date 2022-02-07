import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function BookDialogItem(props) {
    const book = props.book;
    return (
        <div>
            <ListItem
                disablePadding
                key={book.id}
                divider={true}>
                <ListItemButton onClick={props.handleToggle(book.id)}>
                    <ListItemIcon>
                        <Checkbox />
                    </ListItemIcon>
                    <ListItemText primary={book.title} secondary={"Author: " + book.author} />
                </ListItemButton>
            </ListItem>
        </div>
    );
}