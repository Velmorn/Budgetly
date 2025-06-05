import React from 'react';
import classes from './BudgetPeriodCard.module.scss';
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../../../../../authentication/context/AuthenticationContextProvider.jsx";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";

const BudgetPeriodCard = ({ budgetPeriod, budget }) => {
    const navigate = useNavigate();
    const {user} = useAuthentication();
    const currency = getCurrencyByCode(user?.mainCurrency);
    const symbol = currency?.symbol;


    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { day: 'numeric', month: 'long' };
        const year = date.getFullYear();
        const thisYear = new Date().getFullYear();

        return {
            main: date.toLocaleDateString('uk-UA', options),
            year: year !== thisYear ? year : null,
        };
    };

    const percentage = Math.min((budgetPeriod.amount / budget.budgetLimit) * 100, 100);
    const remaining = budget.budgetLimit - budgetPeriod.amount;
    const isOver = remaining < 0;

    const formattedDate = formatDate(budgetPeriod.startDate);

    return (
        <div className={classes.card} onClick={() => navigate(`/budgets/${budget.id}/period/${budgetPeriod.id}`)}>
            <div className={classes.circle}>
                <svg viewBox="0 0 36 36" className={classes.circularChart}>
                    <path
                        className={classes.circleBg}
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                        className={classes.circleProgress}
                        stroke={budget.color}
                        strokeDasharray={`${percentage}, 100`}
                        d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                </svg>
                <span className={classes.percentageText}>{Math.floor(percentage)}%</span>
            </div>

            <div className={classes.info}>
                <div className={classes.date}>
                    <strong>{formattedDate.main}</strong>
                    {formattedDate.year && (
                        <div className={classes.year}>{formattedDate.year}</div>
                    )}
                </div>
                <div className={classes.amount}>
                    <strong>{Math.abs(remaining).toFixed(2)}{symbol} </strong> {isOver ? 'перевитрачено' : 'залишилось'} з {budget.budgetLimit.toFixed(2)} {symbol}
                </div>
            </div>
        </div>
    );
};

export default BudgetPeriodCard;