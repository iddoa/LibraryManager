import React from 'react';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import users from "../mock-data/users";
import books from "../mock-data/books";
import './table.css';
import Divider from '@mui/material/Divider';
import BookItem from "./bookItem";
import LibraryList from "./libraryList";
import UserItem from "./userItem";
import OpenUserDialogButton from "./openUserDialogButton";


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
            this.setState({selectedUser: user,});
        };

        this.deleteUser = (userId) => {
            console.log('delete ' + userId);
        };

        this.editUser = (userId) => {
          console.log('edit: ' + userId);
        };

    }

    getSelectedBooksListItems() {
        return this.state.books.filter(book =>
            this.state.selectedUser && this.state.selectedUser.books.includes(book.id))
            .map((book) => {
                return (
                    <BookItem key={book.id} book={book} favorite={false}/>
                );
            });
    }

    getUsersListItems() {
        return this.state.users.map((user) => {
            return (
                <div>
                    <UserItem
                        key={user.id}
                        user={user}
                        isSelected={this.state.selectedUser && this.state.selectedUser.id === user.id}
                        userClicked={this.setSelectedUser}
                        deleteUser={this.deleteUser}
                        editUser={this.editUser}
                    />
                    <Divider />
                </div>
            );
        });
    }

    getBooksHeader() {
        return (
            <ListSubheader className={"list-subheader"}>
                {(this.state.selectedUser ? this.state.selectedUser.name + "'s " : "") + "Books"}
                <Button variant="outlined">
                    Available Books
                </Button>
            </ListSubheader>
        )
    }

    newUser(data) {
        console.log(data);
    }

    getUsersHeader() {
        return (
            <ListSubheader className={"list-subheader"}>
                Users
                <OpenUserDialogButton
                    onSubmit={this.newUser}
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

export default Table;