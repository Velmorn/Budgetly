import React from 'react';
import classes from './CurrencyCard.module.scss';

const CurrencyCard = ({code, symbol, name}) => {
    return (
        <div className={classes.root}>
            <div className={classes.code}>{code}</div>
            <div className={classes.symbol}>{symbol}</div>
            <div className={classes.name}>{name}</div>
        </div>
    );
};
export default CurrencyCard;
