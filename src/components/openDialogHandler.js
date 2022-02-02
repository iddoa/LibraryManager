import * as React from 'react';

class OpenDialogHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        }
    }

    render() {
        const handleClickOpen = () => {
            this.setState({open: true});
        };

        const handleClose = () => {
            this.setState({open: false});
        };

        return (
            <div>
                {/*{this.props.button({onClick: handleClickOpen})}*/}
                {/*{this.props.children({open: this.state.open, onClose: handleClose})}*/}
            </div>
        );
    }
}

export default OpenDialogHandler;