import * as React from 'react';
import NewUserDialog from "./newuserdialog";
import Button from '@mui/material/Button';

class OpenUserDialogButton extends React.Component {
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
                <Button variant="outlined" onClick={() => this.toggleState(true)}>
                    New User
                </Button>
                <NewUserDialog open={this.state.open} onClose={() => this.toggleState(false)} onSubmit={this.props.onSubmit}/>
            </div>
        );
    }
}

export default OpenUserDialogButton;