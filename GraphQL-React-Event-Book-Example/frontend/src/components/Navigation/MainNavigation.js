import React from 'react';
import { NavLink } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

import './MainNavigation.css'
import { AuthContext } from './../../context/auth-context'
const MainNavigation = (props) => (
    <AuthContext.Consumer>
        {(context) => (
            <header className='main-navigation'>
                <div className='main-navigation-logo'>
                    <h1>Easy Events</h1>
                </div>
                <div className='main-navigation-item'>
                    <ul>
                        {!context.token && <li>
                            <NavLink to='/auth'>Authentication</NavLink>
                        </li>
                        }
                        <li>
                            <NavLink to='/events'>Events</NavLink>
                        </li>
                        {
                            context.token &&
                            <React.Fragment>
                                <li>
                                    <NavLink to='/bookings'>Bookings</NavLink>
                                </li>
                                <li>
                                    <Button variant="light" type="button" onClick={() => { context.logout() }}>
                                        Logout
                                    </Button>
                                </li>
                            </React.Fragment>
                        }
                    </ul>
                </div>
            </header>
        )}
    </AuthContext.Consumer>
);

export { MainNavigation };
