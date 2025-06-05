import React from 'react';
import BudgetCard from "./BudgetCard.jsx";
import classes from "./BudgetsList.module.scss";

const BudgetsList = ({budgets}) => {
    return (
        <div className={classes.list}>
            {budgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
            ))}
        </div>
    );
};

export default BudgetsList;