import React from 'react';
import BooksList from "./booklist";
import UsersList from "./userslist";
import users from "../mock-data/users";
import books from "../mock-data/books";
import './table.css';
import Divider from '@mui/material/Divider';

function fetchUsers() {
    return users.users;
}

function fetchBooks() {
    return books.books;
}

class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: fetchUsers(),
            books: fetchBooks(),
            selectedUser: null,
        }
        this.setSelectedUser = (user) => {
            console.log('clicked');
            this.setState(
                {
                    selectedUser: user,
                }
            );
        };

        this.deleteUser = (userId) => {
            console.log('delete ' + userId);
        };

        this.editUser = (userId) => {
          console.log('edit: ' + userId);
        };
    }

    render() {

        const currentSelectedBooks = this.state.books.filter(book =>
                this.state.selectedUser && this.state.selectedUser.books.includes(book.id));

        return (
            <div className="app-table">
                <div className="users app-list">
                    <UsersList
                        users={this.state.users}
                        userClicked={this.setSelectedUser}
                        deleteUser={this.deleteUser}
                        editUser={this.editUser}
                        selectedUser={this.state.selectedUser}
                    />
                </div>
                <Divider orientation="vertical" flexItem />
                <div className="books app-list">
                    <BooksList
                        selectedUser={this.state.selectedUser}
                        books={currentSelectedBooks}
                    />
                </div>
            </div>
        );
    }
}

export default Table;