import React from 'react';

const BillButton = ({ children, object: bill,  ...props}) => {
    return (
        <button
            {...props}
            style={{
                border: "2px solid",
                borderRadius: "12px",
                borderColor: bill?.color,
                backgroundColor: "white",
                padding: "6px",
                margin: "4px",
            }}
        >
            {bill.name} ({bill?.currency}) {children}
        </button>
    );
};

export default BillButton;