import React from 'react';

const BudgetButton = ({ children, budget,  ...props}) => {
    return (
        <button
            {...props}
            style={{
                border: "2px solid",
                borderRadius: "12px",
                borderColor: budget.color,
                backgroundColor: "white",
                padding: "6px",
                margin: "4px",
            }}
        >
            {budget.name} {children}
        </button>
    );
};

export default BudgetButton;