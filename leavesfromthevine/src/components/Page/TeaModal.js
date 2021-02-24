import React from "react";
// reactstrap components
import { Button, Modal } from "reactstrap";

class TeaModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false
        };
    }

    handleClick = event => {
        this.setState({openModal: true})
    }

    handleClose = event => {
        this.setState({openModal: false})
    }

    render() {
        return(
            <>
                <Button className="btn-round btn-neutral" type="button" onClick={this.handleClick}>View More</Button>
                <Modal isOpen={this.state.openModal} toggle={this.handleClose}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLiveLabel">
                            {this.props.teaname}
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={this.handleClose}
                        >
                            <span aria-hidden={true}>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>IN HERE IT WOULD BE THE API CALL</p>
                    </div>
                    <div className="modal-footer">
                        <div className="left-side">
                            <Button
                                className="btn-link"
                                color="default"
                                data-dismiss="modal"
                                type="button"
                                onClick={this.handleClose}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export default TeaModal;