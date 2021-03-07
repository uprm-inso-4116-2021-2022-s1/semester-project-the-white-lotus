import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    render() {
        return (
            <>
                <Button id="Popover1" onClick={this.toggle} className="btn-round btn-icon" color="success" outline>
                <i className="nc-icon nc-simple-add" /> Add new recipe</Button>
                <Popover
                    placement="right"
                    isOpen={this.state.popoverOpen}
                    target="Popover1"
                    className="popover-primary"
                >
                    <PopoverHeader>Add a new recipe</PopoverHeader>
                    <PopoverBody>
                        Here would go the form to add a new recipe.
                    </PopoverBody>
                </Popover>
            </>
        );
    }
}

