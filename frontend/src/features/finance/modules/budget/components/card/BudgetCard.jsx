import React from 'react';
import classes from "./BudgetCard.module.scss";
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../../../../../authentication/context/AuthenticationContextProvider.jsx";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";

const BudgetCard = ({ budget }) => {
    const navigate = useNavigate();
    const {user} = useAuthentication();
    const currency = getCurrencyByCode(user?.mainCurrency);
    const symbol = currency?.symbol;

    let sum = 0;
    let status = '';
    let percents = 0;
    let dailyAmount = null;

    if (budget.currentPeriod.amount < budget.budgetLimit) {
        sum = budget.budgetLimit - budget.currentPeriod.amount;
        status = 'залишилось';
    } else if (budget.currentPeriod.amount > budget.budgetLimit) {
        sum = budget.currentPeriod.amount - budget.budgetLimit;
        status = 'перевитрачено';
    } else {
        sum = 0;
        status = 'ліміт досягнуто';
    }

    percents = Math.min((budget.currentPeriod.amount / budget.budgetLimit) * 100, 100);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' });
    };

    const today = new Date();
    const endDate = new Date(budget.endDate);
    const msInDay = 1000 * 60 * 60 * 24;
    const daysLeft = Math.ceil((endDate - today) / msInDay);

    if (status === 'залишилось' && daysLeft > 0) {
        dailyAmount = (sum / daysLeft).toFixed(2);
    }

    return (
        <div className={classes.card} onDoubleClick={() => navigate(`/budgets/${budget.id}`)}>
            <div className={classes.header} style={{ backgroundColor: budget.color }}>
                <div className={classes.top}>
                    <h4 className={classes.name}>{budget.name}</h4>
                    <p className={classes.amount}>
                        <strong>{sum.toFixed(2)}{symbol} </strong> <span>{status} з {budget.budgetLimit.toFixed(2)}{symbol} </span>
                    </p>
                </div>
            </div>

            <div className={classes.footer}>
                <div className={classes.dates}>
                    <span>{formatDate(budget.currentPeriod.startDate)}</span>
                    <div className={classes.progressBar}>
                        <div className={classes.progressTrack}>
                            <div
                                className={classes.progressFill}
                                style={{
                                    width: `${percents}%`,
                                    backgroundColor: percents > 0 ? budget.color : '#ccc',
                                }}
                            />
                            <span className={classes.progressText}>{Math.round(percents)}%</span>
                        </div>
                    </div>
                    <span>{formatDate(budget.currentPeriod.endDate)}</span>
                </div>
                {dailyAmount && (
                    <p className={classes.dailyAmount}>
                        Ви можете витратити {dailyAmount}{symbol}/ день для {daysLeft} наступних днів
                    </p>
                )}
            </div>
        </div>
    );
};

export default BudgetCard;

