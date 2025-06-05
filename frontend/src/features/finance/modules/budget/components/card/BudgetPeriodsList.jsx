import React from 'react';
import BudgetPeriodCard from "./BudgetPeriodCard.jsx";

const BudgetPeriodsList = ({budgetPeriods, budget}) => {
    return (
        <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>
            {budgetPeriods.map((budgetPeriod) => (
                <BudgetPeriodCard key={budgetPeriod.id} budgetPeriod={budgetPeriod} budget={budget} />
            ))}
        </div>
    );
};

export default BudgetPeriodsList;