import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import './list-styles.css';



class LibraryList extends React.Component {
    render() {
        return (
            <div>
                <List subheader={this.props.subHeader}>
                    <Divider />
                    {this.props.listItems}
                </List>
            </div>
        );
    };
}

export default LibraryList;
