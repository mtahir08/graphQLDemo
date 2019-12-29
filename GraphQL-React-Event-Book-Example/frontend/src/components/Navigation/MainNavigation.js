import React from 'react';
import { NavLink } from 'react-router-dom'

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
                            context.token && <li>
                                <NavLink to='/bookings'>Bookings</NavLink>
                            </li>
                        }
                    </ul>
                </div>
            </header>
        )}
    </AuthContext.Consumer>
);

export { MainNavigation };
