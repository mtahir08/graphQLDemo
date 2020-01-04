import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

import { AuthContext } from './../context/auth-context'

class Bookings extends Component {
    state = {
        bookings: []
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.fetchBookins()
    }

    fetchBookins = () => {
        const reqBody = {
            query: `query {
                bookings {
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
                if (json.data.bookings && Array.isArray(json.data.bookings)) {
                    this.setState({ bookings: json.data.bookings })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    cancelBooking = (bookingId) => {
        const reqBody = {
            query: `mutation CancelBooking($bookingId: ID!) {
                cancelBooking(bookingId: $bookingId) {
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
            }`,
            variables: {
                bookingId: bookingId
            }
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
                if (json.data.cancelBooking) {
                    const bookings = this.state.bookings.filter((booking) => booking._id !== bookingId);
                    this.setState({ bookings });
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (<ListGroup>
            {this.state.bookings.map((item, index) => (
                <ListGroup.Item eventKey={index.toString()} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {item.event.title}
                    <Button onClick={() => this.cancelBooking(item._id)}>
                        Cancel
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>);

    }
}

export { Bookings };
