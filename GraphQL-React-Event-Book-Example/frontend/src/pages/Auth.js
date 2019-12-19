import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
    }

    onSubmit = (e) => {
        e.preventDefault()
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        if (email.trim().length === 0 || password.trim().legnth === 0) {
            return;
        }

        const reqBody = {
            query: `mutation{
                createUser(userInput:{email:"${email}", password:"${password}"}){
                    _id
                    email
                }
            }`
        }

        const options = {
            method: "POST",
            body: JSON.stringify(reqBody),
            headers: {
                'Content-Type': 'application/json'
            }
        }

        fetch('http://localhost:4000/graphql', options)
            .then((response) => {
                return response.json()
            })
            .then((json) => {
                console.log(json)
            })
            .catch((error) => {
                console.log(error)
            })

    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.onSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" ref={this.emailRef} />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={this.passwordRef} />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                    <Button variant="light" type="button">
                        Goto Signup
                </Button>
                </Form>
            </Container>
        );

    }
}

export { Auth };
