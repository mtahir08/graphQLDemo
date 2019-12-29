import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
class Bookings extends Component {
    state = {
        bookings: []
    }

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

    cancelBooking = () => {

    }

    render() {
        return (<ListGroup>
            {this.state.bookings.map((item, index) => (
                <ListGroup.Item eventKey={index.toString()} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {item.event.title}
                    <Button variant='info' onClick={() => this.cancelBooking(item._id)}>
                        Cancel
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>);

    }
}

export { Bookings };
