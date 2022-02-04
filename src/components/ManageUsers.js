import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import users from "../mock-data/users";
import books from "../mock-data/books";
import './ManageUsers.css';
import Divider from '@mui/material/Divider';
import BookItem from "./BookItem";
import LibraryList from "./LibraryList";
import UserItem from "./UserItem";
import NewUserDialogButton from "./NewUserDialogButton";
import BorrowBookDialogHandler from "./BorrowBookDialogHandler";


function fetchUsers() {
    return users.users;
}

function fetchBooks() {
    return books.books;
}

class ManageUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: fetchUsers(),
            books: fetchBooks(),
            selectedUser: null,
            loading: false,
            alldata: null
        }
        this.setSelectedUser = (user) => {
            console.log('clicked');
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
        this.getLists();
    }

    getLists() {
        this.setState({ loading: true }, () => {
            fetch("http://localhost:3000/users")
                .then(res => res.json())
                .then(result =>
                    this.setState({
                        loading: false,
                        alldata: result
                    })
                )
                .catch(console.log);
        });
    }


    getSelectedBooksListItems() {
        return this.state.books.filter(book =>
            this.state.selectedUser && this.state.selectedUser.books.includes(book.id))
            .map((book) => {
                const favorite = this.state.selectedUser.favoriteBooks.includes(book.id);
                return (
                    <BookItem key={book.id} book={book} favorite={favorite} updateFavorite={() => this.updateFavorite(book.id, favorite)}/>
                );
            });
    }

    updateFavorite(bookId, remove) {
        //TODO - this changes the order and causes problems
        // const oldFavorites = this.state.selectedUser.favoriteBooks;
        // const newFavorite = remove ? oldFavorites.filter(id => id !== bookId) : [...oldFavorites, bookId]
        // const updatedUser = {...this.state.selectedUser, favoriteBooks: newFavorite};
        // const updatedUsers = this.state.users.filter(user => user.id !== this.state.selectedUser.id)
        // this.setState({selectedUser: updatedUser,
        //                 users: [...updatedUsers, updatedUser]});
    }

    getUsersListItems() {
        return this.state.users.map((user) => {
            return (
                <div>
                    <UserItem
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
        const updatedUsers = [...this.state.users, newUser];
        this.setState({users: updatedUsers});
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