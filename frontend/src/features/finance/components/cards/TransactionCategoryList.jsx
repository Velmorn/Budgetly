import React, {useMemo, useState} from 'react';
import classes from './TransactionCategoryList.module.scss';
import TransactionList from "../../modules/transaction/components/card/TransactionList.jsx";
import {getCurrencyByCode} from "../../utils/getCurrencyByCode.js";
import {convertCurrency} from "../../utils/convertCurrency.js";

const TransactionCategoryList = ({ transactions, currency }) => {
    const [activeCategoryId, setActiveCategoryId] = useState(null);
    const currencyData = getCurrencyByCode(currency);
    const symbol = currencyData?.symbol;

    const categoryMap = {};

    const totalAmount = useMemo(() => {
        return transactions.reduce((acc, tx) => {
            const amount = convertCurrency(tx.amount, tx.currency, currency);
            return acc + amount;
        }, 0);
    }, [transactions, currency]);

    transactions.forEach(tx => {
        const catId = tx.category.id;
        const convertedAmount = convertCurrency(tx.amount, tx.currency, currency);

        if (!categoryMap[catId]) {
            categoryMap[catId] = {
                category: tx.category,
                total: 0,
                count: 0,
                transactions: [],
            };
        }

        categoryMap[catId].total += convertedAmount;
        categoryMap[catId].count += 1;
        categoryMap[catId].transactions.push(tx);
    });

    const sortedCategories = Object.values(categoryMap).sort((a, b) => b.total - a.total);

    const handleCardClick = (catId) => {
        setActiveCategoryId(prev => (prev === catId ? null : catId));
    };

    return (
        <div className={classes.list}>
            {sortedCategories.map(({ category, total, count, transactions }) => (
                <div key={category.id}>
                    <div
                        className={classes.card}
                        onClick={() => handleCardClick(category.id)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={classes.left}>
                            <div
                                className={classes.iconWrapper}
                                style={{
                                    backgroundColor: category.color,
                                    border: "none"
                                }}
                            >
                                <img src={category.iconUrl} alt="icon" />
                            </div>
                            <div className={classes.info}>
                                <div className={classes.name}>{category.name}</div>
                                <div className={classes.percent}>
                                    {((total / totalAmount) * 100).toFixed(1)}%
                                </div>
                            </div>
                        </div>
                        <div className={classes.right}>
                            <div className={classes.amount}>{total.toFixed(2)} {symbol}</div>
                            <div className={classes.count}>{count} транзакцій</div>
                        </div>
                    </div>

                    {activeCategoryId === category.id && (
                        <div className={classes.transactionListWrapper}>
                            <TransactionList transactions={transactions} />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TransactionCategoryList;