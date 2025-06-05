import React from 'react';
import "./BillCard.module.scss"
import {useNavigate} from "react-router-dom";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";
import classes from './BillCard.module.scss'

const BillCard = ({ bill }) => {
    const navigate = useNavigate();
    const currency = getCurrencyByCode(bill.currency);

    return (
        <div
            className={classes.card}
            style={{ "--bill-color": bill.color }}
            onClick={() => navigate(`/bills/${bill.id}`)}
        >
            <div className={classes.topRow}>
                <span>{bill.name}</span>
                <span className={classes.colorDot} />
            </div>
            <div className={classes.bottomRow}>
                {bill.balance.toFixed(2)} {currency?.symbol} {currency?.code}
            </div>
        </div>
    );
};

export default BillCard;