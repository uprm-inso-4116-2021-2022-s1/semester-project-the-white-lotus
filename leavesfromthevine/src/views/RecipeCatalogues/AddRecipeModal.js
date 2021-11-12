import React from "react";
// reactstrap components
import {Button, Col, Modal, Row} from "reactstrap";

class RecipeModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            recipe: []
        };
    }

    handleClick = event => {
        this.setState({openModal: true})
    }

    handleClose = event => {
        this.setState({openModal: false})
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: 'React POST Request Example' })
        };
        let url = 'http://localhost:5432/addrecipe/'
        fetch(url, requestOptions)
            .then((response) => response.json())
    }

    render() {
        return (
            <>
                <Button className="btn-round btn-icon" color="success" outline type="button" onClick={this.handleClick}>Add Recipe</Button>
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
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input type="title" className="form-control" id="title"
                                       placeholder="Ginger Cardamom Tea"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="yield">Yield</label>
                                <input type="yield" className="form-control" id="yield"
                                       placeholder="1 (8 ounce) serving"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="difficulty">Difficulty</label>
                                <select className="form-control" id="difficulty">
                                    <option>Easy</option>
                                    <option>Medium</option>
                                    <option>Hard</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="tea">Tea</label>
                                <select className="form-control" id="tea">
                                    {/*Populate with db*/}
                                    <option>Easy</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="taste">Taste</label>
                                <select multiple className="form-control" id="taste">
                                    {/*Populate with db*/}
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="notes">Notes</label>
                                <select multiple className="form-control" id="notes">
                                    {/*Populate with db*/}
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </select>
                            </div>
                            <div className="form-group">
                                {/*TODO: Add and remove ingredients with button (+ and x)*/}
                                <label htmlFor="ingredients">Ingredients</label>
                                <Row>
                                    <Col>
                                        <input type="amount" className="form-control" id="amount"
                                               placeholder="2 tablespoons"/>
                                    </Col>
                                    <Col>
                                        <select className="form-control" id="ingredients">
                                            <option>1</option>
                                        </select>
                                    </Col>
                                </Row>
                            </div>
                            <div className="form-group">
                                <label htmlFor="procedure">Procedure</label>
                                <textarea className="form-control" id="procedure" rows="3"></textarea>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <div className="left-side">
                            <Button
                                className="btn-link"
                                color="success"
                                data-dismiss="modal"
                                type="button"
                                onClick={this.handleClose}
                            >
                                Add Recipe
                            </Button>
                        </div>
                    </div>
                </Modal>
            </>
        )
    }
}

export default RecipeModal;