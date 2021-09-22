import React, { useState } from 'react';
import { FaBasketballBall } from 'react-icons/fa'
import HamNav from './HamNav';
import './Hamburger.css'
import navItems from './navItems';
import { Link } from 'react-router-dom';

const Hamburger = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    }

    const renderItems = () => {
        return navItems.map(item => {
            return (
                <li key={item.name}><Link onClick={handleClick} to={item.to}>{item.name}</Link></li>
            )
        })
    };

    return (
        <div className='hamburger'>
            <i onClick={handleClick} className='ham-icon'><FaBasketballBall /></i>
            <HamNav items={renderItems()} isOpen={isOpen} handleClose={handleClick} />
        </div>
    )
}

export default Hamburger
