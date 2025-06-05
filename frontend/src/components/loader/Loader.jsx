import React from 'react';
import classes from './Loader.module.scss';

const Loader = () => {
    return (
        <div className={classes.root}>
            <img src="/logo/Logo.png" alt="Loading..." />
            <div className={classes.spinner}></div>
        </div>
    );
};

export default Loader;