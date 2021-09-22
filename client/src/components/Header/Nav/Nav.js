import React from 'react';

import Hamburger from './Hamburger';
import { Link } from 'react-router-dom';
import navItems from './navItems';


import './Nav.css';



const Nav = () => {


    const renderItems = () => {
        return navItems.map(item => {
            return (
                <li key={item.name}><Link to={item.to}>{item.name}</Link></li>
            )
        })
    };
    return (
        <nav>
            <ul className='nav-list'>
                {renderItems()}
            </ul>
            <Hamburger />
        </nav>
    )
}

export default Nav
