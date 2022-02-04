import React from "react";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import Button from '@mui/material/Button';
import BorrowBookDialog from "./BorrowBookDialog";

class BorrowBookDialogButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    toggleState(open) {
        this.setState({open: open});
    }

    render() {
        return (
            <div>
                <Button
                    variant="outlined"
                    onClick={() => this.toggleState(true)}
                    endIcon={<MenuBookIcon />}
                    disabled={!this.props.user}
                >
                    Borrow Book
                </Button>
                <BorrowBookDialog
                    open={this.state.open}
                    user={this.props.user}
                    onClose={() => this.toggleState(false)}
                    bookItems={this.props.bookItems}
                />
            </div>
        )
    }
}

export default BorrowBookDialogButton;