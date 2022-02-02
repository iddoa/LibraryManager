import React from "react";
import User from "./user";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import './list-styles.css';

class UsersList extends React.Component {
    render() {
        this.users = this.props.users.map((user) => {
            return (
                <div>
                    <User
                        key={user.id}
                        user={user}
                        isSelected={this.props.selectedUser && this.props.selectedUser.id === user.id}
                        userClicked={this.props.userClicked}
                        deleteUser={this.props.deleteUser}
                        editUser={this.props.editUser}
                    />
                    <Divider />
                </div>
            );
        });

        return (
            <div>
                <List
                    subheader={
                        <ListSubheader className={"list-subheader"}>
                            Users
                            <Button variant="outlined">
                                New User
                            </Button>
                        </ListSubheader>
                    }
                >
                    <Divider />
                    {this.users}
                </List>
            </div>
        );
    };
}

export default UsersList;