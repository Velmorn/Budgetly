import React from 'react';
import classes from './SearchLine.module.scss';

const SearchLine = ({...props}) => {
    return (
        <input {...props} className={classes.searchLine}>

        </input>
    );
};

export default SearchLine;