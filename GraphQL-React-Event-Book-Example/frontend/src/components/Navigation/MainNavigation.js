import React from 'react';
import { NavLink } from 'react-router-dom'

import './MainNavigation.css'
const MainNavigation = (props) => (
    <header className='main-navigation'>
        <div className='main-navigation-logo'>
            <h1>Easy Events</h1>
        </div>
        <div className='main-navigation-item'>
            <ul>
                <li>
                    <NavLink to='/auth'>Authentication</NavLink>
                </li>
                <li>
                    <NavLink to='/events'>Events</NavLink>
                </li>
                <li>
                    <NavLink to='/bookings'>Bookings</NavLink>
                </li>
            </ul>
        </div>
    </header>
);

export { MainNavigation };
