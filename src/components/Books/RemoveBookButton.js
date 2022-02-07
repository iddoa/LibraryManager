import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';


export default function RemoveBookButton(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const removeBook = () => {
        props.removeBook();
        handleClose();
    }


    return (
        <div>
            <Tooltip title="Return Book">
                <IconButton edge="end" onClick={handleClick} className={"remove-book-button"}>
                    <BookmarkRemoveIcon />
                </IconButton>
            </Tooltip>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={removeBook}>Return Book</MenuItem>
                <MenuItem onClick={handleClose}>Cancel</MenuItem>
            </Menu>
        </div>
    );
}