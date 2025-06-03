import React from 'react';
import classes from './AuthButton.module.scss';

const AuthButton = ({outline, children, ...others}) => {
    return (
        <button {...others} className={`${classes.root} ${outline ? classes.outline : ""}`}>
            {children}
        </button>
    );
};

export default AuthButton;