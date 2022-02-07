import UserItem from "./UserItem";
import LibraryList from "./LibraryList";
import ListSubheader from '@mui/material/ListSubheader';

export default function UserList(props) {
    const getUsersListItems = () => {
        return props.users.map((user) => {
            return (
                <div>
                    <UserItem
                        key={"user-item"+user.id}
                        user={user}
                        isSelected={props.selectedUser && props.selectedUser.id === user.id}
                        userClicked={() => props.onUserSelected(user)}
                        deleteUser={() => props.deleteUser(user.id)}
                        editUser={(updatedUser) => props.editUser(updatedUser)}
                    />
                </div>
            );
        });
    };

    return (
        <div className="users app-list">
            <LibraryList
                listItems={getUsersListItems()}>
                <ListSubheader className={"list-subheader"}>
                    Users
                    {props.children}
                </ListSubheader>
            </LibraryList>
        </div>
    )
}