import React from 'react';
import './BillCard.module.scss'

const BillExpandedCard = ({ bill, transactions }) => {
    return (
        <div>
            <h2>{bill.name}</h2>
            <div className="bill-card">
                <h4>Balance</h4>
                <p className="bill-balance">{bill.balance} {bill.currency}</p>
                <p>{transactions.length} transactions</p>
            </div>
        </div>
    );
};

export default BillExpandedCard;