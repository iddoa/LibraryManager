import {fetchUsers, updateUser, deleteUser, addNewUser} from "../services/Provider";
import React, { useState, useEffect } from 'react';
import BookList from "./BookList";
import Divider from '@mui/material/Divider';
import UserList from "./UserList";
import NewUserDialogButton from "./NewUserDialogButton";
import './MainTab.css';

export default function MainTab(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers()
            .then(result => {
                setLoading(false);
                setUsers(result);
            })
            .catch(console.log);
    }, []);

    useEffect(() => {
        const updatedSelected = users.find(user => user && selectedUser && user.id === selectedUser.id);
        setSelectedUser(updatedSelected)
    }, [users, selectedUser]);

    const onUpdateUser = (newUser) => {
        updateUser(newUser).then(newUser => {
            const updatedUsers = users
                .map(user => {
                    if (user.id === newUser.id) {
                        return newUser;
                    }
                    return user;
                });
            setUsers(updatedUsers);
        });
    };

    const onDeleteUser = (id) => {
        deleteUser(id).then(() => {
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers)
        }).catch(e => console.log(e));
    };

    const onAddUser = (newUser) => {
        addNewUser(newUser).then((data) => {
            const updatedUsers = [...users, data];
            setUsers(updatedUsers);
        }).catch(e => console.log(e));
    };

    return (
        <div className="app-table">
            <UserList
                users={users}
                onUserSelected={(selected) => setSelectedUser(selected)}
                selectedUser={selectedUser}
                addUser={onAddUser}
                deleteUser={onDeleteUser}
                editUser={onUpdateUser}
            >
                <NewUserDialogButton
                    handleSubmit={onAddUser}
                    editMode={false}
                />
            </UserList>
            <Divider orientation="vertical" flexItem />
            <div className="books app-list">
                <BookList
                    user={selectedUser}
                    onUserChange={onUpdateUser}
                />
            </div>
        </div>
    );
}
