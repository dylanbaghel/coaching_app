import React from 'react';

const Alert = ({ message, status, close }) => {
    const classNames = `alert alert-${status}`;
    return (
        <div className={classNames}>
            <p>{message}</p>
            <span className="alert-close" onClick={close}>&times;</span>
        </div>
    );
};

export default Alert;
