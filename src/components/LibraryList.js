import React from "react";
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';

export default function LibraryList(props) {
    return (
        <div>
            <List subheader={props.children}>
                <Divider />
                {props.listItems}
            </List>
        </div>
    );
}

