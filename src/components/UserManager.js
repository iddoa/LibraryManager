import {fetchUsers, updateUser, deleteUser, addNewUser} from "../services/Provider";
import React, { useState, useEffect } from 'react';
import BookList from "./Books/BookList";
import Divider from '@mui/material/Divider';
import UserList from "./Users/UserList";
import UserDialog from "./Users/UserDialog";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import './UserManager.css';

export default function UserManager(props) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchUsers()
            .then(result => {
                setLoading(false);
                setUsers(result);
            });
    }, []);

    useEffect(() => {
        const updatedSelected = users.find(user => user && selectedUser && user.id === selectedUser.id);
        setSelectedUser(updatedSelected)
    }, [users, selectedUser]);

    const onUpdateUser = (newUser) => {
        setLoading(true);
        updateUser(newUser).then(newUser => {
            setLoading(false);
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
        setLoading(true);
        deleteUser(id).then(() => {
            setLoading(false);
            const updatedUsers = users.filter(user => user.id !== id);
            setUsers(updatedUsers)
        });
    };

    const onAddUser = (newUser) => {
        setLoading(true);
        addNewUser(newUser).then((data) => {
            setLoading(false);
            const updatedUsers = [...users, data];
            setUsers(updatedUsers);
        });
    };

    return (
        <div className="app-table">
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <UserList
                users={users}
                onUserSelected={(selected) => setSelectedUser(selected)}
                selectedUser={selectedUser}
                addUser={onAddUser}
                deleteUser={onDeleteUser}
                editUser={onUpdateUser}
            >
                <UserDialog
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
