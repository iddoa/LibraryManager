import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import Tooltip from '@mui/material/Tooltip';
import RemoveBookButton from "./RemoveBookButton";

export default function BookItem(props) {
    const book = props.book;
    const favoriteIcon = props.favorite ? (<StarIcon />) : (<StarBorderOutlinedIcon />) ;
    return (
        <div>
            <ListItem
                disablePadding
                key={book.id}
                divider={true}
                secondaryAction={
                    <div style={{display: "flex"}}>
                        <Tooltip title="Favorite">
                            <IconButton edge="end" onClick={props.updateFavorite} className={"favorite-book-button"}>
                                {favoriteIcon}
                            </IconButton>
                        </Tooltip>
                        <RemoveBookButton removeBook={props.removeBook}/>
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