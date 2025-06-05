import React from "react";
import BillCardWithButton from "./BillCardWithButton.jsx";

const BillCardList = ({ bills }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {bills.map((bill) => (
                <BillCardWithButton key={bill.id} bill={bill} />
            ))}
        </div>
    );
};

export default BillCardList;