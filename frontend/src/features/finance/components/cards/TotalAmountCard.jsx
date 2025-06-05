import React from 'react';
import classes from './TotalAmountCard.module.scss';
import {getCurrencyByCode} from "../../utils/getCurrencyByCode.js";

const TotalAmountCard = ({ name, sum, currency, transactionCount }) => {
    const currencyData = getCurrencyByCode(currency);
    return (
        <div className={classes.root}>
            <div className={classes.name}>{name}</div>
            <div className={classes.amount}>
                {sum.toFixed(2)} {currencyData?.symbol} {currency}
            </div>
            <div className={classes.transactionCount}>
                {(transactionCount ?? 0)} транзакцій
            </div>
        </div>
    );
};


export default TotalAmountCard;