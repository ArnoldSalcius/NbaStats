import React from 'react';

import './Button.css';

const Button = ({ onClick, children, cName }) => {
    return (
        <button className={`btn ${cName}`} onClick={onClick}>
            {children}
        </button>

    )
}

export default Button
