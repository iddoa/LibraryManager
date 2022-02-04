import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import Tooltip from '@mui/material/Tooltip';


export default function BookItem(props) {
    const user = props.user;
    const book = props.book;
    const favoriteIcon = props.favorite ? (<StarIcon />) : (<StarBorderOutlinedIcon />) ;
    return (
        <div>
            <ListItem
                disablePadding
                key={book.id}
                divider={true}
                secondaryAction={
                    <div>
                        <Tooltip title="Favorite">
                            <IconButton edge="end" onClick={() => props.updateFavorite()} className={"favorite-book-button"}>
                                {favoriteIcon}
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Return Book">
                            <IconButton edge="end" onClick={() => props.deleteUser(user.id)} className={"remove-book-button"}>
                                <BookmarkRemoveIcon />
                            </IconButton>
                        </Tooltip>
                    </div>

                }
            >
                <ListItemButton>
                    <ListItemText primary={book.title} secondary={"Author: " + book.author} />
                </ListItemButton>
            </ListItem>
        </div>
    );

}