import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./RecentTransactions.module.scss";
import TransactionList from "./TransactionList.jsx";

const RecentTransactions = ({ transactions = [] }) => {
    const navigate = useNavigate();
    const [activeType, setActiveType] = useState("ALL");

    const now = new Date();
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(now.getMonth() - 1);

    const filteredByDate = transactions.filter(tx => {
        const txDate = new Date(tx.date);
        return txDate >= oneMonthAgo && txDate <= now;
    });

    const filteredTransactions = filteredByDate.filter(tx => {
        if (activeType === "ALL") return true;
        return tx.type === activeType;
    });

    return (
        <div className={classes.recentTransactions}>
            <div className={classes.tabs}>
                <button
                    className={`${classes.tabBtn} ${activeType === "ALL" ? classes.active : ""}`}
                    onClick={() => setActiveType("ALL")}
                >
                    Всі
                </button>
                <button
                    className={`${classes.tabBtn} ${activeType === "EXPENSE" ? classes.active : ""}`}
                    onClick={() => setActiveType("EXPENSE")}
                >
                    Витрати
                </button>
                <button
                    className={`${classes.tabBtn} ${activeType === "INCOME" ? classes.active : ""}`}
                    onClick={() => setActiveType("INCOME")}
                >
                    Доходи
                </button>
            </div>

            <TransactionList transactions={filteredTransactions}/>

            <button
                className={classes.viewAllBtn}
                onClick={() => navigate("/transactions")}
            >
                Переглянути всі транзакції
            </button>
        </div>
    );
};

export default RecentTransactions;