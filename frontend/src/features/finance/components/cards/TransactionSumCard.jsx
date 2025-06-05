import React from 'react';
import classes from './TransactionSumCard.module.scss';
import {getCurrencyByCode} from "../../utils/getCurrencyByCode.js";
import {convertTransactionsSumToMainCurrency} from "../../utils/convertToMainCurrency.js";
import {useAuthentication} from "../../../authentication/context/AuthenticationContextProvider.jsx";

const TransactionSumCard = ({ transactions, currency }) => {
    const {user} = useAuthentication();
    const expenses = transactions?.filter(t => t.type === 'EXPENSE');
    const incomes = transactions?.filter(t => t.type === 'INCOME');
    const currencyData = getCurrencyByCode(currency);
    const symbol = currencyData?.symbol;

    const totalExpenses = convertTransactionsSumToMainCurrency(expenses, user);
    const totalIncomes = convertTransactionsSumToMainCurrency(incomes, user);

    return (
        <div className={classes.card}>
            <div className={classes.row}>
                <div className={classes.labelGroup}>
                    <span className={classes.label}>Витрати</span>
                    <span className={classes.count}>(x{expenses.length})</span>
                </div>
                <div className={classes.line}></div>
                <span className={classes.expenseAmount}> {totalExpenses.toFixed(2)} {symbol} </span>
            </div>
            <div className={classes.row}>
                <div className={classes.labelGroup}>
                    <span className={classes.label}>Доходи</span>
                    <span className={classes.count}>(x{incomes.length})</span>
                </div>
                <div className={classes.line}></div>
                <span className={classes.incomeAmount}> {totalIncomes.toFixed(2)}  {symbol}</span>
            </div>
        </div>
    );
};

export default TransactionSumCard;