import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Checkbox from '@mui/material/Checkbox';
import ListItemIcon from '@mui/material/ListItemIcon';


export default function AvailableBookItem(props) {
    const book = props.book;
    return (
        <div>
            <ListItem
                disablePadding
                key={book.id}
                divider={true}>
                <ListItemButton onClick={props.handleToggle(book.id)}>
                    <ListItemIcon>
                        <Checkbox
                            // edge="start"
                            // checked={checked.indexOf(value) !== -1}
                            // tabIndex={-1}
                            // disableRipple
                            // inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                    <ListItemText primary={book.title} secondary={"Author: " + book.author} />
                </ListItemButton>
            </ListItem>
        </div>
    );
}