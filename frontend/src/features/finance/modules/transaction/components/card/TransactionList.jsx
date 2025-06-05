import React from 'react';
import TransactionCard from "./TransactionCard.jsx";
import classes from './TransactionList.module.scss';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('uk-UA', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }).format(date);
};

const groupByDate = (transactions) => {
    return transactions.reduce((groups, transaction) => {
        const dateKey = new Date(transaction.date).toDateString();
        if (!groups[dateKey]) {
            groups[dateKey] = [];
        }
        groups[dateKey].push(transaction);
        return groups;
    }, {});
};

const TransactionList = ({ transactions }) => {
    const grouped = groupByDate(transactions);
    const sortedDates = Object.keys(grouped).sort(
        (a, b) => new Date(b) - new Date(a)
    );

    return (
        <div className={classes.listWrapper}>
            {sortedDates.map((dateKey) => (
                <div key={dateKey} className={classes.group}>
                    <h2 className={classes.dateTitle}>{formatDate(dateKey)}</h2>
                    {grouped[dateKey].map((transaction, index) => (
                        <TransactionCard key={index} transaction={transaction} />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TransactionList;