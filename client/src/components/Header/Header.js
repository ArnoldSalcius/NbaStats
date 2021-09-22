import React from 'react';
import './Header.css';
import Link from 'react-router-dom';

import Nav from './Nav/Nav';

const Header = () => {
    return (
        <header id='header'>
            <div className='container'>
                <h1>NBA Stats</h1>
                <Nav />
            </div>

        </header>
    )
}

export default Header;
