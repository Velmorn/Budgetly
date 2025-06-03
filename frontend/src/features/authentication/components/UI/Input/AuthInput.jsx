import React from 'react';
import styles from './AuthInput.module.scss';

const AuthInput = ({label, ...props}) => {
    return (
        <div className={styles.root}>
            <label>{label}</label>
            <input {...props} />
        </div>
    );
};

export default AuthInput;