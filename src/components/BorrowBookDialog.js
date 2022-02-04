import React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import LibraryList from './LibraryList';

class BorrowBookDialog extends React.Component {
    handleClose() {
        this.props.onClose();
    }

    handleSubmit() {

    }

    render() {
        const userName = this.props.user && this.props.user.name;
        return (
            <Dialog open={this.props.open} onClose={this.handleClose}>
                <DialogTitle>Borrow Books for {userName}</DialogTitle>
                <DialogContent>
                    <DialogActions>
                        <LibraryList
                            subHeader={(<div></div>)}
                            listItems={this.props.bookItems}
                        />
                        <Button onClick={() => this.handleClose()}>Cancel</Button>
                        <Button onClick={() => this.handleSubmit()}>Borrow</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        )
    }
}

export default BorrowBookDialog;