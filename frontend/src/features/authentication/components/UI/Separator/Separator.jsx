import React from 'react';
import classes from './Separator.module.scss';

const Separator = ({children}) => {
    return (
        <div className={classes.root}> {children} </div>
    );
};

export default Separator;