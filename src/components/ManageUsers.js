import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import './ManageUsers.css';
import Divider from '@mui/material/Divider';
import BookItem from "./BookItem";
import LibraryList from "./LibraryList";
import UserItem from "./UserItem";
import NewUserDialogButton from "./NewUserDialogButton";
import BorrowBookDialogHandler from "./BorrowBookDialogHandler";

const BASE_SERVER_URL = "http://localhost:4000";
const USERS_PATH = BASE_SERVER_URL + "/users";
const BOOKS_PATH = BASE_SERVER_URL + "/books";

class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            freeBooks: [],
            selectedUser: null,
            selectedBooks: null,
            loading: false,
        }
        this.setSelectedUser = (user) => {
            this.setState({selectedUser: user});
            this.fetchSelectedBooks(user.id);
        };

        this.deleteUser = (id) => {
            //TODO change all bookborrwedBy
            const userPath = USERS_PATH + "/" + id;
            fetch(userPath, {method: 'DELETE'})
                .then(response => response.json())
                .then((data) => {
                    const updatedUsers = this.state.users.filter(user => user.id !== id);
                    this.setState({users: updatedUsers});
                })
                .catch(e => console.log(e));
        };

        this.editUser = (newUser) => {
            const userPath = USERS_PATH + "/" + newUser.id;
            fetch(userPath, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newUser)
            })
                .then(response => response.json())
                .then(newUser => {
                    this.updateUser(newUser);
                });
        };


    }

    fetchUsers() {
        this.setState({ loading: true }, () => {
            fetch(USERS_PATH)
                .then(res => res.json())
                .then(result =>
                    this.setState({
                        loading: false,
                        users: result
                    })
                )
                .catch(console.log);
        });
    }

    fetchFreeBooks() {
        const freeBooksPath = BOOKS_PATH + "?borrowedBy=-1";
        this.setState({ loading: true }, () => {
            fetch(freeBooksPath)
                .then(res => res.json())
                .then(result =>
                    this.setState({
                        loading: false,
                        freeBooks: result
                    })
                )
                .catch(console.log);
        });
    }

    componentDidMount() {
        this.fetchUsers();
        this.fetchFreeBooks();
    }

    fetchCurrentBooks() {
        const id = this.state.selectedUser.id;
        this.fetchSelectedBooks(id);
    }

    fetchSelectedBooks(id) {
        const selectedBooksPath = BOOKS_PATH + "?borrowedBy=" + id;
        this.setState({ loading: true }, () => {
            fetch(selectedBooksPath)
                .then(res => res.json())
                .then(result =>
                    this.setState({
                        loading: false,
                        selectedBooks: result
                    })
                )
                .catch(console.log);
        });
    }

    getSelectedBooksListItems() {
        const user = this.state.selectedUser;
        const selectedBooks = this.state.selectedBooks;
        return selectedBooks ? this.state.selectedBooks
            .map((book) => {
                return (
                    <BookItem
                        key={"book-item"+book.id}
                        book={book}
                        user={user}
                        removeBook={() => this.removeBorrowerFromBook(book)}
                        favorite={book.favorite}
                        updateFavorite={() => this.updateFavorite(book)}/>
                );
            }) : [];
    }

    updateFavorite(book) {
        const bookPath = BOOKS_PATH + "/" + book.id;
        const newBook = {...book, favorite: !book.favorite};
        fetch(bookPath, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        })
            .then(response => response.json())
            .then(newBook => {
                this.updateBook(newBook);
            });
    }
    removeBorrowerFromBook(book) {
        const bookPath = BOOKS_PATH + "/" + book.id;
        const newBook = {...book, borrowedBy: -1, favorite: false};
        fetch(bookPath, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newBook)
        })
            .then(response => response.json())
            .then(newBook => {
                this.updateBook(newBook);
                this.fetchCurrentBooks();
            });
    }
    updateBook(newBook) {
        const newSelectedBooks = this.state.selectedBooks
            .map(book => {
                if (book.id === newBook.id) {
                    return newBook;
                }
                return book;
            })
        this.setState({selectedBooks: newSelectedBooks});
    }

    updateUser(newUser) {
        const newSelectedBooks = this.state.users
            .map(user => {
                if (user.id === newUser.id) {
                    return newUser;
                }
                return user;
            })
        this.setState({users: newSelectedBooks});
        this.setState({selectedUser: newUser});
    }

    getUsersListItems() {
        return this.state.users.map((user) => {
            return (
                <div>
                    <UserItem
                        key={"user-item"+user.id}
                        user={user}
                        isSelected={this.state.selectedUser && this.state.selectedUser.id === user.id}
                        userClicked={this.setSelectedUser}
                        deleteUser={this.deleteUser}
                        editUser={this.editUser}
                    />
                </div>
            );
        });
    }

    addBooksToUser(booksIds) {
        const userNumber = this.state.selectedUser.id;
        const booksToAdd = this.state.freeBooks
            .filter(book => booksIds.includes(book.id))
            .map(book => ({...book, borrowedBy: userNumber}));

        // { "op": "replace", "path": "/email", "value": "new.email@example.org" }

        const bookPath = BOOKS_PATH + "/" + booksToAdd.map(book => book.id).join("&");
        // const bookPath = BOOKS_PATH + "?" + booksToAdd.map(book => "id="+book.id).join("&");
        fetch(bookPath, {
            // method: 'PUT',
            method: 'PATCH',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({borrowedBy: userNumber})
        })
            .then(response => response.json())
            .then(newBook => {
                this.updateBook(newBook);
                this.fetchCurrentBooks();
            });
    }

    getBooksHeader() {
        const user = this.state.selectedUser;
        return (
            <ListSubheader className={"list-subheader"}>
                {(user ? user.name + "'s " : "") + "Books"}
                <BorrowBookDialogHandler
                    user={user}
                    books={this.state.freeBooks}
                    handleAddBooks={(booksIds) => this.addBooksToUser(booksIds)}/>
            </ListSubheader>
        )
    }

    newUser(newUser) {
        fetch(USERS_PATH, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newUser)
        })
            .then(response => response.json())
            .then((data) => {
                const updatedUsers = [...this.state.users, data];
                this.setState({users: updatedUsers});
            })
            .catch(e => console.log(e));
    }

    getUsersHeader() {
        return (
            <ListSubheader className={"list-subheader"}>
                Users
                <NewUserDialogButton
                    handleSubmit={(newUser) => this.newUser(newUser)}
                    editMode={false}
                />
            </ListSubheader>
        );
    }

    render() {
        return (
            <div className="app-table">
                <div className="users app-list">
                    <LibraryList
                        subHeader={this.getUsersHeader()}
                        listItems={this.getUsersListItems()}
                    />
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="books app-list">
                    <LibraryList
                        subHeader={this.getBooksHeader()}
                        listItems={this.getSelectedBooksListItems()}
                    />
                </div>
            </div>
        );
    }
}

export default ManageUsers;