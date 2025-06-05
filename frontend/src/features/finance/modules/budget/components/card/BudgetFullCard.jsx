import React from 'react';
import classes from './BudgetFullCard.module.scss';
import {useAuthentication} from "../../../../../authentication/context/AuthenticationContextProvider.jsx";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";

const BudgetFullCard = ({ budget, budgetPeriod }) => {
    const {user} = useAuthentication();
    const currency = getCurrencyByCode(user?.mainCurrency);
    const symbol = currency?.symbol;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            day: 'numeric',
            month: 'long',
        };
        if (date.getFullYear() !== new Date().getFullYear()) {
            options.year = 'numeric';
        }
        return date.toLocaleDateString('uk-UA', options);
    };

    const percentage = Math.min((budgetPeriod.amount / budget.budgetLimit) * 100, 100);
    const remaining = budget.budgetLimit - budgetPeriod.amount;

    const today = new Date();
    const end = new Date(budgetPeriod.endDate);
    const daysLeft = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
    const dailyAllowance = daysLeft > 0 ? (remaining / daysLeft).toFixed(2) : 0;

    return (
        <div className={classes.wrapper}>
            <h2 className={classes.name}>{budget.name}</h2>
            <p className={classes.info}>
                <strong>{remaining.toFixed(2)}{symbol}</strong> залишилось з {budget.budgetLimit.toFixed(2)}{symbol}
            </p>

            <div className={classes.barWrapper}>
                <span className={classes.date}>{formatDate(budgetPeriod.startDate)}</span>

                <div className={classes.progressBar}>
                    <div
                        className={classes.progress}
                        style={{ width: `${percentage}%`, backgroundColor: budget.color }}
                    />
                    <span className={classes.percentage}>{Math.floor(percentage)}%</span>
                </div>

                <span className={classes.date}>{formatDate(budgetPeriod.endDate)}</span>
            </div>

            <p className={classes.subText}>
                Ви можете витратити <strong>{dailyAllowance} {symbol}</strong> на день для
                наступних <strong>{daysLeft}</strong> днів.
            </p>
        </div>
    );
};

export default BudgetFullCard;