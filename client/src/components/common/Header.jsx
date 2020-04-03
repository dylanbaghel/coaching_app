import React from 'react';

import WithTheme from './WithTheme';

const Header = ({
    theme
}) => {
    return (
        <nav style={{ backgroundColor: theme.primaryColor }} className="navbar">
            <h1 className="navbar__logo">Coaching App</h1>
        </nav>
    );
};

export default WithTheme(Header);