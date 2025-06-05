import React from 'react';
import styles from './GoalCard.module.scss';
import {useNavigate} from "react-router-dom";
import {useAuthentication} from "../../../../../authentication/context/AuthenticationContextProvider.jsx";
import {getCurrencyByCode} from "../../../../utils/getCurrencyByCode.js";

const GoalCard = ({ goal }) => {
    const navigate = useNavigate();
    const {user} = useAuthentication();
    const currency = getCurrencyByCode(user?.mainCurrency);
    const symbol = currency?.symbol;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = { day: 'numeric', month: 'long' };
        if (date.getFullYear() !== new Date().getFullYear()) {
            options.year = 'numeric';
        }
        return date.toLocaleDateString('uk-UA', options);
    };

    const progressPercent = ((goal.amount / goal.targetAmount) * 100).toFixed(0);

    return (
        <div className={styles.card}  onDoubleClick={() => navigate(`/goals/${goal.id}`)}>
            <div className={styles.topSection}>
                <div className={styles.nameAndDate}>
                    <span className={styles.name}>{goal.name}</span>
                    <span className={styles.startDate}>{formatDate(goal.startDate)}</span>
                </div>

                <div
                    className={styles.iconCircle}
                    style={{ backgroundColor: goal.color }}
                >
                    <img src={goal.iconUrl} alt="Goal Icon" width="24" height="24" />
                </div>
            </div>

            <div className={styles.middleSection}>
                <div className={styles.transactionsCount}>
                </div>
                <div className={styles.amountBlock}>
                    <div className={`${styles.amount} ${goal.amount >= goal.targetAmount ? styles.green : ''}`}>{goal.amount.toFixed(2)} {symbol}</div>
                    <div className={styles.targetAmount}> / {goal.targetAmount.toFixed(2)} {symbol}</div>
                </div>
            </div>

            <div className={styles.progressSection}>
                <div
                    className={styles.progressBarFill}
                    style={{ width: `${progressPercent}%`, backgroundColor: goal.color }}
                />
                <div className={styles.progressText}>
                    {progressPercent}%
                </div>
            </div>
        </div>
    );
};

export default GoalCard;