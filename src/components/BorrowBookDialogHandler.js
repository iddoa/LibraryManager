import React, {useState} from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import LibraryDialog from "./LibraryDialog";
import AvialableBookItem from "./AvailableBookItem";
import List from '@mui/material/List';
import {fetchBooks} from "./Provider";

export default function BorrowBookDialogHandler(props) {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);
    const [allBooks, setAllBooks] = useState([]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    //Filter out already borrowed books
    const usersBookIds = props.user && props.user.books.map(book => book.id);
    const bookItems = allBooks.filter(book => !usersBookIds || !usersBookIds.includes(book.id)).map((book) => {
        return (
            <AvialableBookItem key={book.id} book={book} handleToggle={handleToggle}/>
        );
    });

    const handleClose = () => {
        setChecked([]);
        setOpen(false);
    };

    const handleOpen = () => {
        fetchBooks()
            .then(result => {
                setAllBooks(result);
                setOpen(true);
            })
            .catch((error) => console.log(error));
    };

    const handleSubmit = () => {
        props.handleAddBooks(checked);
        handleClose();
    };

    const dialogContent = (
        <List>
            {bookItems}
        </List>
    );
    const name = props.user ? props.user.name : "";

    return (
        <div>
            <Button
                variant="outlined"
                onClick={() => handleOpen()}
                endIcon={<MenuBookIcon />}
                disabled={!props.user}
            >
                Borrow Book
            </Button>
            <LibraryDialog
                submitButtonText={"Apply"}
                dialogContent={dialogContent}
                dialogTitle={"Add Books for " + name}
                handleClose={handleClose}
                handleSubmit={handleSubmit}
                open={open}
            />
        </div>
    )
}