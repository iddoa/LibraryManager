import React from "react";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from "@mui/material/Divider/index";
import IconButton from '@mui/material/IconButton';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import Tooltip from '@mui/material/Tooltip';


class BookItem extends React.Component {
    constructor(props) {
        super(props);
        this.book = props.book;
    }

    getAuthor() {
        return "Author: " + this.book.author;
    }

    render() {
        const favoriteIcon = this.props.favorite ? (<StarIcon />) : (<StarBorderOutlinedIcon />) ;
        return (
            <div>
                <ListItem
                    disablePadding
                    secondaryAction={
                        <div>
                            <Tooltip title="Favorite">
                                <IconButton edge="end" onClick={() => this.props.editUser(this.user.id)} className={"favorite-book-button"}>
                                    {favoriteIcon}
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Return Book">
                                <IconButton edge="end" onClick={() => this.props.deleteUser(this.user.id)} className={"remove-book-button"}>
                                    <BookmarkRemoveIcon />
                                </IconButton>
                            </Tooltip>
                        </div>

                    }
                >
                    <ListItemButton>
                        <ListItemText primary={this.book.title} secondary={this.getAuthor()} />

                    </ListItemButton>
                </ListItem>
                <Divider />
            </div>

        );
    };
}

export default BookItem;