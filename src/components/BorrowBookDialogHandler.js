import React, {useState} from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import LibraryDialog from "./LibraryDialog";
import AvialableBookItem from "./AvailableBookItem";
import List from '@mui/material/List';

export default function BorrowBookDialogHandler(props) {
    const [open, setOpen] = useState(false);
    const [checked, setChecked] = useState([]);

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

    const bookItems = props.books.map((book) => {
        return (
            <AvialableBookItem book={book} handleToggle={handleToggle}/>
        );
    });

    const handleClose = () => {
        setChecked([]);
        setOpen(false);
    }

    const handleSubmit = () => {
        props.handleAddBooks(checked);
        handleClose();
    }

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
                onClick={() => setOpen(true)}
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