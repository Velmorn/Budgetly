import React from 'react';
import classes from './Header.module.scss';

const Header = () => {
    return (
        <div className={classes.header}>
            <img src="/logo/Logo.png" alt="Logo" className={classes.logo} />
            <h1 className={classes.title}>Budgetly</h1>
        </div>
    );
};

export default Header;