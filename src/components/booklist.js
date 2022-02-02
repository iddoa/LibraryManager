import React from "react";
import BookItem from "./bookItem";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import './list-styles.css';



class BooksList extends React.Component {
    render() {
        const userText = this.props.selectedUser ? this.props.selectedUser.name + "'s books" : "";

        this.booksList = this.props.books.map((book) => {
            return (
                <BookItem key={book.id} book={book} favorite={false}/>
            );
        });

        return (
            <div>
                <List
                    subheader={
                        <ListSubheader className={"list-subheader"}>
                            {userText}
                            <Button variant="outlined">
                                Available Books
                            </Button>
                        </ListSubheader>
                    }
                >
                    <Divider />
                    {this.booksList}
                </List>
            </div>
        );
    };
}

export default BooksList;
