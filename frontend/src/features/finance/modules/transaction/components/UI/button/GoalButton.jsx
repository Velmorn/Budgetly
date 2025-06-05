import React from 'react';

const GoalButton  = ({ children, goal,  ...props}) => {
    return (
        <button
            {...props}
            style={{
                border: "2px solid",
                borderRadius: "12px",
                borderColor: goal.color,
                backgroundColor: "white",
                padding: "6px",
                margin: "4px",
            }}
        >
            {goal.name} {children}
        </button>
    );
};

export default GoalButton;