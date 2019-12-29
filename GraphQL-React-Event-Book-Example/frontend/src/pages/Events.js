import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Jumbotron from 'react-bootstrap/Jumbotron'
import ListGroup from 'react-bootstrap/ListGroup'

import { ModalEvent } from './../components/Modal/Modal'
import { EventsList } from './../components/Events/EventList'
import { AuthContext } from './../context/auth-context'
class Events extends Component {
    state = {
        showModal: false,
        events: []
    }

    constructor(props) {
        super(props);
        this.titleRef = React.createRef()
        this.priceRef = React.createRef()
        this.dateRef = React.createRef()
        this.descriptionRef = React.createRef()
    }
    static contextType = AuthContext

    componentDidMount() {
        this.fetchEvents()
    }

    fetchEvents = () => {
        const reqBody = {
            query: `query {
                events {
                    _id
                    title
                    price
                    date
                    description
                    creator {
                        _id
                        email
                    }
                }
            }`
        }

        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
            }
        }

        fetch('http://localhost:4000/graphql', options)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json.data);
                if (json.data.events && Array.isArray(json.data.events)) {
                    this.setState({ events: json.data.events })
                }
            })
            .catch((error) => {
                console.log(error)
            })
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

        const reqBody = {
            query: `mutation{
                createEvent(eventInput:{title:"${title}", price:${price}, date:"${date}", description:"${description}"}){
                    _id
                    title
                    price
                    date
                    description
                    creator {
                        _id
                        email
                    }
                }
            }`
        }

        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.token}`
            }
        }

        fetch('http://localhost:4000/graphql', options)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json.data.createEvent);
                if (json.data.createEvent && json.data.createEvent._id) {
                    this.setState({ events: [...this.state.events, json.data.createEvent] })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    onEventBook = (eventId) => {
        const reqBody = {
            query: `mutation{
                bookEvent(eventId:"${eventId}"){
                    _id
                    event {
                        _id
                        title
                        price
                        date
                        description
                        creator {
                            _id
                            email
                        }
                    }
                    user {
                        _id
                        email
                    }
                    createdAt
                    updatedAt
                }
            }`
        }

        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.context.token}`
            }
        }

        fetch('http://localhost:4000/graphql', options)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json.data.bookEvent);
                if (json.data.bookEvent && json.data.bookEvent._id) {
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        const { showModal, events } = this.state;
        return <React.Fragment>
            {(this.context.token) ? (
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
                                <Form.Control type="datetime-local" placeholder="Date" ref={this.dateRef} />
                            </Form.Group>
                            <Form.Group controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" placeholder="Description" ref={this.descriptionRef} />
                            </Form.Group>
                        </Form>

                    </ModalEvent>
                </Jumbotron>
            ) : null}
            <EventsList
                events={events}
                bookEvent={this.onEventBook}
            />
        </React.Fragment>

    }
}

export { Events };
