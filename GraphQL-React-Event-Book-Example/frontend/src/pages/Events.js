import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'

import { ModalEvent } from './../components/Modal/Modal'
class Events extends Component {
    state = {
        showModal: false
    }

    constructor(props) {
        super(props);
        this.titleRef = React.createRef()
        this.priceRef = React.createRef()
        this.dateRef = React.createRef()
        this.descriptionRef = React.createRef()
    }

    toggleCreateModal = (flag) => {
        this.setState({ showModal: flag })
    }

    onSubmit = () => {
        const title = this.titleRef.current.value;
        const price = this.priceRef.current.value;
        const date = this.dateRef.current.value;
        const description = this.descriptionRef.current.value;

        this.toggleCreateModal(false);
        if (
            title.trim().value === 0 ||
            price.trim().value === 0 ||
            date.trim().value === 0 ||
            description.trim().value === 0
        ) {
            return;
        }
        const event = { title, price, date, description }
        console.log(event);
    }

    render() {
        const { showModal } = this.state;
        return (
            <Jumbotron style={{ width: '80%', margin: '10px auto', textAlign: 'center' }}>
                <Button variant='info' onClick={() => this.toggleCreateModal(true)}>
                    Create Events
                </Button>
                <ModalEvent
                    title="Add Event"
                    close
                    confirm
                    show={showModal}
                    handleClose={() => { this.toggleCreateModal(false) }}
                    handleConfirm={() => { this.onSubmit() }}
                >
                    <Form >
                        <Form.Group controlId="formBasicTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" placeholder="Title" ref={this.titleRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Price" ref={this.priceRef} />
                        </Form.Group>

                        <Form.Group controlId="formBasicDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control type="date" placeholder="Date" ref={this.dateRef} />
                        </Form.Group>
                        <Form.Group controlId="formBasicDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" placeholder="Description" ref={this.descriptionRef} />
                        </Form.Group>
                    </Form>

                </ModalEvent>
            </Jumbotron>
        );

    }
}

export { Events };
