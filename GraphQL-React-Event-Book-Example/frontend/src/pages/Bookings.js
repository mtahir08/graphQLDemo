import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Spinner from 'react-bootstrap/Spinner'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import ToggleButton from 'react-bootstrap/ToggleButton'

import { AuthContext } from './../context/auth-context'

class Bookings extends Component {
    state = {
        bookings: [],
        loading: false,
        type: "1"
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.fetchBookins()
    }

    fetchBookins = () => {
        this.setState({ loading: true });
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
                    this.setState({ bookings: json.data.bookings, loading: false })
                }
            })
            .catch((error) => {
                console.log(error)
                this.setState({ loading: false });
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
                bookingId
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

    handleChange = (checkedItem) => {
        this.setState({ type: checkedItem })
    }

    render() {
        const { type, bookings } = this.state;
        if (this.state.loading)
            return <div style={{ textAlign: 'center' }}>
                <Spinner animation="grow" />
            </div>

        const content = <React.Fragment>
            {type === '1' ?
                <ListGroup>
                    {bookings.map((item, index) => (
                        <ListGroup.Item eventKey={index.toString()} style={{ display: 'flex', justifyContent: 'space-around' }}>
                            {item.event.title}
                            <Button onClick={() => this.cancelBooking(item._id)}>
                                Cancel
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                :
                <div>Chart</div>
            }

        </React.Fragment>

        return (
            <React.Fragment>
                <ToggleButtonGroup toggle name="options" onChange={this.handleChange} value={type}>
                    <ToggleButton type="radio" name="radio" defaultChecked value="1">
                        List
                    </ToggleButton>
                    <ToggleButton type="radio" name="radio" value="2">
                        Chart
                    </ToggleButton>
                </ToggleButtonGroup>
                {content}
            </React.Fragment>);

    }
}

export { Bookings };
