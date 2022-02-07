import LibraryList from "./LibraryList";
import ListSubheader from "@mui/material/ListSubheader/ListSubheader";
import NewBookDialog from "./NewBookDialog";
import {fetchBooks} from "../services/Provider";
import BookItem from "./BookItem";
import React, { useState, useEffect } from 'react';

export default function BookList(props) {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const selectedUser = props.user;

    useEffect(() => {
        if (selectedUser) {
            const bookIds = selectedUser.books.map(book => book.id);
            if (bookIds.length > 0) {
                const favorites = selectedUser && selectedUser.books.filter(book => book.favorite).map(book => book.id);
                setLoading(true);
                fetchBooks(bookIds)
                .then(result => {
                    setLoading(false);
                    const withFavs = result.map(book => ({...book, favorite: favorites.includes(book.id)}));
                    setBooks(withFavs);
                });
            } else {
                setBooks([]);
            }
        }
    }, [selectedUser]);

    const updateFavorite = (bookId) => {
        const newBooks = selectedUser.books.map(
            book => {
                if (book.id === bookId) {
                    const newBook = {...book, favorite: !book.favorite}
                    return newBook;
                }
                return book;
            }
        );
        const updatedUser = {...selectedUser, books: newBooks};
        props.onUserChange(updatedUser);

    };

    const removeBook = (bookId) => {
        const newSelectedBooks = selectedUser.books.filter(book => book.id !== bookId);
        const newUser = {...selectedUser};
        newUser.books = newSelectedBooks;
        props.onUserChange(newUser);
    }


    const getSelectedBooksListItems = () => {
        return books
            .map((book) => {
                return (
                    <BookItem
                        key={"book-item"+book.id}
                        book={book}
                        favorite={book.favorite}
                        removeBook={() => removeBook(book.id)}
                        updateFavorite={() => updateFavorite(book.id)}/>
                );
            });
    };
    const addBooksToUser = (booksList) => {
        const addedBooks = booksList.map(id => ({id: id, favorite: false}));
        const newBooks = [...selectedUser.books, ...addedBooks];
        const newUser = {...selectedUser, books: newBooks};
        props.onUserChange(newUser);
    }
    return (
        <div className="books app-list">
            <LibraryList
                subheader={
                    <ListSubheader className={"list-subheader"}>
                        {(selectedUser ? selectedUser.name + "'s " : "") + "Books"}
                        <NewBookDialog
                            user={selectedUser}
                            handleAddBooks={addBooksToUser}/>
                    </ListSubheader>}>
                {getSelectedBooksListItems()}
            </LibraryList>
        </div>
    );
}