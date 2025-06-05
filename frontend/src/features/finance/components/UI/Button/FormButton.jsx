import React from 'react';
import classes from './FormButton.module.scss';

const FormButton = ({ children, ...props }) => {
    return (
        <button className={classes.formButton} {...props}>
            {children}
        </button>
    );
};

export default FormButton;
