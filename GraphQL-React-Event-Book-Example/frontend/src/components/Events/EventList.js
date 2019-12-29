import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'

class EventsList extends Component {
    render() {
        return <ListGroup>
            {this.props.events.map((item, index) => (
                <ListGroup.Item eventKey={index.toString()} style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {item.title}
                    <Button variant='info' onClick={() => this.props.bookEvent(item._id)}>
                        Book
                    </Button>
                </ListGroup.Item>
            ))}
        </ListGroup>

    }
}

export { EventsList };
