import React from 'react';
import classes from './GoalFullCard.module.scss';
import {FaRegSmile} from "react-icons/fa";
import {useAuthentication} from "../../../../../authentication/context/AuthenticationContextProvider.jsx";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";

const GoalFullCard = ({goal}) => {
    const {user} = useAuthentication();
    const currency = getCurrencyByCode(user?.mainCurrency);
    const symbol = currency?.symbol;


    const percentage = Math.min((goal.amount / goal.targetAmount) * 100);
    const isCompleted = goal.amount >= goal.targetAmount;

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = {
            day: 'numeric',
            month: 'long',
        };
        const year = date.getFullYear();
        const now = new Date();
        const formatted = date.toLocaleDateString('uk-UA', options);
        return `${formatted}${year !== now.getFullYear() ? ` ${year}` : ''}`;
    };

    return (
        <div className={classes.card}>
            <h2>{goal.name}</h2>

            <div className={classes.circleWrapper}>
                <div
                    className={classes.bigCircle}
                    style={{
                        '--progress': percentage,
                        '--progress-color': goal.color
                    }}
                >
                    <div className={classes.innerCircle}>
                        <div
                            className={classes.iconCircle}
                            style={{ backgroundColor: goal.color }}
                        >
                            <img src={goal.iconUrl} alt="Goal" width="44" height="44" />
                        </div>

                        <div className={classes.percentage}>
                            <strong>{Math.floor(percentage)}%</strong>
                        </div>

                        <div className={classes.amounts}>
                            <div className={`${classes.current} ${isCompleted ? classes.green : ''}`}>
                                <strong>{goal.amount.toFixed(2)}{symbol} /</strong>
                            </div>
                            <div className={classes.target}>{goal.targetAmount.toFixed(2)}{symbol}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={classes.startDate}>
                <strong>{formatDate(goal.startDate)}</strong>
            </div>
        </div>
    );
};

export default GoalFullCard;