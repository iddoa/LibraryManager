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
            books: [],
            selectedUser: null,
            loading: false,
        }
        this.setSelectedUser = (user) => {
            this.setState({selectedUser: user});
        };

        this.deleteUser = (userId) => {
            const newUsers = this.state.users.filter(user => user.id !== userId);
            this.setState({users: newUsers});
        };

        this.editUser = (oldUser, newUser) => {
            // this.setState(prevState => ({
            //     const newUsers = prevState.arrayvar
            //     arrayvar: [...prevState.arrayvar, newelement]
            // }))
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

    fetchBooks() {
        this.setState({ loading: true }, () => {
            fetch(BOOKS_PATH)
                .then(res => res.json())
                .then(result =>
                    this.setState({
                        loading: false,
                        books: result
                    })
                )
                .catch(console.log);
        });
    }

    componentDidMount() {
        this.getLists();
    }

    getLists() {
        this.fetchUsers();
        this.fetchBooks();
    }


    getSelectedBooksListItems() {
        return this.state.books.filter(book =>
            this.state.selectedUser && this.state.selectedUser.books.includes(book.id))
            .map((book) => {
                const favorite = this.state.selectedUser.favoriteBooks.includes(book.id);
                return (
                    <BookItem key={"book-item"+book.id} book={book} favorite={favorite} updateFavorite={() => this.updateFavorite(book.id, favorite)}/>
                );
            });
    }

    updateFavorite(bookId, remove) {
        //TODO - this changes the order and causes problems
        const selectedUser = this.state.selectedUser;
        const oldFavorites = selectedUser.favoriteBooks;
        const newFavorite = remove ? oldFavorites.filter(id => id !== bookId) : [...oldFavorites, bookId]
        const updatedUser = {...selectedUser, favoriteBooks: newFavorite};
        const updatedUsers = [...this.state.users.filter(user => user.id !== selectedUser.id), updatedUser];
        // this.setState({selectedUser: updatedUser,
        //                 users: [...updatedUsers, updatedUser]});
        // this.updateUsers();
        // const users = this.state.users;
        fetch(USERS_PATH, {
        // fetch('https://reqres.in/api/posts', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updatedUser)
        }).then(response => response.json());
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
        console.log(booksIds);
    }

    getBooksHeader() {
        const user = this.state.selectedUser;
        return (
            <ListSubheader className={"list-subheader"}>
                {(user ? user.name + "'s " : "") + "Books"}
                <BorrowBookDialogHandler
                    user={user}
                    books={this.state.books}
                    handleAddBooks={(booksIds) => this.addBooksToUser(booksIds)}/>
            </ListSubheader>
        )
    }

    newUser(newUser) {
        fetch(USERS_PATH, {
            // fetch('https://reqres.in/api/posts', {
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