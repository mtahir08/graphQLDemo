import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'

import { AuthContext } from './../context/auth-context'
class Auth extends Component {
    constructor(props) {
        super(props);
        this.emailRef = React.createRef()
        this.passwordRef = React.createRef()
        this.state = {
            isLogin: false
        }
    }
    static contextType = AuthContext

    onClick = () => {
        this.setState({ isLogin: !this.state.isLogin })
    }

    onSubmit = (e) => {
        e.preventDefault()
        const email = this.emailRef.current.value;
        const password = this.passwordRef.current.value;

        if (email.trim().length === 0 || password.trim().legnth === 0) {
            return;
        }

        let reqBody = {
            query: `mutation{
                createUser(userInput:{email:"${email}", password:"${password}"}){
                    _id
                    email
                }
            }`
        }

        if (!this.state.isLogin) {
            reqBody = {
                query: `
                query {
                    login(email: "${email}", password: "${password}"){
                        userId
                        token
                        tokenExpiration
                    }
                }`
            }
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
                if (json.data.login && json.data.login.token) {
                    this.context.login(json.data.login.token, json.data.login.userId)
                }
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
                        <Form.Control type="email" placeholder="Enter email" ref={this.emailRef} value="tahir+1@gmail.com" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                    </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ref={this.passwordRef} value="123456" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Submit
                </Button>
                    <Button variant="light" type="button" onClick={this.onClick}>
                        {!this.state.isLogin ? 'Goto Signup' : 'Goto Login'}
                    </Button>
                </Form>
            </Container>
        );

    }
}

export { Auth };
