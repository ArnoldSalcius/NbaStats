import React, { useRef, useEffect } from 'react';
import Button from '../../common/Button';
import './HamNav.css'


const HamNav = ({ isOpen, handleClose, items }) => {
    const navRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            function handleClickOutside(event) {

                if (navRef.current && !navRef.current.contains(event.target)) {
                    handleClose();
                }
            }
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }

    }, [navRef, isOpen]);

    return (
        <div id='hamBackground'>
            <div ref={navRef} className={isOpen ? 'ham-nav open' : 'ham-nav close'}>
                <Button cName='danger' onClick={handleClose}>X</Button>
                <ul>
                    {items}
                </ul>
            </div>
        </div>

    )
}

export default HamNav
